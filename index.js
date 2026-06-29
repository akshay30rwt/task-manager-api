const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/tasks', taskRoutes);

mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Connection failed', error);
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});