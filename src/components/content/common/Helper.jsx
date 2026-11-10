import {
  AddIcon2,
  HomeIcon,
  MovieIcon,
  PlayBtnIcon2,
  SeriesIcon,
  TrendingIcon,
  UpComingIcon,
  WatchlistIcon,
} from "./Icons";

export const navLinks = [
  {
    link: "Home",
    url: "/browse",
  },
  { link: "Series", url: "/browse/genres/series" },
  { link: "Movies", url: "/browse/genres/movie" },
  { link: "Watchlist", url: "/browse/my-list" },
];
export const sidebarLinks = [
  { link: "Home", url: "/browse", icon: <HomeIcon /> },
  { link: "Movies", url: "/browse/genres/movie", icon: <MovieIcon /> },
  { link: "Series", url: "/browse/genres/series", icon: <SeriesIcon /> },
  { link: "Trending", url: "#Trending", icon: <TrendingIcon /> },
  { link: "Upcoming", url: "#Upcoming", icon: <UpComingIcon /> },
  { link: "Watchlist", url: "/browse/my-list", icon: <WatchlistIcon /> },
];
export const GenresLinks = [
  { link: "Action", url: "/browse/genres/movies/action" },
  { link: "Animation", url: "/browse/genres/movies/animation" },
  { link: "Adventure", url: "/browse/genres/movies/adventure" },
  { link: "Fantasy", url: "/browse/genres/movies/fantasy" },
  { link: "Coming of Age", url: "/browse/genres/movies/coming-of-age" },
  { link: "Documentary", url: "/browse/genres/movies/documentary" },
  { link: "Horror", url: "/browse/genres/movies/horror" },
];


export const trendingstardata = [
  {
    img: "/demo/avatar.png",
    name: "Alex Demo",
    position: "Actor",
  },
  {
    img: "/demo/avatar.png",
    name: "Sam Sample",
    position: "Actor",
  },
  {
    img: "/demo/avatar.png",
    name: "Jordan Placeholder",
    position: "Actor",
  },
  {
    img: "/demo/avatar.png",
    name: "Casey Test",
    position: "Actor",
  },
];
