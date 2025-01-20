const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Login123$',
    database: 'sakila',
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log("Hey Rakesh");
    console.log('Database connected successfully');
});

// Route to save dates
app.post('/api/save-dates', (req, res) => {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
    }



    
    const query = 'INSERT INTO henryhurtshours (startDate , endDate ) VALUES (?, ?)';
    connection.query(query, [startDate, endDate], (err, results) => {
        if (err) {
            console.error('Failed to save dates:', err);
            return res.status(500).json({ error: 'Failed to save dates' });
        }

        res.json({ message: 'Dates saved successfully', insertId: results.insertId });
    });
});

app.get('/api/get-dates',(req,res) => {
    const query = 'Select * from henryhurtshours';
    connection.query(query, (err, results)=> {
        if(err){
            console.err("failed to retrive Data", err);
            return res.status(500).json({error : 'failed to get dates'});
        }
        res.json(results);
    });
});
// Route to delete a date entry
app.delete('/api/delete-date/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM henryhurtshours WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Failed to delete date entry:', err);
            return res.status(500).json({ error: 'Failed to delete date entry' });
        }
        res.json({ message: 'Date entry deleted successfully' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
