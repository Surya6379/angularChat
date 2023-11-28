const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://surya_mongodb:m3o5n7g3o5@cluster0.6ns8n.mongodb.net/iotDashboard', {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        // useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'));


const userSchema = new mongoose.Schema({
    emailId: {
        type: String,
        unique: true,
        required: true
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    mobileNo: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    id: {
        type: Number
    }
})







const users = mongoose.model('users', userSchema)
module.exports = { users}
