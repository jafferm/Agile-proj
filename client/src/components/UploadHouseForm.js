import { useEffect, useState } from "react";
import { useCatalogContext } from '../hooks/useCatalogContext';
import { useNavigate } from 'react-router-dom'; 
import Select from "react-select";
import axios from "axios";


function UploadHouseForm() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("http://localhost:5000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "http://localhost:5000/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status == "ok") {
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  };
  const showPdf = (pdf) => {
    // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    setPdfFile(`http://localhost:5000/files/${pdf}`)
  };
 
  const tagOptions = [
    { value: "residential", label: "Residential" },
    { value: "business", label: "Business" },
    { value: "commercial", label: "Commercial" },
    { value: "farm", label: "Farm" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "sustainable", label: "Sustainable" },
    { value: "tiny house", label: "Tiny House" },
    { value: "single-story", label: "Single-Story" },
    { value: "two-story", label: "Two-Story" },
    { value: "hut", label: "Hut" },
    { value: "component", label: "Component" },
    { value: "decorative", label: "Decorative" },
    { value: "retaining", label: "Retaining" },
    { value: "earthquake", label: "Earthquake" },
    { value: "hurricane", label: "Hurricane" },
    { value: "Tudor", label: "Tudor" },
    { value: "cape cod", label: "Cape Cod" },
    { value: "Mediterranean", label: "Mediterranean" },
    { value: "southwest", label: "Southwest" },
    { value: "modern", label: "Modern" },
    { value: "craftsman", label: "Craftsman" },
    { value: "contemporary", label: "Contemporary" },
    { value: "specialty", label: "Specialty" },
    { value: "industrial", label: "Industrial" },
    { value: "beach", label: "Beach" },
    { value: "bungalow", label: "Bungalow" },
    { value: "cabin", label: "Cabin" },
    { value: "colonial", label: "Colonial" },
    { value: "classical", label: "Classical" },
    { value: "farmhouse", label: "Farmhouse" },
    { value: "ranch", label: "Ranch" },
    { value: "prairie", label: "Prairie" },
    { value: "southern", label: "Southern" },
    { value: "Victorian", label: "Victorian" },
  ];
  return (
    <div className="form-container">
      <form className="create" onSubmit={submitImage}> 
        <h3>Upload House Model</h3>

        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          class="form-control"
          accept=".pdf,.stl,.obj"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button class="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      
      
    </div>
);
};

export default UploadHouseForm;
