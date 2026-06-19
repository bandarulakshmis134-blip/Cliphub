import { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../assets/defaultProfile.png";

const EditProfile = () => {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [fullName, setFullName] = useState(
    user.fullName || ""
  );

  const [email, setEmail] = useState(
    user.email || ""
  );

  const [phone, setPhone] = useState(
    user.phone || ""
  );

  const [description, setDescription] =
    useState(user.description || "");

  const [profilePic, setProfilePic] =
    useState(
      user.profilePic || defaultProfile
    );

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePic(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "https://cliphub-kyq2.onrender.com/api/users/profile",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            fullName,
            email,
            phone,
            description,
            profilePic,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        alert(
          "Profile updated successfully"
        );

        navigate("/profile");
      } else {
        alert(
          data.message ||
            "Failed to update profile"
        );
      }
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  return (
    <>
      <style>{`
        *{
          box-sizing:border-box;
        }

        .edit-page{
          min-height:100vh;
          background:#F7F2F2;
          padding:30px 20px;
        }

        .edit-container{
          max-width:800px;
          margin:auto;
        }

        .edit-card{
          background:#FFFFFF;

          border:1px solid #E6DCDC;

          border-radius:28px;

          padding:35px;
        }

        .title{
          color:#4A3F44;

          font-size:2rem;

          font-weight:700;

          margin-bottom:8px;
        }

        .subtitle{
          color:#8A6D73;

          margin-bottom:30px;
        }

        .profile-preview{
          display:flex;
          justify-content:center;

          margin-bottom:25px;
        }

        .profile-image{
          width:120px;
          height:120px;

          border-radius:50%;

          object-fit:cover;

          border:4px solid #EFE4E4;
        }

        .form-group{
          margin-bottom:20px;
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

          padding:15px;

          border:1px solid #E6DCDC;

          border-radius:15px;

          outline:none;

          background:#FAF7F7;

          color:#4A3F44;

          font-size:1rem;
        }

        .input:focus,
        .textarea:focus{
          border-color:#8A6D73;
        }

        .textarea{
          resize:none;

          min-height:120px;
        }

        .button-group{
          display:flex;
          gap:15px;

          margin-top:25px;
        }

        .cancel-btn{
          flex:1;

          border:none;

          padding:15px;

          border-radius:16px;

          background:#EFE4E4;

          color:#5B4A52;

          font-weight:600;

          cursor:pointer;
        }

        .save-btn{
          flex:1;

          border:none;

          padding:15px;

          border-radius:16px;

          background:#5B4A52;

          color:white;

          font-weight:600;

          cursor:pointer;

          transition:.3s;
        }

        .save-btn:hover{
          background:#473940;
        }

        @media(max-width:768px){

          .edit-card{
            padding:25px;
          }

          .title{
            font-size:1.8rem;
          }
        }

        @media(max-width:480px){

          .edit-page{
            padding:20px 12px;
          }

          .edit-card{
            padding:20px;
            border-radius:20px;
          }

          .title{
            font-size:1.5rem;
          }

          .profile-image{
            width:100px;
            height:100px;
          }

          .button-group{
            flex-direction:column;
          }
        }
      `}</style>

      <div className="edit-page">
        <div className="edit-container">

          <div className="edit-card">

            <h1 className="title">
              Edit Profile
            </h1>

            <p className="subtitle">
              Update your profile information
            </p>

            <div className="profile-preview">
              <img
                src={profilePic}
                alt="profile"
                className="profile-image"
              />
            </div>

            <div className="form-group">
              <label className="label">
                Upload Profile Image
              </label>

              <input
                type="file"
                accept="image/*"
                className="input"
                onChange={handleImageChange}
              />
            </div>

            <div className="form-group">
              <label className="label">
                Full Name
              </label>

              <input
                type="text"
                className="input"
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label className="label">
                Email
              </label>

              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label className="label">
                Phone Number
              </label>

              <input
                type="text"
                className="input"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label className="label">
                Description
              </label>

              <textarea
                className="textarea"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="button-group">

              <button
                className="cancel-btn"
                onClick={() =>
                  navigate("/profile")
                }
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default EditProfile;