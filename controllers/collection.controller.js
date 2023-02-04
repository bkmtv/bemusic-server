const { Collections } = require("../models");

const getCollections = async (req, res) => {
    const collections = await Collections.findAll();
    return res.json(collections);
}

const createCollection = async (req, res) => {
    const collection = req.body;
    await Collections.create(collection);
    res.json(collection);
}

const deleteCollection = async (req, res) => {
    const id = req.params.id;
    const collection = await Collections.findByPk(id);
    await Collections.destroy({ where: { id: id } });
    collections.save();
    const collections = await Collections.findAll();
    res.json(collections);
}

module.exports = { 
    getCollections,
    deleteCollection,
    createCollection,
}