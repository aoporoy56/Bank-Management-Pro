const express = require("express");
const { allAccountList } = require("../Controller/AdminController");
const { active, deleteAccount, inactive } = require("../Controller/CustomerController");
const AdminRouter = express.Router();


// AdminRouter.get("accountDetails/:account_no", (req, res) => {
//     res.send("Account Details");
// });
// AdminRouter.use("/activateAccount", )
// AdminRouter.use("/deactivateAccount", )
// AdminRouter.use("/deleteAccount", )
AdminRouter.get("/allAccountList", allAccountList)
AdminRouter.get("/inactive/:accountNo", inactive);
AdminRouter.get("/active/:accountNo", active);
delete
AdminRouter.get("/delete/:accountNo", deleteAccount);


module.exports = AdminRouter;