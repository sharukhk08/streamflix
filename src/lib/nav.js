// Navigate with the Next router, and fall back to a full page load if the in-page
// navigation stalls (seen on some browsers/networks with streamed route data).
export function go(router, url) {
  router.push(url);
  setTimeout(() => {
    const target = url.split("?")[0];
    if (window.location.pathname !== target) window.location.assign(url);
  }, 2500);
}
