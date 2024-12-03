const { Response } = require("../config/Response");
const Customer = require("../Models/CustomerModel");


exports.allAccountList = async (req, res) => {
    try {
        const allAccounts = await Customer.find();
        const totalAccounts = await Customer.countDocuments();
        Response(res, 200, "OK", "All accounts found.", "All accounts found.", {
            accounts: allAccounts,
            totalAccounts: totalAccounts
        });
      } catch (error) {
        console.error("Error getting all accounts:", error);
        Response(res, 500, "Internal Server Error", "Internal Server Error", error.message, null);
      }
}

exports.active = async (req, res) => {
    try {
        const accountNo = req.params.accountNo;
        const account = await Customer.findOne({ accountNo: accountNo });
        if (!account) {
            Response(res, 404, "Not Found", "Account not found.", "Account not found.", null);
            return;
        }
        account.status = "active";
        await account.save();
        Response(res, 200, "OK", "Account activated.", "Account activated.", null);
    }
    catch (error) {
        console.error("Error activating account:", error);
        Response(res, 500, "Internal Server Error", "Internal Server Error", error.message, null);
    }
}

exports.deactivate = async (req, res) => {
    try {
        const accountNo = req.params.accountNo;
        const account = await Customer.findOne({ accountNo: accountNo });
        if (!account) {
            Response(res, 404, "Not Found", "Account not found.", "Account not found.", null);
            return;
        }
        account.status = "inactive";
        await account.save();
        Response(res, 200, "OK", "Account deactivated.", "Account deactivated.", null);
    }
    catch (error) {
        console.error("Error deactivating account:", error);
        Response(res, 500, "Internal Server Error", "Internal Server Error", error.message, null);
    }
}