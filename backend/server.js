
const express = require('express');
const cors = require('cors');
const path = require('path');
const dfaRoutes = require('./routes/dfaRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api', dfaRoutes);

// Serve built frontend static files in production
app.use(express.static(path.join(__dirname, '..', 'dist')));


app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.message);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message,
    });
});

// Catch-all: serve index.html for client-side routing (React Router)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`✓ DFA Minimization API running on http://localhost:${PORT}`);
});

