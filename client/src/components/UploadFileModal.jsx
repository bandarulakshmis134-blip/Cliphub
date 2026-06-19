import { useState } from "react";
import { FiX } from "react-icons/fi";

const UploadFileModal = ({ communityId, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [fileLink, setFileLink] =
    useState("");

  const handleUpload = async () => {
    if (!title || !fileLink) {
      alert(
        "Please enter title and provide a file link"
      );
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/communities/${communityId}/content`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            type: "file",
            url: fileLink,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("File uploaded successfully");
        window.location.reload();
      } else {
        alert(data.message || "Failed to upload file");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload file");
    }
  };

  return (
    <>
      <style>{`
        .modal-overlay{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.45);
          display:flex;
          justify-content:center;
          align-items:center;
          z-index:9999;
          padding:20px;
        }

        .modal{
          width:100%;
          max-width:500px;
          background:white;
          border-radius:24px;
          overflow:hidden;
          max-height:90vh;
          overflow-y:auto;
        }

        .modal-header{
          padding:22px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          border-bottom:1px solid #E6DCDC;
        }

        .modal-title{
          font-size:1.6rem;
          font-weight:700;
          color:#4A3F44;
        }

        .close-btn{
          border:none;
          background:none;
          font-size:1.4rem;
          cursor:pointer;
        }

        .modal-body{
          padding:22px;
        }

        .label{
          display:block;
          margin-bottom:8px;
          font-weight:600;
          color:#4A3F44;
        }

        .input{
          width:100%;
          padding:15px;
          border:1px solid #E6DCDC;
          border-radius:16px;
          margin-bottom:20px;
          outline:none;
        }

        .textarea{
          width:100%;
          min-height:100px;
          resize:none;
          padding:15px;
          border:1px solid #E6DCDC;
          border-radius:16px;
          margin-bottom:20px;
          outline:none;
        }

        .upload-box{
          border:2px dashed #D6DDE8;
          border-radius:20px;
          padding:40px 20px;
          text-align:center;
          cursor:pointer;
          margin-bottom:20px;
        }

        .upload-box svg{
          font-size:2rem;
          color:#6B5D63;
          margin-bottom:10px;
        }

        .upload-text{
          color:#6B5D63;
        }

        .file-input{
          display:none;
        }

        .modal-footer{
          display:flex;
          gap:15px;
        }

        .cancel-btn{
          flex:1;
          border:1px solid #E6DCDC;
          background:white;
          border-radius:999px;
          padding:14px;
          cursor:pointer;
        }

        .upload-btn{
          flex:1;
          border:none;
          background:#5B4A52;
          color:white;
          border-radius:999px;
          padding:14px;
          cursor:pointer;
          font-weight:600;
        }

        @media(max-width:768px){

          .modal{
            max-width:100%;
          }

          .modal-header{
            padding:18px;
          }

          .modal-body{
            padding:18px;
          }
        }

        @media(max-width:480px){

          .modal{
            border-radius:18px;
          }

          .modal-title{
            font-size:1.3rem;
          }

          .upload-box{
            padding:30px 15px;
          }

          .modal-footer{
            flex-direction:column;
          }

          .cancel-btn,
          .upload-btn{
            width:100%;
          }
        }
      `}</style>

      <div className="modal-overlay">
        <div className="modal">

          <div className="modal-header">
            <div className="modal-title">
              Upload File
            </div>

            <button
              className="close-btn"
              onClick={onClose}
            >
              <FiX />
            </button>
          </div>

          <div className="modal-body">

            <label className="label">
              Title
            </label>

            <input
              className="input"
              placeholder="e.g. Product Requirements Doc"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <label className="label">
              Description
            </label>

            <textarea
              className="textarea"
              placeholder="Brief description..."
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />

            <label className="label">
              File Link
            </label>

            <input
              className="input"
              placeholder="https://example.com/file.pdf"
              value={fileLink}
              onChange={(e) =>
                setFileLink(e.target.value)
              }
            />

            <div className="modal-footer">

              <button
                className="cancel-btn"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                className="upload-btn"
                onClick={handleUpload}
              >
                Upload
              </button>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UploadFileModal;