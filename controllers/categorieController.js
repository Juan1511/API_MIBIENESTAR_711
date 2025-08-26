const { categories } = require('../models');

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
  try {
    const allCategories = await categories.findAll();
    res.json(allCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una categoría por ID
const getCategorie = async (req, res) => {
  try {
    const categorie = await categories.findByPk(req.params.categorieId);
    if (!categorie) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una categoría
const createCategorie = async (req, res) => {
  try {
    console.log('📝 Intentando crear categoría con datos:', req.body);
    
    const { name, description, image } = req.body;
    const newCategorie = await categories.create({ 
      name, 
      description, 
      image 
    });
    
    console.log('✅ Categoría creada exitosamente:', newCategorie.toJSON());
    
    // Verificar que la categoría se guardó consultándola nuevamente
    const savedCategorie = await categories.findByPk(newCategorie.id);
    console.log('🔍 Verificación de guardado:', savedCategorie ? '✅ Encontrada' : '❌ No encontrada');
    
    res.status(201).json(newCategorie);
  } catch (error) {
    console.error('❌ Error al crear categoría:', error);
    res.status(500).json({ 
      error: error.message,
      detail: error.original ? error.original.detail : 'No additional details'
    });
  }
};

// Actualizar una categoría
const updateCategorie = async (req, res) => {
  try {
    const categorie = await categories.findByPk(req.params.categorieId);
    if (!categorie) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    await categorie.update(req.body);
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una categoría
const deleteCategorie = async (req, res) => {
  try {
    const categorie = await categories.findByPk(req.params.categorieId);
    if (!categorie) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    await categorie.destroy();
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategorie,
  createCategorie,
  updateCategorie,
  deleteCategorie
};
