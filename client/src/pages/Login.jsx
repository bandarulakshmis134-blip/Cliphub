import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://cliphub-kyq2.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        const redirectPath =
          localStorage.getItem(
            "redirectAfterLogin"
          );

        if (redirectPath) {
          localStorage.removeItem(
            "redirectAfterLogin"
          );
          navigate(redirectPath);
        } else {
          navigate("/home");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        .login-page{
          min-height:100vh;
          width:100%;

          background:linear-gradient(
            135deg,
            #F7F2F2 0%,
            #FCF8F8 50%,
            #EFE4E4 100%
          );

          display:flex;
          justify-content:center;
          align-items:center;

          padding:20px;

          position:relative;
          overflow:hidden;
        }

        .blur-circle-1{
          position:absolute;
          width:250px;
          height:250px;
          border-radius:50%;
          background:#CDBABA;
          top:-100px;
          right:-100px;
          opacity:.3;
          filter:blur(40px);
        }

        .blur-circle-2{
          position:absolute;
          width:220px;
          height:220px;
          border-radius:50%;
          background:#5B4A52;
          bottom:-100px;
          left:-100px;
          opacity:.08;
          filter:blur(40px);
        }

        .login-card{
          width:100%;
          max-width:500px;

          background:white;

          border:1px solid #E6DCDC;

          border-radius:30px;

          padding:40px;

          box-shadow:
          0 10px 40px rgba(0,0,0,0.05);

          position:relative;
          z-index:5;
        }

        .logo-section{
          display:flex;
          align-items:center;
          justify-content:center;
          gap:12px;

          margin-bottom:35px;
        }

        .logo{
          width:55px;
          height:55px;
          object-fit:contain;
        }

        .brand{
          font-size:2rem;
          font-weight:700;
          color:#4A3F44;
        }

        .title{
          font-size:2rem;
          font-weight:700;
          color:#4A3F44;

          margin-bottom:10px;
        }

        .subtitle{
          color:#6B5D63;
          margin-bottom:30px;
        }

        .form-group{
          margin-bottom:22px;
        }

        .label{
          display:block;

          margin-bottom:8px;

          color:#4A3F44;

          font-weight:600;
        }

        .input{
          width:100%;

          padding:15px 18px;

          border:1px solid #E6DCDC;

          border-radius:15px;

          outline:none;

          font-size:1rem;

          background:#FAF7F7;

          transition:.3s;
        }

        .input:focus{
          border-color:#8A6D73;
        }

        .password-wrapper{
          position:relative;
        }

        .eye-btn{
          position:absolute;

          right:15px;
          top:50%;

          transform:translateY(-50%);

          border:none;
          background:none;

          cursor:pointer;

          color:#8A6D73;
        }

        .forgot{
          text-align:right;

          margin-bottom:25px;
        }

        .forgot a{
          color:#8A6D73;

          text-decoration:none;

          font-weight:600;
        }

        .login-btn{
          width:100%;

          border:none;

          padding:16px;

          border-radius:18px;

          background:#5B4A52;

          color:white;

          font-size:1rem;
          font-weight:600;

          cursor:pointer;

          transition:.3s;
        }

        .login-btn:hover{
          background:#473940;
        }

        .signup-text{
          text-align:center;

          margin-top:25px;

          color:#6B5D63;
        }

        .signup-btn{
          color:#8A6D73;

          font-weight:700;

          cursor:pointer;
        }

        @media(max-width:768px){

          .login-card{
            padding:30px 25px;
          }

          .title{
            font-size:1.8rem;
          }

          .brand{
            font-size:1.6rem;
          }
        }

        @media(max-width:480px){

          .login-card{
            border-radius:20px;
            padding:25px 20px;
          }

          .title{
            font-size:1.6rem;
          }

          .brand{
            font-size:1.4rem;
          }

          .logo{
            width:45px;
            height:45px;
          }

          .input{
            padding:14px;
          }
        }
      `}</style>

      <div className="login-page">
        <div className="blur-circle-1"></div>
        <div className="blur-circle-2"></div>

        <div className="login-card">

          <div className="logo-section">
            <img src={logo} alt="logo" className="logo" />
            <h1 className="brand">ClipHub</h1>
          </div>

          <h2 className="title">Welcome Back</h2>

          <p className="subtitle">
            Login to your ClipHub workspace
          </p>

          <div className="form-group">
            <label className="label">Mobile Number</label>

            <input
              type="tel"
              className="input"
              placeholder="Enter your mobile number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label className="label">Password</label>

            <div className="password-wrapper">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                className="input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                👁
              </button>
            </div>
          </div>

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          <div className="signup-text">
            Don't have an account?{" "}
            <span
              className="signup-btn"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </span>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;