// Dummy data for DEMO_MODE=true (no database needed). All titles are fictional.
export const isDemo = () => process.env.DEMO_MODE === "true";

const poster = (n) => `/demo/poster-${n}.jpg`;
const thumb = (c) => c.image_url.replace("/poster-", "/thumb-");

const base = [
  // [title, genre, year, minutes, director, cast, synopsis]
  ["Elephants Dream", "Sci-Fi", 2006, 11, "Blender Foundation", ["Animated feature"], "Two strange characters explore a capricious, ever-shifting machine world in the first open movie from Blender."],
  ["Big Buck Bunny", "Animation", 2008, 10, "Blender Foundation", ["Animated feature"], "A giant, gentle rabbit takes comic revenge on three bullying rodents."],
  ["Sintel", "Fantasy", 2010, 15, "Blender Foundation", ["Animated feature"], "A lonely young woman searches the world for the baby dragon she once befriended."],
  ["Tears of Steel", "Sci-Fi", 2012, 12, "Blender Foundation", ["Live action and VFX"], "Warriors and scientists fight to save the world from destructive robots in a near-future Amsterdam."],
  ["Cosmos Laundromat", "Drama", 2015, 12, "Blender Institute", ["Animated feature"], "A lonely sheep is offered a free trial of other lives by a mysterious salesman."],
  ["Coffee Run", "Comedy", 2020, 3, "Blender Studio", ["Animated short"], "A simple coffee run turns into a chaotic dash through a blurry, dreamlike world."],
  ["Sprite Fright", "Horror", 2021, 8, "Blender Studio", ["Animated short"], "A group of friends in the British countryside wake mischievous woodland sprites in this horror comedy."],
  ["Charge", "Action", 2022, 4, "Blender Studio", ["Animated short"], "A battered hero races to get a vital charge before everything goes dark."],
];

const VIDEOS = ["demo-hls", "demo-oceans", "demo-hls"];

export const demoContent = base.map(([title, genre, year, minutes, director, cast, synopsis], i) => ({
  content_id: `demo-${i + 1}`,
  title,
  genre,
  image_url: poster(i + 1),
  type: "movie",
  description: synopsis,
  release_date: `${year}-01-01`,
  duration: minutes,
  maturity_rating: 12,
  video_id: VIDEOS[i % 3],
  director,
  cast,
}));

const seriesBase = [
  ["Backstage Stories", "Drama", 9], ["Case File 404", "Thriller", 10], ["Laugh Track", "Comedy", 11],
];
demoContent.push(
  ...seriesBase.map(([title, genre, n], i) => ({
    content_id: `demo-s${i + 1}`, title, genre, image_url: poster(n), type: "series",
    description: `${title} is a fictional demo series for this portfolio showcase. Dummy data only.`,
    release_date: `202${4 + i}-03-10`, duration: 45, maturity_rating: 13, video_id: VIDEOS[i % 3],
  }))
);

const demoEpisodes = (c) =>
  [1, 2, 3].map((n) => ({
    episode_id: `${c.content_id}-e${n}`, season_number: 1, episode_number: n,
    title: `Episode ${n}`, description: `${c.title} - episode ${n} (demo).`, duration: 45,
    image_url: c.image_url, video_id: VIDEOS[(n - 1) % 3], intro_marker: null, outro_marker: null,
  }));

const groups = {
  "Trending Now": [2, 3, 8, 0, 9, 10],
  "Now in Cinemas": [4, 5, 6, 7, 0, 1],
  "Coming Soon": [6, 7, 3, 2, 5, 4],
  "Top Rated": [3, 1, 2, 0, 7, 4],
};

export const demoCollections = Object.entries(groups).map(([name, ids]) => ({
  name,
  items: ids.map((i) => {
    const c = demoContent[i];
    return { id: c.content_id, src: thumb(c), poster: c.image_url, type: c.genre, content: c.type, title: c.title };
  }),
}));

export const demoFeaturedIds = ["demo-1", "demo-3", "demo-7"];

export const demoSpecific = (id) => {
  const c = demoContent.find((x) => x.content_id === id) || demoContent[0];
  return {
    title: c.title, description: c.description,
    releaseDate: new Date(c.release_date).getFullYear(),
    duration: c.duration >= 60 ? `${Math.floor(c.duration / 60)}h ${c.duration % 60}m` : `${c.duration}m`,
    rating: c.maturity_rating, maturityRating: c.maturity_rating,
    image_url: c.image_url, type: c.type, video_id: c.video_id,
    categories: [c.genre], studioName: c.type === "movie" ? "Public domain" : "Demo Studios",
    cast: c.cast || ["Alex Demo", "Sam Sample", "Jordan Placeholder"],
    director: c.director || "Riley Example", seasons: c.type === "series" ? 1 : 0, episodes: c.type === "series" ? demoEpisodes(c) : undefined,
  };
};

export const demoProfiles = [
  { profile_id: "demo-profile-1", id: "demo-profile-1", profile_name: "Demo User",
    profile_image: "/demo/avatar.png" },
];

export const demoStars = {
  actors: ["Alex Demo", "Sam Sample", "Jordan Placeholder", "Casey Test"].map((name, i) => ({
    actor_id: `a${i}`, name, profile_image_url: "/demo/avatar.png" })),
  directors: ["Riley Example", "Morgan Mock", "Taylor Trial", "Drew Dummy"].map((name, i) => ({
    director_id: `d${i}`, name, profile_image_url: "/demo/avatar.png" })),
};

// In-memory watchlist (resets when the server restarts)
export const demoWatchlist = new Set(["demo-2", "demo-5"]);
