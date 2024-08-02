import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, LogOut, Menu } from "lucide-react";
import { useAuthUser } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthUser();

  const { setContentType } = useContentStore();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="max-w-6xl mx-auto flex flex-wrap h-20 items-center justify-between p-4 ">
        <div className="flex items-center gap-10 z-50">
          <Link to={"/"}>
            <img
              src="../images/netflix-logo.png"
              alt="Netflix logo"
              className="w-32 md:w-52 sm:w-40"
            />
          </Link>

          {/* Desktop Navbar */}
          <div className="hidden sm:flex gap-2 items-center">
            <Link
              to={"/"}
              className="hover:underline"
              onClick={() => {
                setContentType("movie");
              }}
            >
              Movies
            </Link>
            <Link
              to={"/"}
              className="hover:underline"
              onClick={() => {
                setContentType("tv");
              }}
            >
              TV Shows
            </Link>
            <Link to={"/history"} className="hover:underline">
              Search History
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex gap-2 items-center z-50">
          <Link to={"/search"}>
            <Search className="size-6 cursor-pointer" />
          </Link>
          <img
            src={`../images/${user.image}`}
            alt="avtar"
            className="h-8 rounded cursor-pointer"
          />
          <LogOut className="size-6 cursor-pointer" onClick={logout} />
          <div className="sm:hidden">
            <Menu
              className="size-6 cursor-pointer"
              onClick={toggleMobileMenu}
            />
          </div>
        </div>

        {/* Mobile Navbar */}
        {isMobileMenuOpen && (
          <div className="w-full mt-4 z-50 sm:hidden border rounded border-gray-800 bg-black">
            <Link
              to={"/"}
              className="block p-2 hover:underline"
              onClick={() => {
                toggleMobileMenu();
                setContentType("movie");
              }}
            >
              Movies
            </Link>
            <Link
              to={"/"}
              className="block p-2 hover:underline"
              onClick={() => {
                toggleMobileMenu();
                setContentType("tv");
              }}
            >
              TV Shows
            </Link>
            <Link
              to={"/history"}
              className="block p-2 hover:underline"
              onClick={toggleMobileMenu}
            >
              Search History
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
