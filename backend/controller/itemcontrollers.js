const item = require("../models/itemmodel");

const getAllitems = async (req, res, next) => {
    
    let items ;

    try{
        items = await item.find();
    }catch (err) {
        console.log(err);
    }

    //not found
    if(!items) {
        return res.status(404).json({message:"Item not found"})
    }

    //Display all Items
    return res.status(200).json({ items });
};

//data Insert
const additems = async (req, res, next) => {

    const {product_ID, Name, Category, Price, Stock_Quantity} = req.body;

    let items;

    try {
        items = new item({product_ID, Name, Category, Price, Stock_Quantity});
        await items.save();
    }catch (err) {
        console.log(err);
    }

    //not insert items
    if(!items) {
        return res.status(404).send({message:"unable to add items"});
    }
    return res.status(200).json({items});
};

//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let items;

    try{
        items = await item.findById(id);
    }catch (err) {
        console.log(err);
    }

    //not available items
    if(!items) {
        return res.status(404).send({message:"item not found"});
    }
    return res.status(200).json({items});
}

//update item Details
const updateitem = async(req, res, next) => {
    const id = req.params.id;
    const {product_ID, Name, Category, Price, Stock_Quantity} = req.body;

    let items;

    try{
        items = await item.findByIdAndUpdate(id,
            {product_ID:product_ID, Name:Name, Category:Category, Price:Price, Stock_Quantity:Stock_Quantity});
            items = await items.save();
    }catch(err) {
        console.log(err);
    }

    //not available items
    if(!items) {
        return res.status(404).send({message:"unable to update item details"});
    }
    return res.status(200).json({items});
};

//Delete Items
const deleteitem = async (req, res, next) => {
    const id = req.params.id;

    let items;

    try{
        items = await item.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }

    //not available items
    if(!items) {
        return res.status(404).send({message:"unable to delete item details"});
    }
    return res.status(200).json({items});
};

exports.getAllitems = getAllitems;
exports.additems = additems;
exports.getById = getById;
exports.updateitem = updateitem;
exports.deleteitem = deleteitem;
