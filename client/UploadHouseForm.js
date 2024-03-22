import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Select from "react-select";

const UploadHouseForm = () => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);
  const [formData, setFormData] = useState({
    structureId: '',
    structureType: 'House',
    userId: 'User1',
    images: [],
    tags: '',
    files: []
  });

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files,
      // Clear emptyFields state when images are selected
      emptyFields: emptyFields.filter(field => field !== 'images')
    });
  };
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedExtensions = ['.pdf', '.obj', '.stl'];
    const validFiles = files.filter(file => {
      const extension = file.name.split('.').pop();
      return allowedExtensions.includes(`.${extension.toLowerCase()}`);
    });
  
    if (validFiles.length !== files.length) {
      setError('Please upload files with .pdf, .obj, or .stl extensions only.');
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        files: [...prevFormData.files, ...validFiles],
        // Clear emptyFields state when files are selected
        emptyFields: emptyFields.filter(field => field !== 'files'),
        // Also clear error if previously set
        error: null
      }));
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { structureId, userId, images, files } = formData;
  
    console.log("Empty fields:", emptyFields); // Add this line for debugging
  
    // Handle form submission, e.g., send formData to backend
    console.log(formData);

    navigate('/');
  
    // Clear form data after submission if needed
    setFormData({
      structureId: '',
      structureType: 'house',
      userId: 'User1',
      images: [],
      tags: '',
      files: []
    });
  
    setError(null);
    setEmptyFields([]);
  };
  

  const handleCancel = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <div className="form-container">
      <form className="create" onSubmit={handleSubmit}> 
        <h3>Upload House Model</h3>
    
        <label htmlFor="structureType">Structure Type</label>
        <input 
          type="text" 
          id="structureType" 
          name="structureType" 
          value={formData.structureType} 
          readOnly // Prevent editing
        />

        <label htmlFor="userId">User ID</label>
        <input 
          type="text" 
          id="userId" 
          name="userId" 
          value={formData.userId} 
          readOnly // Prevent editing
        />

        <label htmlFor="images">Images</label>
        <input 
          type="file" 
          id="images" 
          name="images" 
          onChange={handleImageChange} 
          multiple 
          accept="image/*" 
          className={emptyFields.includes('images') ? 'error' : ''}
        />

        <label htmlFor="tags">Tags</label>
        <Select
          id="tags"
          name="tags"
          value={selectedTags.map(tag => ({ value: tag, label: tag }))}
          onChange={(selectedOptions) => setSelectedTags(selectedOptions.map(option => option.value))}
          options={tagOptions}
          isMulti
        /><br/>

        <label htmlFor="files">Files</label>
        <input 
          type="file" 
          id="files" 
          name="files" 
          onChange={handleFileChange} 
          multiple 
          className={emptyFields.includes('files') ? 'error' : ''}
        />

        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
        
        {error && <div className="error">{error}</div>}

        {formData.files.length > 0 && (
          <div>
            <h4>Selected Files:</h4>
            <ul>
              {formData.files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadHouseForm;
