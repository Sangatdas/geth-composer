const router = require('express').Router();
const AdminService = require('../services/admin.service');

router.get("/nodeInfo/", (req, res) => {
    AdminService.getNodeInfo(req.headers.provider).then((nodeInfo) => {
        if (nodeInfo) {
            res.status(200).json(nodeInfo);
        } else {
            res.status(400).json({error: "Unable to retrieve Node Info."});
        }
    }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
    });
});

router.get("/peers/", (req, res) => {
    AdminService.getPeers(req.headers.provider).then((peers) => {
        if (peers.length > 0) {
            res.status(200).json(peers);
        } else {
            res.status(400).json({error: "No peers added."});
        }
    }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
    })
});

router.post("/addPeer/", (req, res) => {
    AdminService.addPeer(req.headers.enode, req.headers.provider).then((response) => {
        if(response) {
            res.status(200).json({msg: "Added peer: " + req.headers.enode + " successfully."});
        } else {
            res.status(400).json({error: "Unable to add peer " + req.headers.enode});
        }
    }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
    })
});

module.exports = router;