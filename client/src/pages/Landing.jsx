import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        html,
        body,
        #root{
          width:100%;
          min-height:100vh;
          overflow-x:hidden;
          font-family:Inter,sans-serif;
        }

        .landing{
          width:100%;
          min-height:100vh;

          position:relative;
          overflow:hidden;

          background:linear-gradient(
            135deg,
            #F7F2F2 0%,
            #FCF8F8 50%,
            #EFE4E4 100%
          );
        }

        /* NAVBAR */

        .navbar{
          width:100%;
          height:80px;

          display:flex;
          justify-content:space-between;
          align-items:center;

          padding:0 5%;

          position:relative;
          z-index:10;
        }

        .logo-container{
          display:flex;
          align-items:center;
          gap:12px;
        }

        .logo{
          width:50px;
          height:50px;
          object-fit:contain;
        }

        .brand{
          font-size:1.8rem;
          font-weight:700;
          color:#4A3F44;
        }

        .login-btn{
          border:none;
          outline:none;
          cursor:pointer;

          background:#5B4A52;
          color:white;

          padding:12px 28px;

          border-radius:999px;

          font-weight:600;

          transition:.3s;
        }

        .login-btn:hover{
          background:#473940;
          transform:translateY(-2px);
        }

        /* HERO */

        .hero{
          width:100%;
          min-height:calc(100vh - 80px);

          display:flex;
          justify-content:center;
          align-items:center;

          padding:20px;

          position:relative;
          z-index:5;
        }

        .content{
          width:100%;
          max-width:850px;

          text-align:center;
        }

        .badge{
          display:inline-block;

          padding:12px 22px;

          border-radius:999px;

          background:rgba(205,186,186,.35);

          color:#5B4A52;

          border:1px solid #E6DCDC;

          font-weight:600;

          margin-bottom:25px;
        }

        .title{
          font-size:clamp(2.3rem,5vw,4.2rem);

          line-height:1.15;

          font-weight:800;

          color:#2F2930;

          margin-bottom:20px;
        }

        .highlight{
          color:#8A6D73;
        }

        .description{
          max-width:700px;

          margin:auto;

          color:#6B5D63;

          font-size:clamp(1rem,2vw,1.25rem);

          line-height:1.8;

          margin-bottom:35px;
        }

        .start-btn{
          border:none;
          cursor:pointer;

          background:#5B4A52;

          color:white;

          padding:16px 38px;

          border-radius:999px;

          font-size:1rem;
          font-weight:600;

          box-shadow:
          0 10px 25px rgba(91,74,82,.25);

          transition:.3s;
        }

        .start-btn:hover{
          background:#473940;
        }

        /* BLURRED LOGO */

        .bg-logo{
          position:absolute;

          top:50%;
          left:50%;

          transform:translate(-50%,-50%);

          pointer-events:none;

          z-index:1;
        }

        .bg-logo img{
          width:min(40vw,300px);

          opacity:.07;

          filter:blur(10px);

          animation:floatLogo 8s ease-in-out infinite;
        }

        /* DECORATIVE SHAPES */

        .shape1{
          position:absolute;

          width:250px;
          height:250px;

          border-radius:50%;

          background:#CDBABA;

          opacity:.2;

          top:-120px;
          right:-120px;

          filter:blur(40px);
        }

        .shape2{
          position:absolute;

          width:220px;
          height:220px;

          border-radius:50%;

          background:#5B4A52;

          opacity:.08;

          bottom:-100px;
          left:-100px;

          filter:blur(40px);
        }

        @keyframes floatLogo{
          0%{
            transform:translateY(0px);
          }

          50%{
            transform:translateY(-20px);
          }

          100%{
            transform:translateY(0px);
          }
        }

        /* TABLET */

        @media(max-width:768px){

          .navbar{
            padding:0 20px;
          }

          .brand{
            font-size:1.4rem;
          }

          .logo{
            width:42px;
            height:42px;
          }

          .bg-logo img{
            width:55vw;
          }

          .start-btn{
            width:100%;
            max-width:260px;
          }
        }

        /* MOBILE */

        @media(max-width:480px){

          .navbar{
            height:70px;
          }

          .hero{
            min-height:calc(100vh - 70px);
          }

          .brand{
            font-size:1.2rem;
          }

          .logo{
            width:38px;
            height:38px;
          }

          .login-btn{
            padding:10px 18px;
            font-size:.9rem;
          }

          .badge{
            font-size:.8rem;
          }

          .description{
            line-height:1.6;
          }

          .bg-logo img{
            width:70vw;
          }
        }
      `}</style>

      <div className="landing">
        <div className="shape1"></div>
        <div className="shape2"></div>

        <div className="bg-logo">
          <img src={logo} alt="ClipHub" />
        </div>

        <nav className="navbar">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <h2 className="brand">ClipHub</h2>
          </div>

          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </nav>

        <section className="hero">
          <motion.div
            className="content"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge">
              Business Video Sharing Platform
            </div>

            <h1 className="title">
              Share Team Videos
              <br />
              and <span className="highlight">Files Effortlessly</span>
            </h1>

            <p className="description">
              A secure workspace for sharing meeting recordings,
              training sessions, project resources, and important
              documents with your communities.
            </p>

            <motion.button
              className="start-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
            >
              Get Started
            </motion.button>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Landing;