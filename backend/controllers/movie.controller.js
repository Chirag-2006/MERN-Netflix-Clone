import { fetchFromTMDB } from "../services/tmdb.services.js";

export async function getTrendingMovie(req, res) {
  try {
    const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;
    const data = await fetchFromTMDB(url);
    const RandomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).json({ success: true, content: RandomMovie });
  } catch (error) {
    console.error("Error in getting trending movies❌", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const data = await fetchFromTMDB(url);
    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    console.error("Error in getting movie trailers❌", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const data = await fetchFromTMDB(url);
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getSimilarMovies(req, res) {
  const { id } = req.params;
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
    const data = await fetchFromTMDB(url);
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  try {
    const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;
    const data = await fetchFromTMDB(url);
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
