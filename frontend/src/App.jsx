import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthUser } from "./store/authUser";
import { Loader } from "lucide-react";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./components/Footer";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const { user, isCheakingAuth, authCheak } = useAuthUser();
  

  useEffect(() => {
    authCheak();
  }, [authCheak]);

  if (isCheakingAuth) {
    return (
      <div className="h-screen">
        <div className="flex items-center justify-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/history"
          element={user ? <SearchHistoryPage /> : <Navigate to={"/"} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
