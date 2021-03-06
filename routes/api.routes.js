const router = require('express').Router();
const ApiService = require('../services/api.service');

router.get("/accounts/", (req, res) => {
    ApiService.getAccountsInfo(req.headers.provider).then((response) => {
        if(response.length > 0) {
            console.log(response);
            res.status(200).json(response);
        } else {
            console.log(response);
            res.status(400).json({error: "No accounts found."});
        }
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get("/account/:id", (req, res) => {
    ApiService.getAccountData(req.params.id, req.headers.provider).then((response) => {
        if(response) {
            console.log(response);
            res.status(200).json(response);
        } else {
            console.log(response);
            res.status(400).json({error: "No accounts found."});
        }
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get("/admin/", (req, res) => {
    ApiService.getNodeInfo(req.headers.provider).then((response) => {
        if (response) {
            console.log(response);
            res.status(200).json(response);
        } else {
            console.log(response);
            res.status(400).json({error: "Unable to retrieve admin info."});
        }
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
})

module.exports = router;