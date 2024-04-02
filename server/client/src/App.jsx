import { Route, Routes } from "react-router-dom";
import ProfileSetting from "./components/Profile/ProfileSettings";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./pages/NotFound";
import "./App.css";
import Dashboard from "./pages/Admin/Dashboard";
import SearchBar from "./components/Search/SearchBar";
import HomeLoggedIn from "./pages/Home/HomeLoggedIn";
import HomeLoggedOut from "./pages/Home/HomeLoggedOut";
import MyPetsPage from "./pages/MyPets/MyPetsPage";
import AddPet from "./pages/Admin/AddPet";
import PetDetails from "./components/Pet/PetDetails";
import { useUser } from "./context/UserContext";
import EditPet from "./components/Pet/editPet";

function App() {
  const { isLogin, user} = useUser();
  console.log('user: ', user?.isAdmin);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          {isLogin ? (
            <>
              <Route index path="/" element={<HomeLoggedIn />} />
              <Route path="/profile" element={<ProfileSetting />} />
              
              {/* {user?.isAdmin ? <Route path="/dashboard" element={<Dashboard />} /> : null} */}
              <Route path="/search" element={<SearchBar />} />
              <Route path="/myPets" element={<MyPetsPage />} />
              <Route path="/addPet" element={<AddPet />} />
              <Route path="/petDetails/:petId" element={<PetDetails />} />
              <Route path="/editPet/:petId" element={<EditPet />} />
            </>
          ) : (
            <>
              <Route index path="/" element={<HomeLoggedOut />} />
              <Route path="/search" element={<SearchBar />} />
              <Route path="/petDetails/:petId" element={<PetDetails />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
