import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FiUpload } from "react-icons/fi";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      setLoading(true);

      const response = await fetch(
        "https://cliphub-kyq2.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            phone,
            email,
            password,
            description,
            profilePic,
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

        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Signup Failed");
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

        .signup-page{
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
          align-items:flex-start;

          padding:20px;
          overflow-x:hidden;
          position:relative;
        }

        .circle1{
          position:absolute;
          width:250px;
          height:250px;
          border-radius:50%;
          background:#CDBABA;
          top:-120px;
          right:-120px;
          opacity:.25;
          filter:blur(40px);
        }

        .circle2{
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

        .signup-card{
          width:100%;
          max-width:900px;

          background:#FFFFFF;
          border:1px solid #E6DCDC;
          border-radius:30px;

          padding:30px;

          position:relative;
          z-index:5;

          box-shadow:
          0 10px 40px rgba(0,0,0,0.05);
        }

        .back-btn{
          position:absolute;
          top:20px;
          right:20px;

          width:42px;
          height:42px;

          border:none;
          border-radius:50%;

          background:#F7F2F2;
          cursor:pointer;

          font-size:1.2rem;
          color:#5B4A52;
        }

        .back-btn:hover{
          background:#EDE1E1;
        }

        .logo-section{
          display:flex;
          justify-content:center;
          align-items:center;
          gap:12px;

          margin-bottom:8px;
        }

        .logo{
          width:45px;
          height:45px;
          object-fit:contain;
        }

        .brand{
          font-size:1.7rem;
          font-weight:700;
          color:#4A3F44;
        }

        .title{
          text-align:center;
          font-size:1.7rem;
          font-weight:700;
          color:#4A3F44;

          margin-bottom:4px;
        }

        .subtitle{
          text-align:center;
          color:#6B5D63;

          margin-bottom:15px;
        }

        .upload-section{
          text-align:center;
          margin-bottom:12px;
        }

        .upload-circle{
          width:80px;
          height:80px;

          border-radius:50%;
          border:2px dashed #CDBABA;

          background:#F9F5F5;

          margin:auto;

          display:flex;
          justify-content:center;
          align-items:center;

          cursor:pointer;
        }

        .upload-text{
          margin-top:10px;
          color:#8A6D73;
          font-weight:600;
        }

        .form-row{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:15px;
        }

        .password-row{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:15px;
        }

        .form-group{
          margin-bottom:12px;
        }

        .label{
          display:block;
          margin-bottom:8px;

          font-weight:600;
          color:#4A3F44;
        }

        .input,
        .textarea{
          width:100%;

          border:1px solid #E6DCDC;
          background:#FAF7F7;

          border-radius:15px;

          padding:14px;

          outline:none;

          font-size:1rem;
        }

        .textarea{
          resize:none;
          min-height:70px;
        }

        .input:focus,
        .textarea:focus{
          border-color:#8A6D73;
        }

        .password-wrapper{
          position:relative;
        }

        .eye-btn{
          position:absolute;
          top:50%;
          right:15px;

          transform:translateY(-50%);

          border:none;
          background:none;

          cursor:pointer;
        }

        .create-btn{
          width:100%;

          border:none;

          padding:15px;

          border-radius:18px;

          background:#5B4A52;
          color:white;

          font-size:1rem;
          font-weight:600;

          cursor:pointer;

          margin-top:10px;
        }

        .create-btn:hover{
          background:#473940;
        }

        .login-link{
          text-align:center;
          margin-top:20px;
          color:#6B5D63;
        }

        .login-link span{
          color:#8A6D73;
          font-weight:700;
          cursor:pointer;
        }

        @media(max-width:768px){

          .signup-card{
            padding:25px;
          }

          .form-row,
          .password-row{
            grid-template-columns:1fr;
          }

          .brand{
            font-size:1.5rem;
          }

          .title{
            font-size:1.7rem;
          }
        }

        @media(max-width:480px){

          .signup-page{
            padding:10px;
          }

          .signup-card{
            padding:24px;
            border-radius:20px;
            max-width:1100px;
          }

          .logo{
            width:45px;
            height:45px;
          }

          .brand{
            font-size:1.2rem;
          }

          .title{
            font-size:1.4rem;
          }

          .upload-circle{
            width:85px;
            height:85px;
          }
          .upload-icon{
            font-size:2rem;
            color:#8A6D73;
          }

          .back-btn{
            width:36px;
            height:36px;
          }
        }
      `}</style>

      <div className="signup-page">
        <div className="circle1"></div>
        <div className="circle2"></div>

        <div className="signup-card">

          <button
            className="back-btn"
            onClick={() => navigate("/login")}
          >
            ←
          </button>

          <div className="logo-section">
            <img src={logo} alt="logo" className="logo" />
            <h1 className="brand">ClipHub</h1>
          </div>

          <h2 className="title">Create Your Account</h2>

          <p className="subtitle">
            Join your team on ClipHub
          </p>

          <div className="upload-section">
           <label htmlFor="profile">
              <div className="upload-circle">
                 <FiUpload className="upload-icon" />
              </div>
           </label>

            <input
              id="profile"
              type="file"
              hidden
              onChange={(e) =>
                setProfilePic(
                  e.target.files?.[0]?.name || ""
                )
              }
            />

            <div className="upload-text">
              Upload Profile Picture
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="label">Full Name</label>
              <input
                className="input"
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label className="label">Mobile Number</label>
              <input
                className="input"
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="Enter mobile number"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="label">Email Address</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter email address"
            />
          </div>

          <div className="form-group">
            <label className="label">Description / Bio</label>
            <textarea
              className="textarea"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Tell your team a little about yourself..."
            />
          </div>

          <div className="password-row">

            <div className="form-group">
              <label className="label">Password</label>

              <div className="password-wrapper">
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Create password"
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

            <div className="form-group">
              <label className="label">
                Confirm Password
              </label>

              <div className="password-wrapper">
                <input
                  className="input"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm password"
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  👁
                </button>
              </div>
            </div>

          </div>

          <button
            className="create-btn"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

          <div className="login-link">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>

        </div>
      </div>
    </>
  );
};

export default Signup;