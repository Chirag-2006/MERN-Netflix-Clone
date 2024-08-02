import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

const formateDate = (dateString) => {
  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month} ${day} , ${year}`;
};

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get("/api/v1/search/history");
        setSearchHistory(res.data.content);
      } catch (error) {
        searchHistory([]);
      }
    };

    getSearchHistory();
  }, []);

  const handleDelet = async (entry) => {
    try {
      await axios.delete(`/api/v1/search/history/${entry.id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
      toast.success("Search item deleted successfully");
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
    } catch (error) {
      toast.error("Failed to delete search item");
    }
  };

  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory?.map((entry) => (
            <div
              key={entry.id}
              className="bg-gray-800 rounded flex items-start p-4"
            >
              <img
                src={`${SMALL_IMG_BASE_URL}/${entry.image}`}
                alt={entry.title}
                className="rounded-full size-16 mr-4 object-cover"
              />
              <div className="flex flex-col">
                <span className="text-lg text-white ">{entry.title}</span>
                <span className="text-sm text-gray-400">
                  {formateDate(entry.createdAt)}
                </span>
              </div>
              <span
                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                  entry.searchType === "movie"
                    ? "bg-red-600"
                    : entry.searchType === "tv"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
              </span>
              <Trash
                className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                onClick={() => handleDelet(entry)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;
