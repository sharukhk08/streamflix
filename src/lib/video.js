// Resolves a video_id to something the <video> element can play.
// Demo ids map to public sample streams; real ids use the configured HLS CDN.
const DEMO_SOURCES = {
  "demo-hls": { kind: "hls", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" },
  "demo-flower": { kind: "mp4", url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
  "demo-oceans": { kind: "mp4", url: "https://vjs.zencdn.net/v/oceans.mp4" },
};

export function resolveVideo(videoId) {
  if (!videoId) return null;
  if (DEMO_SOURCES[videoId]) return DEMO_SOURCES[videoId];
  const cdn = process.env.NEXT_PUBLIC_VIDEO_CDN;
  if (!cdn) return null;
  return { kind: "hls", url: `${cdn}/${videoId}/playlist.m3u8` };
}

// Attach a source to a <video>. Returns a cleanup function.
export async function attachVideo(videoEl, videoId, { autoplay = false } = {}) {
  const src = resolveVideo(videoId);
  if (!videoEl || !src) return () => {};
  let hls = null;
  const tryPlay = async () => {
    if (!autoplay) return;
    try {
      await videoEl.play();
    } catch {
      // Browsers block autoplay with sound: retry muted so the picture still plays.
      videoEl.muted = true;
      videoEl.play().catch(() => {});
    }
  };
  if (src.kind === "mp4") {
    videoEl.src = src.url;
    videoEl.addEventListener("loadeddata", tryPlay, { once: true });
  } else {
    const { default: Hls } = await import("hls.js");
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src.url);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, tryPlay);
    } else if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.src = src.url;
      videoEl.addEventListener("loadedmetadata", tryPlay, { once: true });
    }
  }
  return () => {
    if (hls) hls.destroy();
    else { videoEl.removeAttribute("src"); videoEl.load(); }
  };
}
