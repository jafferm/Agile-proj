const Catalog = require('../models/catalogModel');

// get all Catalogs
const getCatalogs = async (req, res) => {
  try {
    const catalogs = await Catalog.find({}).sort({createdAt: -1});
    res.status(200).json(catalogs);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle internal server error
  }
};

// get a single catalog
const getCatalog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such catalog'});
    }

    const catalog = await Catalog.findById(id);

    if (!catalog) {
      return res.status(404).json({error: 'No such catalog'});
    }

    res.status(200).json(catalog);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle internal server error
  }
};

// create a new Catalog
const createCatalog = async (req, res) => {
  try {
    const { structureType, userId, images, tags, files } = req.body;
    const catalog = await Catalog.create({ structureType, userId, images, tags, files });
    res.status(200).json(catalog);
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle bad request
  }
};

// delete a catalog
const deleteCatalog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such catalog'});
    }

    const catalog = await Catalog.findOneAndDelete({_id: id});

    if(!catalog) {
      return res.status(400).json({error: 'No such catalog'});
    }

    res.status(200).json(catalog);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle internal server error
  }
};

// update a catalog
const updateCatalog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such catalog'});
    }

    const catalog = await Catalog.findOneAndUpdate({_id: id}, { ...req.body });

    if (!catalog) {
      return res.status(400).json({error: 'No such catalog'});
    }

    res.status(200).json(catalog);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle internal server error
  }
};

module.exports = {
  getCatalogs,
  getCatalog,
  createCatalog,
  deleteCatalog,
  updateCatalog
};
