// App.js

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import UploadHouseForm from './components/UploadHouseForm';
import UploadStructuralForm from './components/UploadStructuralForm';
import UploadArticleForm from './components/UploadArticleForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload-house" element={<UploadHouseForm />} />
            <Route path="/upload-structural" element={<UploadStructuralForm />} />
            <Route path="/upload-article" element={<UploadArticleForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
