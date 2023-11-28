const { users } = require('../Model/Schema');




// 1. GET http://localhost:3000/users? emailId =< emailId > 
exports.getDetails = async (req, res) => {
    try {
        const detail = await users.findOne({ emailId: req.params.email }, {})
        // console.log(detail);
        if (detail == null) {
            res.status(201).json({
                status: "Fail",
                data: detail
            })
        }
        else {
            res.status(201).json({
                status: "Successfully fetched user",
                data: detail
            })
        }
    } catch (err) {
        res.status(404).json({
            status: "Fail"
        })
    }
};

// 2. POST http://localhost:3000/users 
exports.registerUser = async (req, res) => {

    try {
        let data = req.body
        const emailDetails = await users.find({ emailId: req.body.emailId })
        const userDetails = await users.find({ userName: req.body.userName })
        if (emailDetails.length > 0) {
            res.status(409).json({
                successFlag : false,
                message: "Email ID already registered"
            })
        } else
            if (userDetails.length > 0) {
                res.status(409).json({
                    successFlag : false,
                    message: "User Name already registered"
                })
            }
            else {
                const allUsers = await users.find({})
                data['id'] = allUsers.length + 1
                const detail = await users.create(data);
                if (detail) {
                    res.status(201).json({
                        successFlag : true,
                        message: "Successefully registered user",
                        data: detail
                    })
                } else {
                    res.status(404).json({
                        successFlag : false,
                        message: "Cant register the user"
                    })
                }
            }
    } catch (err) {
        res.status(404).json({
            status: "error",
            error: err
        })
    }
}

// 3. GET http://localhost:3000/users? emailId =< emailId >& password =< password > 
exports.loginUser = async (req, res) => {
    try {        
        const detail = await users.findOne({ userName: req.body.userName })
        if (detail == null) {
            res.status(400).json({
                successFlag : false,
                message: "User Name not registered"
            })
        } else
            if (detail.password != req.body.password) {
                res.status(400).json({
                    successFlag : false,
                    message: "Credentials are wrong"
                })
            }
            else {
                res.status(201).json({
                    successFlag : true,
                    message: "Login successful",
                    data: detail
                })
            }
    }
    catch (err) {
        res.status(404).json({
            message: "Cant login try again later"
        })
    }
}




//4. GET http://localhost:3000/movies 
exports.getMovies = async (req, res) => {

    try {


        const detail = await movies.find({})
        console.log(detail.length)
        console.log(detail);


        if (detail == null) {
            res.status(201).json({
                status: "Fail",
                data: detail
            })
        }
        else {
            res.status(201).json({
                status: "Successfully fetched movies array",
                data: detail
            })
        }


    } catch (err) {
        res.status(404).json({
            status: "Fail"
        })
    }
    // res.send("From getMovies")
}


// 5. GET http://localhost:3000/movies?movieId=<id> 
exports.getMovieDetails = async (req, res) => {
    try {


        const detail = await movies.find({ id: req.params.movieId }, {})
        console.log(detail);


        if (detail == null) {
            res.status(201).json({
                status: "Fail",
                data: detail
            })
        }
        else {
            res.status(201).json({
                status: "Successfully fetched movie using id",
                data: detail
            })
        }


    } catch (err) {
        res.status(404).json({
            status: "Fail"
        })
    }

    res.send("From getMovieDetails")
}


// 6.POST http://localhost:3000/book
exports.bookings = async (req, res) => {
    console.log("inside booking")
    try {
        let data = req.body
        const booking = await bookings.find({})

        data['id'] = booking.length + 1
        console.log(data)

        const detail = await bookings.create(data);

        if (detail) {
            res.status(201).json({
                status: "Successfully post the data in booking",
                data: detail
            })
        } else {
            res.status(404).json({
                status: "booking is not done"
            })
        }

    } catch (err) {
        res.status(404).json({
            status: "Fail"
        })
    }

}

// 7.Post http://localhost:3000/bookMovie
exports.bookMovie = async (req, res) => {
    try {

        let data = req.body

        const allUsers = await bookmovies.find({})
        data['bookingId'] = allUsers.length + 1
        const detail = await bookmovies.create(data);
        if (detail) {
            res.status(201).json({
                message: "Successefully Booking Completed",
                data: detail
            })
        } else {
            res.status(404).json({
                message: "Booking is not completed"
            })

        }
    } catch (err) {
        res.status(404).json({
            status: "error",
            error: err
        })
    }
}

// 8.http://localhost:3000/bookMovie/6/xzc@email.com

exports.getBookMovieDetails = async (req, res) => {
    try {
        const detail = await bookmovies.findOne({ bookingId: req.params.bookingId, useremail: req.params.useremail })
        if (detail == null) {
            res.status(400).json({
                message: "Booking Id doesnot exists"
            })
        }
        else {
            res.status(201).json({
                message: "Suucessfully fetch booking details",
                data: detail
            })
        }
    } catch (err) {
        res.status(404).json({
            status: "error",
            error: err
        })
    }
}


exports.getBookMovieDetailsById = async (req, res) => {
    try {
        const bookings = await bookmovies.find({ emailId: req.params.useremail })
        if (bookings == null) {
            res.status(400).json({
                message: "Booking Id doesnot exists"
            })
        }
        else {
            res.status(201).json({
                message: "Suucessfully fetch booking details",
                data: bookings
            })
        }
    } catch (err) {
        res.status(404).json({
            status: "error",
            error: err
        })
    }
}