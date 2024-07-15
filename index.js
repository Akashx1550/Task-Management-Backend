const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/loginSignup');
const taskRoutes = require('./routes/tasks');
const PORT = process.env.PORT || 4300;
const cors = require('cors');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('Backend is running for Task Management App');
})

app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

app.listen(PORT, () => {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Server running on port ${PORT}`))
        .catch(err => console.error(err));
});
