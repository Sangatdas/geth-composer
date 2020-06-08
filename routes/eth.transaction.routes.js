const router = require('express').Router();
const EthTransactionService = require('../services/eth.transaction.service');

router.get("/:txHash", (req, res) => {
    EthTransactionService.getTransaction(req.params.txHash, req.headers.provider).then((tx) => {
        if (tx) {
            console.log("Transaction: ", tx);
            res.status(200).json({Transaction: tx});
        } else {
            console.log("Failed to retrieve transaction for " + req.params.txHash + ". It may not be present.");
            res.status(404).json({error: "Failed to retrieve transaction for " + req.params.txHash + ". It may not be present."});
        }
    }).catch((err) => {
        console.log("Error caught: ", err);
        res.sendStatus(500);
    });
});

router.get("/:txHash/receipt", (req, res) => {
    EthTransactionService.getTransactionReceipt(req.params.txHash, req.headers.provider).then((receipt) => {
        if (receipt) {
            console.log("Transaction Receipt: ", receipt);
            res.status(200).json({Receipt: receipt});
        } else {
            console.log("Failed to retrieve transaction for " + req.params.txHash + ". It may not be present.");
            res.status(500).json({error: "Failed to retrieve transaction for " + req.params.txHash + ". It may not be present."});
        }
    }).catch((err) => {
        console.log("Error caught: ", err);
        res.sendStatus(500);
    });
});

router.get("/", (req, res) => {
    EthTransactionService.getPendingTransactions(req.headers.provider).then((pendingTransactions) => {
        let response = {};
        if (pendingTransactions) {
            response.pendingTransactions = pendingTransactions;
            console.log("Transaction Hash: ", pendingTransactions);
            res.status(200).send(response);
        } else {
            console.log("Failed to retrieve pending transactions");
            res.status(500).json({error: "Failed to retrieve pending transactions."});
        }
    }).catch((err) => {
        console.log("Error caught: ", err);
        res.sendStatus(500);
    });
});

router.get("/:addr/count/", (req, res) => {
    EthTransactionService.getTransactionCount(req.params.addr, req.headers.provider).then((count) => {
        if (count) {
            console.log("Transactions Count: ", count);
            res.status(200).json({count: count});
        } else {
            console.log("Failed to retrieve pending transactions");
            res.status(500).json({error: "Failed to retrieve pending transactions."});
        }
    }).catch((err) => {
        console.log("Error caught: ", err);
        res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
    EthTransactionService.sendTransaction(req.body, req.headers.provider).then((txHash) => {
        if (txHash) {
            console.log("Transaction Hash: ", txHash);
            res.status(200).json({TxHash: txHash});
        } else {
            console.log("Transaction failed");
            res.status(500).json({error: "Transaction failed due to unknown reason."});
        }
    }).catch((err) => {
        console.log("Error caught: ", err);
        res.sendStatus(500);
    });
});

module.exports = router;