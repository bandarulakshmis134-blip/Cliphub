import {
  FiArrowLeft,
  FiUsers,
  FiPlus,
  FiLock,
  FiGlobe,
  FiTrash2,
} from "react-icons/fi";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  useEffect,
  useState,
} from "react";

import defaultCommunity from "../assets/defaultCommunity.png";
import defaultProfile from "../assets/defaultProfile.png";
import UploadVideoModal from "../components/UploadVideoModal";
import UploadFileModal from "../components/UploadFileModal";

const CommunityDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const user =
  JSON.parse(localStorage.getItem("user")) || {};

  const [community, setCommunity] =
    useState(null);

  const [activeTab, setActiveTab] =
    useState("videos");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showFileModal, setShowFileModal] =
    useState(false);
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.setItem(
        "redirectAfterLogin",
        window.location.pathname
      );

      navigate("/login");
    }
  }, [navigate]);

  const deleteCommunity = async () => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this community?"
      );

    if (!confirmDelete) return;

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `https://cliphub-kyq2.onrender.com/api/communities/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Community deleted successfully"
        );

        navigate("/profile");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert(
        "Failed to delete community"
      );
    }
  };

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const response = await fetch(
          `https://cliphub-kyq2.onrender.com/api/communities/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          console.log(
            data.community.members
          );

          setCommunity(data.community);
        }
      } catch (error) {
        console.log(error);
      }
    };

    void fetchCommunity();
  }, [id]);

  if (!community) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  const videos =
    community.contents?.filter(
      (item) => item.type === "video"
    ) || [];

  const files =
    community.contents?.filter(
      (item) => item.type === "file"
    ) || [];

  const isOwner =
    String(
      community.owner?._id ||
        community.owner
    ) === String(user.id);

  const isMember =
    community.members?.some(
      (member) =>
        String(member._id || member) ===
        String(user.id)
    );

  const shareCommunity = () => {
    const link =
      `${window.location.origin}/community/${community._id}`;

    navigator.clipboard.writeText(link);

    alert(
      "Community link copied!"
    );
  };

  const joinCommunity = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `https://cliphub-kyq2.onrender.com/api/communities/${community._id}/join`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Joined successfully");

        navigate("/communities");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to join community");
    }
  };

  const deleteContent = async (contentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this content item?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://cliphub-kyq2.onrender.com/api/communities/${community._id}/content/${contentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setCommunity((prev) => ({
          ...prev,
          contents: prev.contents.filter(
            (item) => item._id.toString() !== contentId.toString()
          ),
        }));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete content");
    }
  };

  return (
    <>
      <style>{`
        *{
          box-sizing:border-box;
        }

        .page{
          min-height:100vh;
          background:#F7F2F2;
          padding:30px 20px;
        }

        .container{
          max-width:1100px;
          margin:auto;
        }

        .back-btn{
          display:flex;
          align-items:center;
          gap:8px;

          color:#5B4A52;

          cursor:pointer;

          margin-bottom:20px;

          font-weight:600;
        }

        .community-card{
          background:white;

          border:1px solid #E6DCDC;

          border-radius:28px;

          padding:25px;

          display:flex;
          justify-content:space-between;
          gap:20px;

          margin-bottom:30px;
        }

        .community-left{
          display:flex;
          gap:20px;
          flex:1;
        }

        .community-logo{
          width:90px;
          height:90px;

          border-radius:20px;

          object-fit:cover;
        }

        .community-name{
          font-size:2rem;
          font-weight:700;
          color:#4A3F44;
        }

        .top-row{
          display:flex;
          align-items:center;
          gap:10px;
          flex-wrap:wrap;

          margin-bottom:10px;
        }

        .public{
          background:#E8F5EB;
          color:#2D7A46;

          padding:5px 12px;

          border-radius:999px;

          font-size:.8rem;
          font-weight:600;
        }

        .private{
          background:#FFF0EA;
          color:#B8562D;

          padding:5px 12px;

          border-radius:999px;

          font-size:.8rem;
          font-weight:600;
        }

        .delete-btn{
          border:none;

          background:#FFEAEA;

          color:#D64545;

          width:45px;
          height:45px;

          border-radius:50%;

          display:flex;
          align-items:center;
          justify-content:center;

          cursor:pointer;

          transition:.3s;
        }

        .delete-btn:hover{
          background:#FFDADA;
        }

        .description{
          color:#6B5D63;
          line-height:1.7;
          margin-bottom:15px;
        }

        .members{
          display:flex;
          align-items:center;
          gap:8px;

          color:#3366E8;
          font-weight:600;
        }

        .action-buttons{
          display:flex;
          gap:10px;
          align-self:flex-start;
        }

        .btn-primary{
          border:none;

          background:#5B4A52;

          color:white;

          padding:12px 18px;

          border-radius:999px;

          cursor:pointer;

          font-weight:600;
        }

        .btn-secondary{
          border:1px solid #D8D8D8;

          background:white;

          color:#4A3F44;

          padding:12px 18px;

          border-radius:999px;

          cursor:pointer;

          font-weight:600;
        }

        .tabs{
          display:flex;

          background:white;

          width:max-content;

          border-radius:20px;

          border:1px solid #E6DCDC;

          margin-bottom:25px;
        }

        .tab{
          border:none;

          background:none;

          padding:14px 24px;

          cursor:pointer;

          font-weight:600;

          color:#6B5D63;
        }

        .active-tab{
          background:#5B4A52;
          color:white;
          border-radius:18px;
        }

        .content-grid{
          display:grid;
          grid-template-columns:
          repeat(auto-fill,minmax(300px,1fr));

          gap:25px;
        }

        .content-card{
          position:relative;
          background:white;

          border:1px solid #E6DCDC;

          border-radius:24px;

          overflow:hidden;
        }

        .content-delete-btn{
          position:absolute;
          top:12px;
          right:12px;

          width:34px;
          height:34px;

          border:none;
          border-radius:50%;
          background:rgba(255,255,255,0.9);

          display:flex;
          align-items:center;
          justify-content:center;

          cursor:pointer;
          transition:.2s;
        }

        .content-delete-btn:hover{
          background:#FFEAEA;
        }

        .content-image{
          width:100%;
          height:220px;

          object-fit:cover;
        }

        .content-info{
          padding:16px;
        }

        .content-title{
          font-size:1.1rem;
          font-weight:700;

          color:#4A3F44;

          margin-bottom:10px;
        }

        .content-description{
          color:#6B5D63;
          font-size:.95rem;
          line-height:1.5;
          margin-top:8px;
        }

        .content-date{
          color:#8A6D73;
          font-size:.85rem;
          margin-top:4px;
        }

        .empty-state{
          text-align:center;

          padding:60px 20px;

          color:#8A6D73;
        }

        @media(max-width:768px){

          .community-card{
            flex-direction:column;
          }

          .community-left{
            flex-direction:column;
          }

          .action-buttons{
            width:100%;
          }

          .btn-primary,
          .btn-secondary{
            flex:1;
          }
        }

        @media(max-width:480px){

          .page{
            padding:20px 12px;
          }

          .community-name{
            font-size:1.5rem;
          }

          .community-logo{
            width:75px;
            height:75px;
          }

          .content-grid{
            grid-template-columns:1fr;
          }
        }

        .modal-overlay{
          position:fixed;
          inset:0;

          background:rgba(0,0,0,.35);

          display:flex;
          justify-content:center;
          align-items:center;

          z-index:9999;
        }

        .members-modal{
          width:90%;
          max-width:450px;

          background:white;

          border-radius:24px;

          border:1px solid #E6DCDC;

          padding:20px;
        }

        .members-header{
          font-size:1.4rem;
          font-weight:700;
          color:#4A3F44;

          margin-bottom:20px;
        }

        .members-list{
          max-height:350px;

          overflow-y:auto;

          display:flex;
          flex-direction:column;

          gap:12px;

          padding-right:5px;
        }

        .member-item{
          display:flex;
          align-items:center;

          gap:12px;

          padding:12px;

          border:1px solid #EFE4E4;

          border-radius:16px;

          background:#FAF7F7;
        }

        .member-avatar{
          width:50px;
          height:50px;

          border-radius:50%;

          object-fit:cover;

          border:2px solid #EFE4E4;
        }

        .member-name{
          font-weight:600;
          color:#4A3F44;
        }

        .close-members-btn{
          width:100%;

          margin-top:18px;

          border:none;

          background:#5B4A52;

          color:white;

          padding:14px;

          border-radius:16px;

          cursor:pointer;

          font-weight:600;
        }

        .close-members-btn:hover{
          background:#473940;
        }
      `}</style>

      <div className="page">
        <div className="container">

          <div
            className="back-btn"
            onClick={() =>
              navigate("/communities")
            }
          >
            <FiArrowLeft />
            Back to Communities
          </div>

          <div className="community-card">

            <div className="community-left">

              <img
                src={
                  community.logo ||
                  defaultCommunity
                }
                alt={community.name}
                className="community-logo"
              />

              <div>

                <div className="top-row">

                  <div className="community-name">
                    {community.name}
                  </div>

                  <span
                    className={
                      community.privacy ===
                      "Public"
                        ? "public"
                        : "private"
                    }
                  >
                    {community.privacy ===
                    "Public" ? (
                      <FiGlobe />
                    ) : (
                      <FiLock />
                    )}{" "}
                    {community.privacy}
                  </span>

                </div>

                <div className="description">
                  {community.description}
                </div>

                <div
                  className="members"
                  onClick={() => {
                    if (isOwner) {
                      setShowMembers(true);
                    }
                  }}
                  style={{
                    cursor: isOwner
                      ? "pointer"
                      : "default",
                  }}
                >
                  <FiUsers />
                  {community.members?.length || 0}
                  {" "}members
                </div>

              </div>

            </div>

            <div className="action-buttons">
              {isOwner ? (
                <>
                  <button className="btn-primary"  onClick={() => setShowVideoModal(true)}>
                    <FiPlus />
                    {" "}Video
                  </button>

                  <button
                    className="btn-secondary"
                    onClick={() => setShowFileModal(true)}
                  >
                    <FiPlus />
                    {" "}File
                  </button>

                  <button
                    className="btn-secondary"
                    onClick={shareCommunity}
                  >
                    Share
                  </button>

                  <button
                    className="delete-btn"
                    onClick={deleteCommunity}
                  >
                    <FiTrash2 />
                  </button>
                </>
              ) : (
                <>
                  {!isOwner && !isMember && (
                    <button
                      className="btn-secondary"
                      onClick={joinCommunity}
                    >
                      Join Community
                    </button>
                  )}

                  {isMember && !isOwner && (
                    <button className="btn-secondary" disabled>
                      Joined
                    </button>
                  )}
                </>
              )}
            </div>

          </div>

          <div className="tabs">

            <button
              className={`tab ${
                activeTab === "videos"
                  ? "active-tab"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("videos")
              }
            >
              Videos
            </button>

            <button
              className={`tab ${
                activeTab === "files"
                  ? "active-tab"
                  : ""
              }`}
              onClick={() =>
                setActiveTab("files")
              }
            >
              Files
            </button>

          </div>

          <div className="content-grid">

            {(activeTab === "videos"
              ? videos
              : files
            ).map((item) => (
              <div
                key={item._id}
                className="content-card"
                onClick={() =>
                  window.open(
                    item.url,
                    "_blank"
                  )
                }
              >
                <button
                  className="content-delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteContent(item._id);
                  }}
                  aria-label="Delete content"
                >
                  <FiTrash2 />
                </button>

                <div className="content-info">

                  <div className="content-title">
                    {item.title}
                  </div>

                  <div className="content-date">
                    {new Date(item.uploadedAt)
                      .toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                  </div>

                  <div className="content-description">
                    {item.description}
                  </div>

                </div>

              </div>
            ))}

          </div>

          {((activeTab === "videos"
            ? videos
            : files
          ).length === 0) && (
            <div className="empty-state">
              No {activeTab} uploaded yet.
            </div>
          )}

          {showVideoModal && (
            <UploadVideoModal
              communityId={community._id}
              onClose={() => setShowVideoModal(false)}
            />
          )}

          {showMembers && (
            <div className="modal-overlay">
              <div className="members-modal">
                <div className="members-header">
                  Community Members
                </div>

                <div className="members-list">
                  {community.members?.map(
                    (member) => (
                      <div
                        key={member._id || member.email}
                        className="member-item"
                      >
                        <img
                          src={
                            member.profilePic ||
                            defaultProfile
                          }
                          alt={member.fullName}
                          className="member-avatar"
                        />
                        <div
                          className="member-name"
                        >
                          {member.fullName}
                        </div>
                      </div>
                    )
                  )}
                </div>

                <button
                  className="close-members-btn"
                  onClick={() =>
                    setShowMembers(false)
                  }
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {showFileModal && (
            <UploadFileModal
              communityId={community._id}
              onClose={() => setShowFileModal(false)}
            />
          )}

        </div>
      </div>
    </>
  );
};

export default CommunityDetails;