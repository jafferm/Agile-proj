const express = require('express');
const router = express.Router();
const {
  getCatalogs, 
  getCatalog, 
  createCatalog, 
  deleteCatalog, 
  updateCatalog
} = require('../controllers/catalogController');

// GET all catalogs
router.get('/', getCatalogs);

// GET a single catalog
router.get('/:id', getCatalog);

// POST a new catalog
router.post('/', createCatalog); // Ensure that POST route is correctly defined

// DELETE a catalog
router.delete('/:id', deleteCatalog);

// UPDATE a catalog
router.patch('/:id', updateCatalog);

module.exports = router;
