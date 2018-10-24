module.exports = (app) => {
    const project = require('../controllers/project.controller.js');

    // Create a new project
    app.post('/projects', project.create);

    // Retrieve all projects
    app.get('/projects', project.findAll);

    // Retrieve a single project with noteId
    app.get('/projects/:id', project.findOne);

    // Update a project with projectID
    app.put('/projects/:id', project.update);

    // Delete a project with projectID
    app.delete('/projects/:id', project.delete);
}
