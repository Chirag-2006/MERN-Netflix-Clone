import AuthScreen from "./AuthScreen";
import { useAuthUser } from "../../store/authUser";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
  const { user } = useAuthUser();
  return <>{user ? <HomeScreen  /> : <AuthScreen />}</>;
};

export default HomePage;
