import ItemModel from "../models/ItemModel.js";

export const getItems = async (req, res) => {
    try {
        const items = await ItemModel.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createItem = async (req, res) => {
    const newItem = new ItemModel(req.body);
    try {
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};