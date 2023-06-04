const validation = (batteryLevel, steps, res) => {
    if (batteryLevel < 2) {
        return res.status(400).json({
            "status": 400,
            "alert": "Insufficient battery level"
        });
    }
    if (steps > 4) {
        return res.status(400).json({
            "status": 400,
            "alert": "Max 4 times of instruction at once are allowed"
        });
    }
}

const error = (res) => {
    return res.status(400).json({
        "status": 400,
        "alert": "robot should not move outside of its boundary"
    });
}

const success = (res, battery) => {
    return res.status(200).json({
        "status": 200,
        "message": "Battery left " + battery + "%"
    });
}

module.exports = {
    validation,
    error,
    success
}