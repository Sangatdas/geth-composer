const router = require('express').Router();

const MiningService = require('../services/miner.service');

router.post("/:command", (req, res) => {
    if (req.params.command === "start") {
        MiningService.startMiner(req.headers.provider).then((isMining) => {
            if (isMining) {
                console.log("Started miner at: ", Date());
                res.status(200).json({msg: "Started miner at: " + Date()});
            } else {
                console.log("Couldn't start miner.");
            }
        }).catch((err) => {
            console.log("Error caught: ", err);
            res.sendStatus(500);
        });
    } else if (req.params.command === "stop") {
        MiningService.stopMiner(req.headers.provider).then((isMining) => {
            if (!isMining) {
                console.log("Stopped miner at: ", Date());
                res.status(200).json({msg: "Started miner at: " + Date()});
            } else {
                console.log("Couldn't stop miner.");
            }
        }).catch((err) => {
            console.log("Error caught: ", err);
            res.sendStatus(500);
        });
    }
});

router.get("/", (req, res) => {
    MiningService.isMining(req.headers.provider).then((isMining) => {
        if (isMining) {
            console.log("Checked mining: " + true + " at " + Date());
            res.sendStatus(200);
        } else if (!isMining) {
            console.log("Checked mining: " + false + " at " + Date());
            res.sendStatus(204);
        } else {
            console.log("Couldn't retrieve status of mining");
            res.sendStatus(400);
        }
    }).catch((err) => {
        console.log("Error caught: ", err);
        res.sendStatus(500);
    });
});

module.exports = router;
