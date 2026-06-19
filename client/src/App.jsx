import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Communities from "./pages/Communities";
import AddCommunity from "./pages/AddCommunity";
import CommunityDetails from "./pages/CommunityDetails";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/add-community" element={<AddCommunity />} />
        <Route path="/community/:id" element={<CommunityDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;