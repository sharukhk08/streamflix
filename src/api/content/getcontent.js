"use server";
import { isDemo, demoCollections, demoFeaturedIds } from "../../demo/data";
import { createClient } from "../../utils/supabase/server";
import { cache } from "react";

const getClient = () => createClient();

export const getContent = cache(async () => {
  if (isDemo()) return { collections: demoCollections };
  try {
    const { data: contents, error: contentsError } = await getClient()
      .from("content")
      .select(
        `
        content_id,
        title,
        image_url,
        type,
        collection (collection_name),
        content_categories (
          categories (category_name)
        )
      `
      )
      .eq("approved", true);

    if (contentsError) {
      throw new Error(contentsError.message);
    }

    const collections = new Map();
    contents.forEach((content) => {
      content.collection.forEach((collectionItem) => {
        if (!collections.has(collectionItem.collection_name)) {
          collections.set(collectionItem.collection_name, {
            name: collectionItem.collection_name,
            items: [],
          });
        }
        collections.get(collectionItem.collection_name).items.push({
          id: content.content_id,
          src: content.image_url,
          type:
            content.content_categories[0]?.categories.category_name ||
            "Unknown",
          content: content.type || "Unknown",
          title: content.title,
        });
      });
    });

    return {
      collections: Array.from(collections.values()),
    };
  } catch (error) {
    console.error("Error fetching content:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});

export const getFeaturedContentIds = cache(async () => {
  if (isDemo()) return demoFeaturedIds;
  try {
    const { data: featuredContent, error } = await getClient()
      .from("content")
      .select("content_id")
      .eq("approved", true)
      .eq("is_featured", true);

    if (error) {
      throw new Error(error.message);
    }

    return featuredContent.map((item) => item.content_id);
  } catch (error) {
    console.error("Error fetching featured content IDs:", error);
    throw error;
  }
});
