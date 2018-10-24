const Project = require('../models/project.model.js');

// Create and Save a new project
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "project content can not be empty"
        });
    }
    // Create a project
    const project = new Project({
        name: req.body.name || "Untitled project",
        description: req.body.description,
        startingDate: req.body.startingDate,
        endingDate: req.body.endingDate,
        currency: req.body.currency,
        status: req.body.status
    });
    // Save project in the database
    project.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the project."
            });
        });
};

// Retrieve and return all projects from the database.
exports.findAll = (req, res) => {

    Project.find()
        .then(projects => {
            res.send(projects);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving projects."
            });
        });
};

// Find a single project with a projectid
exports.findOne = (req, res) => {
    Project.findById(req.params.id)
        .then(project => {
            if (!project) {
                return res.status(404).send({
                    message: "project not found with id " + req.params.id
                });
            }
            res.send(project);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "project not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving project with id " + req.params.id
            });
        });
};

// Update a project identified by the projectid in the request
exports.update = (req, res) => {

    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "project content can not be empty"
        });
    }

    // Find project and update it with the request body
    Project.findByIdAndUpdate(req.params.id, {
            name: req.body.name || "Untitled Project",
            description: req.body.description,
            startingDate: req.body.startingDate,
            endingDate: req.body.endingDate,
            currency: req.body.currency,
            status: req.body.status
        }, { new: true })
        .then(project => {
            if (!project) {
                return res.status(404).send({
                    message: "Project not found with id " + req.params.id
                });
            }
            res.send(project);
        }).catch(err => {
            if (err.kind === 'id') {
                return res.status(404).send({
                    message: "Project not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating project with id " + req.params.id
            });
        });

};

// Delete a project with the specified projectid in the request
exports.delete = (req, res) => {
    Project.findByIdAndRemove(req.params.id)
        .then(project => {
            if (!project) {
                return res.status(404).send({
                    message: "project not found with id " + req.params.id
                });
            }
            res.send({ message: "project deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "project not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete project with id " + req.params.id
            });
        });

};