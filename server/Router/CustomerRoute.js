const express = require("express");
const { createAccount, updateAccount, loginAccount, findAccount, transferMoney, balance, transitions, deactivate, active, allAccounts, checkStatus } = require("../Controller/CustomerController");
const CustomerRouter = express.Router();

CustomerRouter.post("/create",createAccount);
CustomerRouter.post("/login",loginAccount);

CustomerRouter.get("/status/:id",checkStatus);
CustomerRouter.get("/:id",findAccount);

// CustomerRouter.get("/",allAccounts);

CustomerRouter.use("/update",updateAccount);
CustomerRouter.get("/findAccount/:account_no",findAccount);
CustomerRouter.post("/transfer",transferMoney);
CustomerRouter.get("/getAccountDetails/:account_no",);
CustomerRouter.get("/getTransactionDetails/:account_no",transitions);
CustomerRouter.get("/balance/:account_no",balance);
module.exports = CustomerRouter