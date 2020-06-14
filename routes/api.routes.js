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

module.exports = router;