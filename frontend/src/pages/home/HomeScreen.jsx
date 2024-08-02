import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";
import useGetTrandingContent from "../../hooks/useGetTrandingContent";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants";
import { useContentStore } from "../../store/content";
import MovieSlider from "../../components/MovieSlider";

const HomeScreen = () => {
  const { trandingContent } = useGetTrandingContent();
  const { contentType } = useContentStore();
  const [imageLoading, setImageLoading] = useState(false);

  // loading spinner
  if (!trandingContent) {
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer
        "
        />
      </div>
    );
  }

  return (
    <>
      {/* *************************************HomeScreen************************************* */}
      <div className="relative h-screen text-white">
        <Navbar />
        {/* *****************Cool Optimized Image Loading***************** */}
        {imageLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 shimmer flex items-center justify-center -z-10" />
        )}
        <img
          src={ORIGINAL_IMG_BASE_URL + trandingContent?.backdrop_path}
          alt="hero image"
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
          onLoad={() => setImageLoading(false)}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute top-0 left-0 w-full h-full -z-10" />
          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              {trandingContent?.title || trandingContent?.name}
            </h1>
            <p className="mt-2 text-lg">
              {trandingContent?.release_date?.split("-")[0] ||
                trandingContent?.first_air_date?.split("-")[0]}
              {""} | {trandingContent?.adult ? "18+" : "PG-13"}
            </p>
            <p className="mt-4 text-lg">
              {trandingContent?.overview.length > 200
                ? trandingContent?.overview.slice(0, 200) + "..."
                : trandingContent?.overview}
            </p>
            <div className="mt-4 flex">
              <Link
                to={`/watch/${trandingContent?.id}`}
                className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded
              mr-4 flex items-center"
              >
                <Play className="size-6 mr-2 fill-black" />
                Play
              </Link>
              <Link
                to={`/watch/${trandingContent?.id}`}
                className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center"
              >
                <Info className="size-6 mr-2" />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* *************************************Suggestions Section************************************* */}
      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
