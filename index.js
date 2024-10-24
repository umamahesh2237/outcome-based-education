const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/loginSystem');

// Import routes
const userRoutes = require('./routes/userRoutes');
const regulationRoutes = require('./routes/regulationRoutes');
const courseRoutes = require('./routes/courseRoutes');
const courseOutcomeRoutes = require('./routes/courseOutcomeRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/regulations', regulationRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/course-outcomes', courseOutcomeRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
