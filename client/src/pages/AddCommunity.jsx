import { useState } from "react";
import { FiUpload, FiGlobe, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const AddCommunity = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    privacy: "Public",
    logo: "",
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    setFormData({
      ...formData,
      logo: imageUrl,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/communities/create",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Community Created Successfully");
        navigate("/profile");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create community");
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

        .page{
          min-height:100vh;
          background:#F7F2F2;
          padding:30px 15px;
        }

        .container{
          max-width:600px;
          margin:auto;
        }

        .heading{
          margin-bottom:25px;
        }

        .heading h1{
          color:#4A3F44;
          font-size:2rem;
          margin-bottom:8px;
        }

        .heading p{
          color:#8A6D73;
        }

        .card{
          background:white;
          border:1px solid #E6DCDC;
          border-radius:28px;
          padding:30px;
          box-shadow:0 10px 25px rgba(0,0,0,.04);
        }

        .logo-section{
          display:flex;
          flex-direction:column;
          align-items:center;
          margin-bottom:30px;
        }

        .logo-preview{
          width:100px;
          height:100px;
          border-radius:20px;
          border:2px dashed #DCCFCF;
          overflow:hidden;
          margin-bottom:15px;
          background:#F7F2F2;
          display:flex;
          justify-content:center;
          align-items:center;
        }

        .logo-preview img{
          width:100%;
          height:100%;
          object-fit:cover;
        }

        .upload-btn{
          border:1px solid #DCCFCF;
          background:white;
          color:#6B5D63;
          padding:10px 18px;
          border-radius:999px;
          cursor:pointer;
          display:flex;
          align-items:center;
          gap:8px;
          font-weight:600;
        }

        .upload-note{
          margin-top:12px;
          color:#8A6D73;
          font-size:.9rem;
          text-align:center;
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

        .input,
        .textarea{
          width:100%;
          border:1px solid #E6DCDC;
          background:#FAF7F7;
          border-radius:16px;
          padding:15px;
          outline:none;
          font-size:1rem;
        }

        .textarea{
          resize:none;
          min-height:120px;
        }

        .privacy-grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:15px;
        }

        .privacy-card{
          border:2px solid #E6DCDC;
          border-radius:18px;
          padding:18px;
          cursor:pointer;
          transition:.3s;
        }

        .privacy-card.active{
          border-color:#5B4A52;
          background:#F6EFEF;
        }

        .privacy-icon{
          font-size:1.4rem;
          margin-bottom:10px;
          color:#5B4A52;
        }

        .privacy-title{
          font-weight:700;
          color:#4A3F44;
        }

        .privacy-sub{
          color:#8A6D73;
          font-size:.9rem;
          margin-top:5px;
        }

        .button-row{
          display:flex;
          gap:15px;
          margin-top:25px;
        }

        .cancel-btn{
          flex:1;
          border:1px solid #DCCFCF;
          background:white;
          color:#4A3F44;
          border-radius:999px;
          padding:15px;
          cursor:pointer;
          font-weight:600;
        }

        .create-btn{
          flex:1;
          border:none;
          background:#5B4A52;
          color:white;
          border-radius:999px;
          padding:15px;
          cursor:pointer;
          font-weight:600;
        }

        .create-btn:hover{
          background:#493A42;
        }

        @media(max-width:600px){

          .card{
            padding:20px;
          }

          .privacy-grid{
            grid-template-columns:1fr;
          }

          .button-row{
            flex-direction:column;
          }

          .heading h1{
            font-size:1.7rem;
          }
        }
      `}</style>

      <div className="page">
        <div className="container">

          <div className="heading">
            <h1>Create a Community</h1>
            <p>
              Set up a new workspace for your team or group.
            </p>
          </div>

          <form className="card" onSubmit={handleSubmit}>

            <div className="logo-section">

              <div className="logo-preview">
                <img
                  src={preview || logo}
                  alt="community logo"
                />
              </div>

              <label className="upload-btn">
                <FiUpload />
                Upload Logo

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </label>

              <p className="upload-note">
                Default ClipHub logo will be used if none uploaded
              </p>

            </div>

            <div className="form-group">
              <label className="label">
                Community Name
              </label>

              <input
                type="text"
                name="name"
                className="input"
                placeholder="e.g. Engineering Guild"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="label">
                Description
              </label>

              <textarea
                name="description"
                className="textarea"
                placeholder="What is this community about?"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">

              <label className="label">
                Privacy Type
              </label>

              <div className="privacy-grid">

                <div
                  className={`privacy-card ${
                    formData.privacy === "Public"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      privacy: "Public",
                    })
                  }
                >
                  <div className="privacy-icon">
                    <FiGlobe />
                  </div>

                  <div className="privacy-title">
                    Public
                  </div>

                  <div className="privacy-sub">
                    Anyone can join
                  </div>
                </div>

                <div
                  className={`privacy-card ${
                    formData.privacy === "Private"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      privacy: "Private",
                    })
                  }
                >
                  <div className="privacy-icon">
                    <FiLock />
                  </div>

                  <div className="privacy-title">
                    Private
                  </div>

                  <div className="privacy-sub">
                    Invite only
                  </div>
                </div>

              </div>
            </div>

            <div className="button-row">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="create-btn"
              >
                Create Community
              </button>

            </div>

          </form>

        </div>
      </div>
    </>
  );
};

export default AddCommunity;