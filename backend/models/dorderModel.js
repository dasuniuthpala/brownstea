const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    Order_ID: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9]+$/, "Order ID must contain only letters and numbers without symbols."]
    },
    product_ID: {
        type: String,
        required: true,
         match: [/^[A-Za-z0-9]+$/, "Product ID must contain only letters and numbers without symbols."]
    },
    quantity_Ordered: {
        type: Number,
        required: true,
        min: [10, "Quantity must be at least 10"],
        max: [10000, "Quantity cannot exceed 10,000"]
    },
    totalPrice: {
        type: Number,
        required: true,
        min: [5, "Total price must be at least 5"],
        validate: {
            validator: function (v) {
                return /^[0-9]+(\.[0-9]{1,2})?$/.test(v);
            },
            message: "Total price must be a number without letters or symbols."
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Invalid phone number. Must be 10 digits, no letters or symbols."]
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Completed"],
        default: "Pending"
    },
    orderDate: {
        type: Date,
        default: Date.now,
        validate: {
            validator: function (value) {
                const today = new Date();
                const oneWeekBefore = new Date();
                oneWeekBefore.setDate(today.getDate() - 7);

                const oneMonthLater = new Date();
                oneMonthLater.setMonth(today.getMonth() + 1);

                return value >= oneWeekBefore && value <= oneMonthLater;
            },
            message: "Order date must be between one week before today and one month later."
        }
    }
});

module.exports = mongoose.model("Order", orderSchema);
