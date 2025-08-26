// Se enlaza el servicio


const getAllEvents = async (req, res) => {
    try {
        const allevents = await eventService.getAllEvents();
        if (allevents) {
            res.status(200).send({ status: "OK", data: allevents });
        } else {
            res.status(400).send({ status: "FAILED", data: allevents });
        }
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};

const getEvent = async (req, res) => {
    try {
        let id = req.params.eventsId;
        const event = await eventService.getEvent(id);
        if (event) {
            res.status(200).send({ status: "OK", data: event });
        } else {
            res.status(404).send({ status: "FAILED", data: { error: "Event not found" } });
        }
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};

const createEvent = async (req, res) => {
    try {
        const { body } = req;
        const createdEvent = await eventService.createEvent(
            body.name, 
            body.description, 
            body.starDate, 
            body.endDate, 
            body.categoryId, 
            body.state, 
            body.maxCapacity
        );
        if (createdEvent) {
            res.status(201).send({ status: "OK", data: createdEvent });
        } else {
            res.status(400).send({ status: "FAILED", data: { error: "Failed to create event" } });
        }
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};

const updateEvent = async (req, res) => {
    try {
        let id = req.params.eventsId;
        let { name, description, starDate, endDate, categoryId, state, maxCapacity } = req.body;
        const updatedEvent = await eventService.updateEvent(
            id, 
            name, 
            description, 
            starDate, 
            endDate, 
            categoryId, 
            state, 
            maxCapacity
        );
        if (updatedEvent) {
            res.status(200).send({ status: "OK", data: updatedEvent });
        } else {
            res.status(404).send({ status: "FAILED", data: { error: "Event not found or not updated" } });
        }
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};

const deleteEvent = async (req, res) => {
    try {
        let id = req.params.eventsId;
        const deletedEvent = await eventService.deleteEvent(id);
        if (deletedEvent) {
            res.status(200).send({ status: "OK", data: deletedEvent });
        } else {
            res.status(404).send({ status: "FAILED", data: { error: "Event not found or not deleted" } });
        }
    } catch (error) {
        res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
    }
};


module.exports = {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
};