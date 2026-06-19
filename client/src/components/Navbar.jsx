import { Link } from "react-router-dom";
import { FiBell, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import logo from "../assets/logo.png";
import defaultProfile from "../assets/defaultProfile.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  return (
    <>
      <style>{`
        .navbar{
          width:100%;
          height:75px;

          background:#FFFFFF;

          border-bottom:1px solid #E6DCDC;

          display:flex;
          justify-content:space-between;
          align-items:center;

          padding:0 5%;

          position:sticky;
          top:0;
          z-index:1000;
        }

        .logo-section{
          display:flex;
          align-items:center;
          gap:10px;
        }

        .logo{
          width:42px;
          height:42px;
          object-fit:contain;
        }

        .brand{
          font-size:1.6rem;
          font-weight:700;
          color:#4A3F44;
        }

        .nav-links{
          display:flex;
          align-items:center;
          gap:35px;
        }

        .nav-links a{
          text-decoration:none;
          color:#6B5D63;
          font-weight:600;
          transition:.3s;
        }

        .nav-links a:hover{
          color:#5B4A52;
        }

        .right-section{
          display:flex;
          align-items:center;
          gap:20px;
        }

        .bell{
          font-size:1.3rem;
          color:#6B5D63;
          cursor:pointer;
        }

        .profile{
          width:42px;
          height:42px;

          border-radius:50%;

          object-fit:cover;

          border:2px solid #E6DCDC;
        }

        .menu-btn{
          display:none;

          background:none;
          border:none;

          font-size:1.6rem;

          cursor:pointer;

          color:#5B4A52;
        }

        .mobile-menu{
          display:none;
        }

        @media(max-width:768px){

          .nav-links,
          .right-section{
            display:none;
          }

          .menu-btn{
            display:block;
          }

          .mobile-menu{
            display:flex;
            flex-direction:column;

            position:absolute;

            top:75px;
            left:0;

            width:100%;

            background:white;

            border-bottom:1px solid #E6DCDC;

            padding:15px;
          }

          .mobile-menu a{
            text-decoration:none;

            color:#4A3F44;

            padding:12px 0;

            font-weight:600;
          }
        }
      `}</style>

      <nav className="navbar">

        <div className="logo-section">
          <img
            src={logo}
            alt="ClipHub"
            className="logo"
          />
          <h2 className="brand">ClipHub</h2>
        </div>

        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/communities">Communities</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <div className="right-section">
          <FiBell className="bell" />

          <img
            src={user.profilePic || defaultProfile}
            alt="profile"
            className="profile"
          />
        </div>

        <button
          className="menu-btn"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/home">Home</Link>
          <Link to="/communities">Communities</Link>
          <Link to="/profile">Profile</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;