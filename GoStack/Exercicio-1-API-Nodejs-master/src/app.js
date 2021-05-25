const express = require("express");
const cors = require("cors");
const { json } = require("express");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

/**
 * GET
 */
app.get("/repositories", (request, response) => {
    return response.status(200).json(repositories);
});
/**
 * POST
 */
app.post("/repositories", (request, response) => {
    const { title, url, techs } = request.body;

    const repo = {
        id : uuid(),
        title,
        url,
        techs,
        likes : 0
    }

    repositories.push(repo);

    return response.status(200).json(repo);
});
/**
 * PUT
 */
app.put("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const { title, url, techs, likes } = request.body;

    if(!isUuid(id)){
        return response.status(400).json( { "error" : "Invalid repository id!" } );
    }

    const repoIndex = repositories.findIndex(repository => repository.id == id);

    if(repoIndex < 0){
        return response.status(404).json( { "error" : "Repository not found!" } );
    }

    const newRepo = {
        id,
        title,
        url,
        techs,
        likes : repositories[repoIndex].likes
    }

    repositories[repoIndex] = newRepo;
        
    return response.status(200).json(newRepo);
});
/**
 * DELETE
 */
app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params;

    if(!isUuid(id)){
        return response.status(400).json( { error : "Invalid repository id!" } );
    }

    const repoIndex = repositories.findIndex(repository => repository.id == id);

    if(repoIndex < 0){
        return response.status(404).json( { error : "Repository not found!" } );
    }

    repositories.splice(repoIndex, 1);

    return response.status(204).send();
});
/**
 * POST LIKE
 */
app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;

    if(!isUuid(id)){
        return response.status(400).json( { error : "Invalid repository id!" } );
    }

    const repoIndex = repositories.findIndex(repository => repository.id == id);

    if(repoIndex < 0){
        return response.status(404).json( { error : "Repository not found!" } );
    }

    repositories[repoIndex].likes++

    return response.status(200).json(repositories[repoIndex]);
});

module.exports = app;
