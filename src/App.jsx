import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

function App() {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    section: "",
    audio: null,
    image: null,
  });

  const artists = ["Artist 1", "Artist 2", "Artist 3"]; //
  const sections = ["Section 1", "Section 2", "Section 3"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "audio" || name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      // Upload audio to Firebase Storage
      const audioRef = ref(storage, `audios/${formData.audio.name}`);
      await uploadBytes(audioRef, formData.audio);
      const audioURL = await getDownloadURL(audioRef);

      // Upload image to Firebase Storage
      const imageRef = ref(storage, `images/${formData.image.name}`);
      await uploadBytes(imageRef, formData.image);
      const imageURL = await getDownloadURL(imageRef);

      // Save data to Realtime Database
      const musicData = {
        title: formData.title,
        artist: formData.artist,
        section: formData.section,
        audioURL: audioURL,
        imageURL: imageURL,
      };

      await push(dbRef(db, "music"), musicData);

      alert("Data submitted successfully!");
      setFormData({
        title: "",
        artist: "",
        section: "",
        audio: null,
        image: null,
      });
    } catch (error) {
      console.log("FormData:", formData);
      console.log("Audio:", formData.audio);
      console.log("Image:", formData.image);
      console.error("Error submitting form:", error);
      alert("Failed to submit data.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Music Details</h2>
      <form
        onSubmit={postData}
        className="p-4 shadow rounded bg-dark text-light"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        {/* Title Field */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Artist Dropdown */}
        <div className="mb-3">
          <label htmlFor="artist" className="form-label">
            Artist Name
          </label>
          <select
            className="form-select"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
          >
            <option value="">Select an artist</option>
            {artists.map((artist, index) => (
              <option key={index} value={artist}>
                {artist}
              </option>
            ))}
          </select>
        </div>

        {/* Section Dropdown */}
        <div className="mb-3">
          <label htmlFor="section" className="form-label">
            Section Name
          </label>
          <select
            className="form-select"
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
          >
            <option value="">Select a section</option>
            {sections.map((section, index) => (
              <option key={index} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>

        {/* Audio Picker */}
        <div className="mb-3">
          <label htmlFor="audio" className="form-label">
            Upload Audio
          </label>
          <input
            type="file"
            className="form-control"
            id="audio"
            name="audio"
            accept="audio/*"
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Picker */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-danger w-100">
          Submit
        </button>
      </form>
    </div>
  );
}
export default App;
