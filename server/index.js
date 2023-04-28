const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter');

const PORT = process.env.PORT || 6000;

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://aleksTVP:asd123@cluster0.inrmuqx.mongodb.net/study-cards?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();