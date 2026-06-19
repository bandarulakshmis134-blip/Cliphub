import { FiEdit2, FiUsers, FiPlus, FiMail, FiPhone } from "react-icons/fi";
import defaultProfile from "../assets/defaultProfile.png";
import defaultCommunity from "../assets/defaultCommunity.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};
  const [createdCommunities, setCreatedCommunities] = useState([]);

  const fetchMyCommunities = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://cliphub-kyq2.onrender.com/api/communities/my-communities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setCreatedCommunities(data.communities);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadCommunities = async () => {
      await fetchMyCommunities();
    };

    void loadCommunities();
  }, []);


  return (
    <>
      <style>{`
        *{
          box-sizing:border-box;
        }

        .profile-page{
          min-height:100vh;
          background:#F7F2F2;
          padding:30px 20px;
        }

        .profile-container{
          max-width:1100px;
          margin:auto;
        }

        .profile-card{
          background:#FFFFFF;
          border:1px solid #E6DCDC;
          border-radius:28px;

          padding:30px;

          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          gap:25px;

          margin-bottom:35px;
        }

        .profile-left{
          display:flex;
          gap:25px;
          flex:1;
        }

        .profile-image{
          width:120px;
          height:120px;

          border-radius:50%;
          object-fit:cover;

          border:4px solid #EFE4E4;
        }

        .profile-info{
          flex:1;
        }

        .profile-name{
          font-size:2rem;
          font-weight:700;
          color:#4A3F44;
          margin-bottom:10px;
        }

        .contact-row{
          display:flex;
          flex-wrap:wrap;
          gap:20px;

          margin-bottom:15px;

          color:#6B5D63;
        }

        .contact-item{
          display:flex;
          align-items:center;
          gap:8px;
        }

        .profile-description{
          color:#6B5D63;
          line-height:1.8;
          max-width:650px;
        }

        .edit-btn{
          border:none;
          background:#F3ECEC;

          color:#5B4A52;

          padding:14px 22px;

          border-radius:999px;

          display:flex;
          align-items:center;
          gap:8px;

          cursor:pointer;

          font-weight:600;

          transition:.3s;
        }

        .edit-btn:hover{
          background:#E9DDDD;
        }

        .section-header{
          display:flex;
          justify-content:space-between;
          align-items:center;

          margin-bottom:20px;
        }

        .section-title{
          color:#4A3F44;
        }

        .section-title h2{
          font-size:2rem;
          margin-bottom:5px;
        }

        .section-title p{
          color:#8A6D73;
        }

        .add-btn{
          border:none;

          background:#5B4A52;
          color:white;

          padding:14px 24px;

          border-radius:999px;

          display:flex;
          align-items:center;
          gap:8px;

          cursor:pointer;

          font-weight:600;

          transition:.3s;
        }

        .add-btn:hover{
          background:#473940;
        }

        .community-list{
          display:flex;
          flex-direction:column;
          gap:18px;
        }

        .community-card{
          background:white;

          border:1px solid #E6DCDC;

          border-radius:24px;

          padding:20px;

          display:flex;
          justify-content:space-between;
          align-items:center;

          transition:.3s;
          cursor:pointer;
        }

        .community-card:hover{
          transform:translateY(-2px);

          box-shadow:
          0 10px 25px rgba(91,74,82,.10);
        }

        .community-left{
          display:flex;
          align-items:center;
          gap:15px;
          flex:1;
        }

        .community-image{
          width:65px;
          height:65px;

          border-radius:18px;
          object-fit:cover;
        }

        .community-info{
          flex:1;
        }

        .community-top{
          display:flex;
          align-items:center;
          gap:10px;
          flex-wrap:wrap;

          margin-bottom:6px;
        }

        .community-name{
          font-size:1.2rem;
          font-weight:700;
          color:#4A3F44;
        }

        .private-badge{
          background:#FFF0EA;
          color:#B8562D;

          padding:5px 12px;

          border-radius:999px;

          font-size:.8rem;
          font-weight:600;
        }

        .public-badge{
          background:#E8F5EB;
          color:#2D7A46;

          padding:5px 12px;

          border-radius:999px;

          font-size:.8rem;
          font-weight:600;
        }

        .community-description{
          color:#6B5D63;
          line-height:1.6;
        }

        .member-count{
          display:flex;
          align-items:center;
          gap:8px;

          color:#6B5D63;
          font-weight:600;
        }

        @media(max-width:768px){

          .profile-card{
            flex-direction:column;
          }

          .profile-left{
            flex-direction:column;
            align-items:center;
            text-align:center;
          }

          .contact-row{
            justify-content:center;
          }

          .section-header{
            flex-direction:column;
            gap:15px;
            align-items:flex-start;
          }

          .community-card{
            flex-direction:column;
            align-items:flex-start;
            gap:15px;
          }

          .member-count{
            margin-left:80px;
          }
        }

        @media(max-width:480px){

          .profile-page{
            padding:20px 12px;
          }

          .profile-image{
            width:95px;
            height:95px;
          }

          .profile-name{
            font-size:1.6rem;
          }

          .section-title h2{
            font-size:1.6rem;
          }

          .community-image{
            width:55px;
            height:55px;
          }

          .member-count{
            margin-left:0;
          }

          .add-btn{
            width:100%;
            justify-content:center;
          }
        }
      `}</style>

      <div className="profile-page">
        <div className="profile-container">

          <div className="profile-card">

            <div className="profile-left">

              <img
                src={user.profilePic || defaultProfile}
                alt="profile"
                className="profile-image"
              />

              <div className="profile-info">

                <div className="profile-name">
                  {user.fullName || "ClipHub User"}
                </div>

                <div className="contact-row">

                  <div className="contact-item">
                    <FiPhone />
                    {user.phone || "No Phone Number"}
                  </div>

                  <div className="contact-item">
                    <FiMail />
                    {user.email || "No Email"}
                  </div>

                </div>

                <div className="profile-description">
                  {user.description ||
                    "Welcome to ClipHub."}
                </div>

              </div>
            </div>

            <button
              className="edit-btn"
              onClick={() => navigate("/edit-profile")}
            >
              <FiEdit2 />
              Edit Profile
            </button>

          </div>

          <div className="section-header">

            <div className="section-title">
              <h2>Created Communities</h2>
              <p>
                {createdCommunities.length} communities
              </p>
            </div>

            <button className="add-btn" onClick={() => navigate("/add-community")}>
              <FiPlus />
              Add Community
            </button>

          </div>

          <div className="community-list">

            {createdCommunities.map((community) => (
              <div
                key={community._id || community.id}
                className="community-card"
                onClick={() =>
                  navigate(`/community/${community._id}`)
                }
              >

                <div className="community-left">

                  <img
                    src={community.logo || defaultCommunity}
                    alt={community.name}
                    className="community-image"
                  />

                  <div className="community-info">

                    <div className="community-top">

                      <div className="community-name">
                        {community.name}
                      </div>

                      <span className={
                        community.privacy === "Public"
                          ? "public-badge"
                          : "private-badge"
                      }>
                        {community.privacy}
                      </span>

                    </div>

                    <div className="community-description">
                      {community.description}
                    </div>

                  </div>

                </div>

                <div className="member-count">
                  <FiUsers />
                  {community.members?.length || 0}
                </div>

              </div>
            ))}

          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;