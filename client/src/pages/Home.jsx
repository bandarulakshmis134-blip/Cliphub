import {
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiSearch } from "react-icons/fi";
import defaultCommunityCover from "../assets/defaultCommunity.png";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [communities, setCommunities] =
    useState([]);

  useEffect(() => {
    const fetchCommunities =
      async () => {

        try {
          const url =
            search.trim() !== ""
              ? `http://localhost:5000/api/communities/search?search=${search}`
              : "http://localhost:5000/api/communities/popular";

          const response =
            await fetch(url);

          const data =
            await response.json();

          setCommunities(
            data.communities || []
          );

        } catch (error) {
          console.error(error);
        }
      };

    fetchCommunities();
  }, [search]);

  const publicCommunities =
    communities;

  return (
    <>
      <style>{`
        *{
          box-sizing:border-box;
        }

        .home-page{
          min-height:100vh;
          background:#F7F2F2;
          padding:40px 20px;
        }

        .home-container{
          max-width:1000px;
          margin:auto;
        }

        .heading{
          margin-bottom:25px;
        }

        .heading h1{
          color:#4A3F44;
          font-size:2.2rem;
          margin-bottom:8px;
        }

        .heading p{
          color:#6B5D63;
        }

        .search-container{
          display:flex;
          align-items:center;
          gap:10px;

          background:white;

          border:1px solid #E6DCDC;

          border-radius:18px;

          padding:0 18px;

          height:58px;

          margin-bottom:30px;
        }

        .search-icon{
          color:#8A6D73;
          font-size:1.2rem;
        }

        .search-input{
          flex:1;

          border:none;
          outline:none;

          background:transparent;

          color:#4A3F44;

          font-size:1rem;
        }

        .search-input::placeholder{
          color:#9A8E93;
        }

        .community-list{
          display:flex;
          flex-direction:column;
          gap:20px;
        }

        .community-card{
          background:white;

          border:1px solid #E6DCDC;

          border-radius:24px;

          padding:20px;

          display:flex;
          justify-content:space-between;
          align-items:center;

          transition:.3s ease;

          cursor:pointer;
        }

        .community-card:hover{
          transform:translateY(-3px);

          box-shadow:
          0 10px 25px rgba(91,74,82,.12);
        }

        .community-left{
          display:flex;
          align-items:center;
          gap:18px;
          flex:1;
        }

        .community-image{
          width:70px;
          height:70px;

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

          margin-bottom:8px;
        }

        .community-name{
          font-size:1.3rem;
          font-weight:700;
          color:#4A3F44;
        }

        .public{
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

        .community-members{
          display:flex;
          align-items:center;
          gap:8px;

          color:#6B5D63;
          font-weight:600;

          min-width:80px;
        }

        .no-results{
          text-align:center;
          color:#8A6D73;
          margin-top:30px;
          font-size:1rem;
        }

        @media(max-width:768px){

          .home-page{
            padding:25px 15px;
          }

          .heading h1{
            font-size:1.8rem;
          }

          .search-container{
            height:54px;
          }

          .community-card{
            flex-direction:column;
            align-items:flex-start;
            gap:15px;
          }

          .community-members{
            margin-left:88px;
          }
        }

        @media(max-width:480px){

          .home-page{
            padding:20px 12px;
          }

          .heading h1{
            font-size:1.5rem;
          }

          .community-left{
            align-items:flex-start;
          }

          .community-image{
            width:60px;
            height:60px;
          }

          .community-name{
            font-size:1.1rem;
          }

          .community-description{
            font-size:.9rem;
          }

          .community-members{
            margin-left:0;
          }

          .search-container{
            height:50px;
            padding:0 14px;
          }

          .search-input{
            font-size:.95rem;
          }
        }
      `}</style>

      <div className="home-page">
        <div className="home-container">

          <div className="heading">
            <h1>Popular Communities</h1>
            <p>The most active public workspaces on ClipHub</p>
          </div>

          <div className="search-container">
            <FiSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search public communities..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="community-list">

            {publicCommunities.length > 0 ? (
              publicCommunities.map((community) => (
                <div
                  key={community._id}
                  className="community-card"
                  onClick={() =>
                    navigate(
                      `/community/${community._id}`
                    )
                  }
                >
                  <div className="community-left">

                    <img
                      src={community.logo && community.logo.trim() !== ""
                                          ? community.logo
                                          : defaultCommunityCover}
                      alt={community.name}
                      className="community-image"
                    />

                    <div className="community-info">

                      <div className="community-top">

                        <div className="community-name">
                          {community.name}
                        </div>

                        <span className="public">
                          Public
                        </span>

                      </div>

                      <div className="community-description">
                        {community.description}
                      </div>

                    </div>
                  </div>

                  <div className="community-members">
                    <FiUsers />
                    {community.members?.length || 0}
                  </div>

                </div>
              ))
            ) : (
              <div className="no-results">
                No public communities found.
              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
};

export default Home;