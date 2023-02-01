import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    group: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const ItemModel = mongoose.model("ItemModel", itemSchema);

export default ItemModel;