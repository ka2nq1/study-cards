require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require('./router/user-router');
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 6000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/auth', userRouter);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();