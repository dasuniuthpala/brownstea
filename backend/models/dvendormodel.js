const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dvendorSchema = new Schema({
    vendorName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        match: [/^[A-Za-z\s]+$/, "Vendor name must contain only letters and spaces"]
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits, no letters or symbols"]
    },
    address: {
        type: String,
        required: true,
        minlength: 5
    },
    registrationDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return !isNaN(Date.parse(value));
            },
            message: "Invalid date format"
        }
    }
});

module.exports = mongoose.model("DVendor", dvendorSchema);
