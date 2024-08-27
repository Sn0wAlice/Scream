const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

// Middleware pour vérifier l'authentification
function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const adminToken = process.env.ADMIN_TOKEN;

    if (authHeader && authHeader === `Bearer ${adminToken}`) {
        next();
    } else {
        res.sendStatus(403); // Forbidden
    }
}

// Récupérer la liste des statuts disponibles
app.get('/status/list', (req, res) => {
    fs.readFile('status.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Unable to read status data' });
        } else {
            const statuses = JSON.parse(data);
            res.json(statuses);
        }
    });
});

// Récupérer le statut actuel
app.get('/status', (req, res) => {
    fs.readFile('currentStatus.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Unable to read current status' });
        } else {
            const currentStatus = JSON.parse(data);
            res.json(currentStatus);
        }
    });
});

// Changer le statut actuel
app.post('/admin/status/set', authenticate, (req, res) => {
    const newStatus = req.body.status;

    fs.readFile('status.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read status data' });
        }

        const statuses = JSON.parse(data);
        const statusExists = statuses.find(s => s.status === newStatus);

        if (!statusExists) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        fs.writeFile('currentStatus.json', JSON.stringify({ status: newStatus }), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Unable to set new status' });
            }
            res.json({ message: 'Status updated successfully' });
        });
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
