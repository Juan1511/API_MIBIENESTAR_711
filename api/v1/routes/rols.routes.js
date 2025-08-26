const { Router } = require('express');
const router = Router();

// Array temporal para testing
let rols = [
    
];

// GET /api/v1/rols
router.get("/", (req, res) => {
    res.json({ success: true, data: rols });
});

// GET /api/v1/rols/1
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const rol = rols.find(r => r.id === id);
    
    if (!rol) {
        return res.status(404).json({ success: false, error: 'Rol no encontrado' });
    }
    
    res.json({ success: true, data: rol });
});

// POST /api/v1/rols
router.post('/', (req, res) => {
    const { name, description } = req.body;
    
    if (!name) {
        return res.status(400).json({ success: false, error: 'Nombre requerido' });
    }
    
    const newRol = {
        id: rols.length + 1,
        name,
        description: description || ''
    };
    
    rols.push(newRol);
    res.status(201).json({ success: true, data: newRol });
});

// PUT /api/v1/rols/:id
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const rolIndex = rols.findIndex(r => r.id === id);

    if (rolIndex === -1) {
        return res.status(404).json({ success: false, error: 'Rol no encontrado' });
    }

    const updatedFields = req.body;
    rols[rolIndex] = { ...rols[rolIndex], ...updatedFields };

    res.json({ success: true, data: rols[rolIndex] });
});

// DELETE /api/v1/rols/:id
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const rolIndex = rols.findIndex(r => r.id === id);

    if (rolIndex === -1) {
        return res.status(404).json({ success: false, error: 'Rol no encontrado' });
    }

    const deletedRol = rols.splice(rolIndex, 1)[0];
    res.json({ success: true, data: deletedRol });
});

module.exports = router;