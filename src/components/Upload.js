import React, { useEffect, useState } from "react";
import { storage } from "../firebase/firebase";
import "./style.css";
import ProgressBar from "@ramonak/react-progress-bar";

const Upload = () => {
  const [image, setImage] = useState({ name: "No Image" });
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [lastImage, setLastImage] = useState("");

  useEffect(() => {
    if (image.name !== "No Image") {
      if (lastImage !== "") {
        storage
          .ref("/")
          .child(lastImage)
          .delete()
          .then(() => console.log("Done!"))
          .catch(() => console.log("ERROR"));
      }
      handleUpload();
    }
  }, [image]);

  const handleUpload = () => {
    const uploadTask = storage.ref(`/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("/")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
        setLastImage(image.name);
        setReady(true);
      }
    );
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  console.log("image: ", image);

  return (
    <div>
      <br />
      {ready ? (
        <>
          <input
            type="file"
            style={{ display: "none" }}
            id="img"
            onChange={handleChange}
          />
          <button
            className="img-upload"
            style={{
              backgroundImage: `url(${url})`,
              imageResolution: "from-image",
            }}
          >
            <label htmlFor="img" className="img-label">
              +
            </label>
          </button>
        </>
      ) : (
        <>
          <input
            type="file"
            style={{ display: "none" }}
            id="img"
            onChange={handleChange}
          />
          <button className="img-add">
            <label htmlFor="img" className="img-label">
              +
            </label>
          </button>
        </>
      )}
      <ProgressBar completed={progress} width="21%" bgcolor="#21AB91" margin="10px" labelAlignment="center" />
    </div>
  );
};

export default Upload;
