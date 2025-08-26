const { Router } = require('express');
const router = Router();

// Array temporal para testing
let users = [

];

// GET /api/v1/users
router.get("/", (req, res) => {
    res.json({ success: true, data: users });
});

// GET /api/v1/users/1
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    
    if (!user) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }
    
    res.json({ success: true, data: user });
});

// POST /api/v1/users
router.post('/', (req, res) => {
    const { username, email, password, rolld } = req.body;
    
    if (!username || !email || !password || !rolld) {
        return res.status(400).json({ success: false, error: 'Campos requeridos faltantes' });
    }
    
    const newUser = {
        id: users.length + 1,
        username,
        email,
        password,
        rolld,
        state: 'active'
    };
    
    users.push(newUser);
    res.status(201).json({ success: true, data: newUser });
});

// DELETE /api/v1/users/:id
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    res.json({ success: true, data: deletedUser });
});

// PUT /api/v1/users/:id
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }

    // Actualiza solo los campos enviados en el body
    const updatedFields = req.body;
    users[userIndex] = { ...users[userIndex], ...updatedFields };

    res.json({ success: true, data: users[userIndex] });
});

module.exports = router;