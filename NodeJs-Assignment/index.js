const express = require('express');
const app = express();
const moduleImport = require('./module');
app.use(express.json());
const port = 3000;

// set current position of robot
let currentPosition = { x: 0, y: 0 };
// define boundary position of robot
const boundaryPosition = { minX: 0, minY: 0, maxX: 10, maxY: 10 };
// set initial level of battery(in %)
let battery = 100;

// API move-forward
app.post('/move-forward', (req, res) => {
    try {
        moduleImport.validation(battery, req.body.steps, res);
        const steps = req.body.steps;
        for (let i = 0; i < steps; i++) {
            currentPosition.y++;
            if (currentPosition.y > boundaryPosition.maxY) {
                currentPosition.y--;
                moduleImport.error(res);
            }
            battery -= 2;
        }
        moduleImport.success(res, battery);
    }
    catch (err) {
        res.status(404).json({
            "error": err.message
        })
    }

});

// API move-backward
app.post('/move-backward', (req, res) => {
    try {
        moduleImport.validation(battery, req.body.steps, res);
        const steps = req.body.steps;
        for (let i = 0; i < steps; i++) {
            currentPosition.y--;
            if (currentPosition.y < boundaryPosition.minY) {
                currentPosition.y++;
                moduleImport.error(res);
            }
            battery -= 2;
            moduleImport.success(res, battery);
        }
    }
    catch (err) {
        res.status(404).json({
            "error": err.message
        })
    }

});

// API move-right
app.post('/move-right', (req, res) => {
    try {
        moduleImport.validation(battery, req.body.steps, res);
        const steps = req.body.steps;
        for (let i = 0; i < steps; i++) {
            currentPosition.x++;
            if (currentPosition.x > boundaryPosition.maxX) {
                currentPosition.x--;
                moduleImport.error(res);
            }
            battery -= 2;
            moduleImport.success(res, battery);
        }
    }
    catch (err) {
        res.status(404).json({
            "error": err.message
        })
    }
});

// API move-left
app.post('/move-left', (req, res) => {
    try {
        moduleImport.validation(battery, req.body.steps, res);
        const steps = req.body.steps;
        for (let i = 0; i < steps; i++) {
            currentPosition.x--;
            if (currentPosition.x < boundaryPosition.minX) {
                currentPosition.x++;
                moduleImport.error(res);
            }
            battery -= 2;
            moduleImport.success(res, battery);
        }
    }
    catch (err) {
        res.status(404).json({
            "error": err.message
        })
    }
});

// reset battery
app.post('/reset', (req, res) => {
    battery = 100;
    currentPosition = { x: 0, y: 0 };
    return res.json({ battery, currentPosition });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});