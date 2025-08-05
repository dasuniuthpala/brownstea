const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    product_ID: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [5, "Name must be at least 5 characters"],
        maxlength: [50, "Name cannot exceed 50 characters"],
        match: [/^[A-Za-z\s]+$/, "Name must contain only letters and spaces"]
    },
    Category: {
        type: String,
        required: [true, "Category is required"],
        match: [/^[A-Za-z\s]+$/, "Category must contain only letters and spaces"]
    },
    Price: {
        type: Number,
        required: [true, "Price is required"],
        min: [5, "Price must be at least 5"],
        max: [500, "Price cannot exceed 500"],
        validate: {
            validator: function (v) {
                return /^[0-9]+(\.[0-9]{1,2})?$/.test(v); // allows integer or decimal with up to 2 places
            },
            message: "Price must be a number without letters or symbols"
        }
    },
    Stock_Quantity: {
        type: Number,
        required: [true, "Stock Quantity is required"],
        min: [99, "Stock Quantity must be at least 99"],
        max: [5000, "Stock Quantity cannot exceed 5000"],
        validate: {
            validator: function (v) {
                return /^[0-9]+$/.test(v); // only digits
            },
            message: "Stock Quantity must be a number without letters or symbols"
        }
    }
});

module.exports = mongoose.model("itemmodel", itemSchema);
