import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiUsers } from "react-icons/fi";
import defaultCommunityCover from "../assets/defaultCommunity.png";

const Communities = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(
      "http://localhost:5000/api/communities/user-communities",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCommunities(data.communities);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        *{
          box-sizing:border-box;
        }

        .communities-page{
          min-height:100vh;
          background:#F7F2F2;
          padding:35px 20px;
        }

        .communities-container{
          max-width:1000px;
          margin:auto;
        }

        .page-header{
          margin-bottom:25px;
        }

        .page-header h1{
          color:#4A3F44;
          font-size:2rem;
          margin-bottom:8px;
        }

        .page-header p{
          color:#8A6D73;
        }

        .search-box{
          display:flex;
          align-items:center;
          gap:12px;

          background:white;

          border:1px solid #E6DCDC;

          border-radius:18px;

          padding:0 18px;

          height:58px;

          margin-bottom:25px;
        }

        .search-icon{
          color:#8A6D73;
          font-size:1.1rem;
        }

        .search-input{
          flex:1;

          border:none;
          outline:none;

          background:transparent;

          font-size:1rem;

          color:#4A3F44;
        }

        .search-input::placeholder{
          color:#9A8E93;
        }

        .count-text{
          color:#8A6D73;
          margin-bottom:18px;
          font-size:1rem;
        }

        .community-list{
          display:flex;
          flex-direction:column;
          gap:16px;
        }

        .community-card{
          background:white;

          border:1px solid #E6DCDC;

          border-radius:24px;

          padding:20px;

          display:flex;
          align-items:center;

          transition:.3s ease;

          cursor:pointer;
        }

        .community-card:hover{
          transform:translateY(-2px);

          box-shadow:
          0 10px 25px rgba(91,74,82,.10);
        }

        .community-image{
          width:72px;
          height:72px;

          border-radius:18px;

          object-fit:cover;

          margin-right:18px;
        }

        .community-content{
          flex:1;
        }

        .community-header{
          display:flex;
          align-items:center;
          gap:10px;
          flex-wrap:wrap;

          margin-bottom:8px;
        }

        .community-name{
          font-size:1.25rem;
          font-weight:700;
          color:#4A3F44;
        }

        .public-badge{
          background:#E8F5EB;
          color:#2D7A46;

          padding:4px 10px;

          border-radius:999px;

          font-size:.8rem;
          font-weight:600;
        }

        .private-badge{
          background:#FFF0EA;
          color:#B8562D;

          padding:4px 10px;

          border-radius:999px;

          font-size:.8rem;
          font-weight:600;
        }

        .community-description{
          color:#6B5D63;
          line-height:1.6;
          margin-bottom:8px;
        }

        .member-count{
          display:flex;
          align-items:center;
          gap:6px;

          color:#8A6D73;

          font-size:.95rem;
        }

        .empty-state{
          text-align:center;
          color:#8A6D73;
          margin-top:30px;
        }

        @media(max-width:768px){

          .communities-page{
            padding:25px 15px;
          }

          .page-header h1{
            font-size:1.7rem;
          }

          .community-card{
            align-items:flex-start;
          }

          .community-image{
            width:60px;
            height:60px;
          }

          .community-name{
            font-size:1.1rem;
          }
        }

        @media(max-width:480px){

          .communities-page{
            padding:20px 12px;
          }

          .search-box{
            height:52px;
          }

          .search-input{
            font-size:.95rem;
          }

          .community-card{
            padding:16px;
          }

          .community-image{
            width:55px;
            height:55px;
            margin-right:12px;
          }

          .community-description{
            font-size:.9rem;
          }
        }
      `}</style>

      <div className="communities-page">
        <div className="communities-container">

          <div className="page-header">
            <h1>My Communities</h1>
            <p>
              Communities you've created or joined
            </p>
          </div>

          <div className="search-box">
            <FiSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search your communities..."
              className="search-input"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="count-text">
            {filteredCommunities.length} communities
          </div>

          <div className="community-list">

            {filteredCommunities.length > 0 ? (
              filteredCommunities.map((community) => (
                <div
                  key={community._id || community.id}
                  className="community-card"
                  onClick={() =>
                    navigate(`/community/${community._id}`)
                  }
                >

                  <img
                    src={
                      community.image ||
                      defaultCommunityCover
                    }
                    alt={community.name}
                    className="community-image"
                  />

                  <div className="community-content">

                    <div className="community-header">

                      <div className="community-name">
                        {community.name}
                      </div>

                      <span
                        className={
                          community.type === "Public"
                            ? "public-badge"
                            : "private-badge"
                        }
                      >
                        {community.type}
                      </span>

                    </div>

                    <div className="community-description">
                      {community.description}
                    </div>

                    <div className="member-count">
                      <FiUsers />
                      {community.members?.length || 0} members
                    </div>

                  </div>

                </div>
              ))
            ) : (
              <div className="empty-state">
                No communities found.
              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
};

export default Communities;