const { Router } = require('express');
const router = Router();

// Array temporal para testing
let categories = [
    
];

// GET /api/v1/categories
router.get("/", (req, res) => {
    res.json({ success: true, data: categories });
});

// GET /api/v1/categories/1
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const category = categories.find(c => c.id === id);
    
    if (!category) {
        return res.status(404).json({ success: false, error: 'Categoría no encontrada' });
    }
    
    res.json({ success: true, data: category });
});

// POST /api/v1/categories
router.post('/', (req, res) => {
    const { name, description, image } = req.body;
    
    if (!name) {
        return res.status(400).json({ success: false, error: 'Nombre requerido' });
    }
    
    const newCategory = {
        id: categories.length + 1,
        name,
        description: description || '',
        image: image || ''
    };
    
    categories.push(newCategory);
    res.status(201).json({ success: true, data: newCategory });
});

// PUT /api/v1/categories/:id
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const categoryIndex = categories.findIndex(c => c.id === id);

    if (categoryIndex === -1) {
        return res.status(404).json({ success: false, error: 'Categoría no encontrada' });
    }

    const updatedFields = req.body;
    categories[categoryIndex] = { ...categories[categoryIndex], ...updatedFields };

    res.json({ success: true, data: categories[categoryIndex] });
});

// DELETE /api/v1/categories/:id
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const categoryIndex = categories.findIndex(c => c.id === id);

    if (categoryIndex === -1) {
        return res.status(404).json({ success: false, error: 'Categoría no encontrada' });
    }

    const deletedCategory = categories.splice(categoryIndex, 1)[0];
    res.json({ success: true, data: deletedCategory });
});

module.exports = router;
