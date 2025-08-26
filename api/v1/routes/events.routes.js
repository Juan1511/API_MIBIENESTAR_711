const { Router } = require('express');
const router = Router();

// Array temporal para testing
let events = [];

// GET /api/v1/events
router.get("/", (req, res) => {
    res.json({ success: true, data: events });
});

// GET /api/v1/events/:id
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const event = events.find(e => e.id === id);
    
    if (!event) {
        return res.status(404).json({ success: false, error: 'Evento no encontrado' });
    }
    
    res.json({ success: true, data: event });
});

// POST /api/v1/events
router.post('/', (req, res) => {
    const { name, description, starDate, endDate, categoryId, state, maxCapacity, userId } = req.body;
    
    if (!name || !categoryId || !userId) {
        return res.status(400).json({ success: false, error: 'Campos requeridos: name, categoryId, userId' });
    }
    
    const newEvent = {
        id: events.length + 1,
        name,
        description: description || '',
        starDate: starDate || null,
        endDate: endDate || null,
        categoryId,
        state: state ?? true,
        maxCapacity: maxCapacity || 0,
        userId
    };
    
    events.push(newEvent);
    res.status(201).json({ success: true, data: newEvent });
});

// PUT /api/v1/events/:id
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const eventIndex = events.findIndex(e => e.id === id);

    if (eventIndex === -1) {
        return res.status(404).json({ success: false, error: 'Evento no encontrado' });
    }

    const updatedFields = req.body;
    events[eventIndex] = { ...events[eventIndex], ...updatedFields };

    res.json({ success: true, data: events[eventIndex] });
});

// DELETE /api/v1/events/:id
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const eventIndex = events.findIndex(e => e.id === id);

    if (eventIndex === -1) {
        return res.status(404).json({ success: false, error: 'Evento no encontrado' });
    }

    const deletedEvent = events.splice(eventIndex, 1)[0];
    res.json({ success: true, data: deletedEvent });
});

module.exports = router;
