const { get } = require("../Router/CustomerRoute");
// const jwt = require("jsonwebtoken");
const Customer = require('../Models/CustomerModel');
const transporter = require('../config/Mailer');
const { Response } = require("../config/Response");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');


// function lastAccountNo(callback) {
//   connection.query(
//     "SELECT `account_no` FROM `customer` ORDER BY `account_no` DESC LIMIT 1",
//     (err, result, fields) => {
//       if (err) {
//         callback(err, null);
//       }
//       if (result.length > 0) {
//         callback(null, JSON.parse(JSON.stringify(result[0])).account_no);
//       } else {
//         callback(null, 0);
//       }
//     }
//   );
// }
exports.createAccount = async (req, res) => {

  try {
    // Extract data from the request body
    const {
      accountTitleEnglish,
      accountTitleBangla,
      accountType,
      currency,
      selectedDivision,
      selectedDistrict,
      contactAddress,
      sourceOfFund,
      firstName,
      lastName,
      banglaFullTitle,
      fatherName,
      motherName,
      spouseName,
      gender,
      dob,
      occupation,
      monthlyIncome,
      nationalId,
      email,
      phone1,
      phone2,
      presentAddress,
      permanentAddress,
      religion,
      maritalStatus,
      nomineeName,
      relationshipWithAccountHolder,
      nomineeDob,
      nomineePercentage,
      nomineeNationalId,
      nomineeIdType,
      nomineeOtherIdType,
      nomineeOtherIdDescription,
      nomineeAddress,
      isNomineeUnder18,
      selfImageUrl,
      nidImageUrl,
    } = req.body;

    // Check required fields (Basic Validation)
    const missingFields = [];
    if (!accountTitleEnglish) missingFields.push("accountTitleEnglish");
    if (!accountType) missingFields.push("accountType");
    if (!currency) missingFields.push("currency");
    if (!selectedDivision) missingFields.push("selectedDivision");
    if (!selectedDistrict) missingFields.push("selectedDistrict");
    if (!contactAddress) missingFields.push("contactAddress");
    if (!sourceOfFund || !Array.isArray(sourceOfFund) || sourceOfFund.length === 0) {
      missingFields.push("sourceOfFund");
    }
    if (!selfImageUrl) missingFields.push("selfImageUrl");
    if (!nidImageUrl) missingFields.push("nidImageUrl");

    if (!firstName) missingFields.push("firstName");
    if (!lastName) missingFields.push("lastName");
    if (!fatherName) missingFields.push("fatherName");
    if (!motherName) missingFields.push("motherName");
    if (!gender) missingFields.push("gender");
    if (!dob) missingFields.push("dob");
    if (!nationalId) missingFields.push("nationalId");
    if (!email) missingFields.push("email");
    if (!phone1) missingFields.push("phone1");
    if (!presentAddress) missingFields.push("presentAddress");
    if (!permanentAddress) missingFields.push("permanentAddress");
    if (!nomineeName) missingFields.push("nomineeName");
    if (!relationshipWithAccountHolder) missingFields.push("relationshipWithAccountHolder");
    if (!nomineeDob) missingFields.push("nomineeDob");
    if (!nomineePercentage) missingFields.push("nomineePercentage");
    if (!nomineeNationalId) missingFields.push("nomineeNationalId");
    if (!nomineeIdType) missingFields.push("nomineeIdType");
    if (!nomineeAddress) missingFields.push("nomineeAddress");

    // If any fields are missing, return a 400 error
    if (missingFields.length > 0) {
      Response(res, 400, "Bad Request", "Missing required fields", "Missing required fields", missingFields);
      return;
    }

    // Generate password using birth year and some random characters
    const generatePassword = (dob) => {
      const birthYear = new Date(dob).getFullYear();  // Extract birth year from dob
      const randomChars = crypto.randomBytes(2).toString('hex');  // Generate 4 random characters
      return `${birthYear}${randomChars}`;  // Combine birth year and random characters
    };

    const newPassword = generatePassword(dob);  // Generate password with birth year

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Create a new customer document
    const newCustomer = new Customer({
      accountTitleEnglish,
      accountTitleBangla,
      accountType,
      currency,
      selectedDivision,
      selectedDistrict,
      contactAddress,
      sourceOfFund,
      selfImageUrl,
      nidImageUrl,
      firstName,
      lastName,
      banglaFullTitle,
      fatherName,
      motherName,
      spouseName,
      gender,
      dob,
      occupation,
      monthlyIncome,
      nationalId,
      email,
      phone1,
      phone2,
      presentAddress,
      permanentAddress,
      religion,
      maritalStatus,
      nomineeName,
      relationshipWithAccountHolder,
      nomineeDob,
      nomineePercentage,
      nomineeNationalId,
      nomineeIdType,
      nomineeOtherIdType,
      nomineeOtherIdDescription,
      nomineeAddress,
      isNomineeUnder18,
      password: hashedPassword,
    });

    // Save the customer to the database
    const savedCustomer = await newCustomer.save();
    const a = savedCustomer._id.toString();

    const info = await transporter.sendMail({
      from: "mohobbatchutiya@gmail.com",  // sender address
      to: email,  // list of receivers
      subject: "Account Created",  // Subject line
      text: `Your account has been created. Your customer ID is: ${a}. Your password is: ${newPassword}`,  // plain text body
      html: `<p>Your account has been created. Your Application ID is: <strong>${a}</strong>.</p>`,  // html body
    });

    console.log("Message sent: %s", info.messageId);




    // Send success response
    Response(res, 201, "Created", "Customer account created successfully!", "Customer account created successfully!", savedCustomer);
  } catch (error) {
    console.error("Error creating customer account:", error);
    Response(res, 500, "Internal Server Error", "Internal Server Error", error.message, null);
  }

};

// exports.createAccount = async (req, res) => {
//   const { full_name, address, email, gender, phone, nid, password, image } =
//     req.body;
//   try {
//     id = 0;
//     account_no = 0;
//     await lastAccountNo((err, result) => {
//       account_no = result + 1;
//       console.log(result);
//       if (err) {
//         response(res, 500, "Internal Server Error", "Internal Server Error", err.message, null);
//       }
//       if (result) {
//         console.log(account_no);
//         customerCreateQuery =
//           "INSERT INTO Customer VALUEs (?,?,?,?,?,?,?,?,?,?,?,?,?)";
//         customerQueryValue = [
//           id,
//           account_no,
//           full_name,
//           address,
//           email,
//           phone,
//           nid,
//           gender,
//           password,
//           0,
//           image,
//           "Pending",
//           new Date(),
//         ];
//         connection.query(
//           customerCreateQuery,
//           customerQueryValue,
//           (err, result, fields) => {
//             if (err) {
//               err.code == "ER_DUP_ENTRY"
//                 ? // ? res.send("Email Already Used")
//                   response(
//                     res,
//                     500,
//                     "Internal Server Error",
//                     "Duplicate Entry",
//                     err.message
//                   )
//                 : response(
//                     res,
//                     500,
//                     "Internal Server Error",
//                     "Internal Server Error",
//                     err.message
//                   );
//             } else {
//               response(
//                 res,
//                 200,
//                 "OK",
//                 "Account Created. Your Account No : " + account_no,
//                 "Account Created. Your Account No : " + account_no,
//                 result
//               );
//             }
//           }
//         );
//       } else {
//         response(
//           res,
//           500,
//           "Internal Server Error",
//           "Internal Server Error",
//           err.message
//         );
//       }
//     });

//   } catch (error) {
//     response(
//       res,
//       500,
//       "Internal Server Error",
//       "Internal Server Error",
//       error.message,
//       null
//     );
//   }
// };

exports.checkStatus = async (req, res) => {
  const { id } = req.params;
  try {
    // Await the result to get the customer object
    const customer = await Customer.findById(id);


    if (customer) {
      Response(res, 200, "OK", "Customer found.", "Customer found.", customer.status);
    } else {
      Response(res, 404, "Not Found", "Customer not found.", "Customer not found.", null);
    }
  } catch (error) {
    console.error("Error getting customer status:", error);
    Response(res, 500, "Internal Server Error", "Internal Server Error", error.message, null);
  }
};
exports.allAccounts = async (req, res) => {
  try {
    const allAccounts = await Customer.find().lean();
    Response(res, 200, "OK", "All accounts found.", "All accounts found.", allAccounts);
  } catch (error) {
    console.error("Error getting all accounts:", error);
    Response(res, 500, "Internal Server Error", "Internal Server Error", error.message, null);
  }
}


exports.loginAccount = async (req, res) => {
  try {
    const { accountNo, password } = req.body;

    // Find customer by account number
    const account = await Customer.findOne({ accountNo: accountNo });

    if (!account) {
      return Response(
        res,
        404,
        "Not Found",
        "No Account Found",
        "No Account Found",
        null
      );
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, account.password);

    if (!isMatch) {
      return Response(
        res,
        400,
        "Bad Request",
        "Incorrect password",
        "Incorrect password",
        null
      );
    }

    // If account status is not active
    if (account.status !== "active") {
      return Response(
        res,
        400,
        "Bad Request",
        "Account is not active",
        "Account is not active",
        null
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { account_no: account.accountNo },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Send response with the token and account details
    return Response(
      res,
      200,
      "OK",
      "Login successful",
      "Login successful",
      { token, account }
    );

  } catch (error) {
    console.error("Error during login:", error);
    return Response(
      res,
      500,
      "Internal Server Error",
      "Internal Server Error",
      error.message,
      null
    );
  }
};

exports.findAccount = async (req, res) => {
  const { account_no } = req.params;

};

exports.transferMoney = (req, res) => {
  const { account_no, receiverAccountNo, amount, password } = req.body;
  try {
    connection.query("SELECT * FROM `customer` WHERE `account_no` = ? AND `password` = ?", [account_no, password], (err, result, fields) => {
      if (err) {
        response(res, 500, "Internal Server Error", "Internal Server Error", err.message, null);
      } else {
        if (result.length > 0) {
          if (result[0].balance < amount) {
            response(res, 400, "Bad Request", "Insufficient Balance", "Insufficient Balance", null);
          } else {
            connection.query("SELECT * FROM `customer` WHERE `account_no` = ?", [receiverAccountNo], (err, result, fields) => {
              if (err) {
                response(res, 500, "Internal Server Error", "Internal Server Error", err.message, null);
              }
              if (result.length > 0) {
                connection.beginTransaction();
                connection.query("UPDATE `customer` SET `balance` = `balance` + ? WHERE `account_no` = ?", [amount, receiverAccountNo], (err, result, fields) => {
                  if (err) {
                    response(res, 500, "Internal Server Error", "Internal Server Error", err.message, null);
                  }
                  if (result.changedRows > 0) {
                    connection.query(
                      "INSERT INTO `transactions` VALUES (?,?,?,?,?,?)",
                      [
                        "",
                        account_no,
                        receiverAccountNo,
                        amount,
                        "Send Money",
                        new Date(),
                      ],
                      (err, result, fields) => {
                        if (err) {
                          connection.rollback();
                          response(
                            res,
                            500,
                            "Internal Server Error",
                            "Internal Server Error",
                            err.message,
                            null
                          );
                        }
                        connection.query(
                          "UPDATE `customer` SET `balance` = `balance` - ? WHERE `account_no` = ?",
                          [amount, account_no],
                          (err, result, fields) => {
                            if (err) {
                              connection.rollback();
                              response(
                                res,
                                500,
                                "Internal Server Error",
                                "Internal Server Error",
                                err.message,
                                null
                              );
                            }
                            if (result.affectedRows > 0) {
                              connection.commit();
                              response(
                                res,
                                200,
                                "OK",
                                "Money Transfered",
                                "Money Transfered",
                                null
                              );
                            } else {
                              connection.rollback();
                              response(
                                res,
                                500,
                                "Internal Server Error",
                                "Internal Server Error",
                                "Transfer Failed",
                                null
                              );
                            }
                          }
                        );
                      }
                    );
                  } else {
                    response(
                      res,
                      500,
                      "Internal Server Error",
                      "Internal Server Error",
                      "Transfer Failed",
                      null
                    );
                  }
                })
              } else {
                response(res, 404, "Not Found", "No Account Found", "No Account Found", null);
              }

            })
          }
        } else {
          response(res, 404, "Not Found", "Password Wrong", "Password Wrong", null);
        }
      }
    })
  } catch (error) {
    response(
      res,
      500,
      "Internal Server Error",
      "Internal Server Error",
      error.message,
      null
    );
  }


  // try {
  //   connection.query("SELECT * FROM `customer` WHERE `account_no` = ?", [account_no], (err, result, fields) => {
  //     if(err){
  //       response(res, 500, "Internal Server Error", "Internal Server Error", err.message, null);
  //     }
  //     if(result.length > 0){
  //       if(result[0].balance < amount){
  //         response(res, 400, "Bad Request", "Insufficient Balance", "Insufficient Balance", null);
  //       }else{
  //         connection.query("SELECT * FROM `customer` WHERE `account_no` = ?", [receiverAccountNo], (err, result, fields) => {
  //           if(err){
  //             response(res, 500, "Internal Server Error", "Internal Server Error", err.message, null);
  //           }
  //           if(result.length > 0){
  //             connection.beginTransaction();
  //             connection.query("UPDATE `customer` SET `balance` = `balance` + ? WHERE `account_no` = ?", [amount, receiverAccountNo], (err, result, fields) => {
  //               if(err){
  //                 response(res, 500, "Internal Server Error", "Internal Server Error", err.message, null);
  //               }
  //               if(result.affectedRows > 0){
  //                 connection.query(
  //                   "INSERT INTO `transactions` VALUES (?,?,?,?,?,?)",
  //                   [account_no, receiverAccountNo, amount, "Send Money", new Date()],
  //                   (err, result, fields) => {
  //                     if (err) {
  //                       connection.rollback();
  //                       response(
  //                         res,
  //                         500,
  //                         "Internal Server Error",
  //                         "Internal Server Error",
  //                         err.message,
  //                         null
  //                       );
  //                     }
  //                     connection.query(
  //                       "UPDATE `customer` SET `balance` = `balance` - ? WHERE `account_no` = ?",
  //                       [amount, account_no],
  //                       (err, result, fields) => {
  //                         if (err) {
  //                           connection.rollback();
  //                           response(
  //                             res,
  //                             500,
  //                             "Internal Server Error",
  //                             "Internal Server Error",
  //                             err.message,
  //                             null
  //                           );
  //                         }
  //                         if (result.affectedRows > 0) {
  //                           connection.commit();
  //                           response(
  //                             res,
  //                             200,
  //                             "OK",
  //                             "Transfer Successfull",
  //                             "Transfer Successfull",
  //                             null
  //                           );
  //                         } else {
  //                           connection.rollback();
  //                           response(
  //                             res,
  //                             500,
  //                             "Internal Server Error",
  //                             "Internal Server Error",
  //                             "Transfer Failed",
  //                             null
  //                           );
  //                         }
  //                       }
  //                     );
  //                   }
  //                 );
  //               }else{
  //                 response(res, 500, "Internal Server Error", "Internal Server Error", "Transfer Failed", null);
  //               }
  //             })
  //           }else{
  //             response(res, 404, "Not Found", "No Account Found", "No Account Found", null);
  //           }
  //         })
  //       }
  //     }else{
  //       response(res, 404, "Not Found", "No Account Found", "No Account Found", null);
  //     }
  //   })
  // } catch (error) {
  //   response(res, 500, "Internal Server Error", "Internal Server Error", error.message, null);
  // }
};
exports.balance = (req, res) => {
  const { account_no } = req.params;
  try {
    connection.query(
      "SELECT `balance` FROM `customer` WHERE `account_no` = ?",
      [account_no],
      (err, result, fields) => {
        if (err) {
          response(
            res,
            500,
            "Internal Server Error",
            "Internal Server Error",
            err.message,
            null
          );
        }
        if (result.length > 0) {
          response(res, 200, "OK", "Balance Found", "Balance Found", result[0]);
        } else {
          response(
            res,
            404,
            "Not Found",
            "No Account Found",
            "No Account Found",
            null
          );
        }
      }
    );
  } catch (error) {
    response(
      res,
      500,
      "Internal Server Error",
      "Internal Server Error",
      error.message,
      null
    );
  }
};
exports.transitions = (req, res) => {
  const { account_no } = req.params;
  try {
    connection.query(
      "SELECT * FROM `transactions` WHERE `account_no` = ? or `receiver_account_no`=?",
      [account_no, account_no],
      (err, result, fields) => {
        if (err) {
          response(
            res,
            500,
            "Internal Server Error",
            "Internal Server Error",
            err.message,
            null
          );
        }
        console.log(result.length);
        if (result.length > 0) {
          response(
            res,
            200,
            "OK",
            "Transition Found",
            "Transition Found",
            result
          );
        } else if (result.length == 0) {
          response(
            res,
            404,
            "Not Found",
            "No Transition Found",
            "No Transition Found",
            null
          );
        } else {
          response(
            res,
            404,
            "Not Found",
            "No Transition Found",
            "No Transition Found",
            null
          );
        }
      }
    );
  } catch (error) {
    response(
      res,
      500,
      "Internal Server Error",
      "Internal Server Error",
      error.message,
      null
    );
  }
};
exports.inactive = async (req, res) => {
  const { accountNo } = req.params;
  try {
    const account = await Customer.findOne({ accountNo: accountNo });
    if (!account) {
      Response(res, 404, "Not Found", "Account not found.", "Account not found.", null);
      return;
    }
    account.status = "inactive";
    await account.save();
    Response(res, 200, "OK", "Account deactivated.", "Account deactivated.", null);
  } catch (error) {
    console.error("Error deactivating account:", error);
    Response(res, 500, "Internal Server Error", "Internal Server Error", error.message, null);
  }
};
exports.active = async (req, res) => {
  try {
    const accountNo = req.params.accountNo;
    const account = await Customer.findOne({ accountNo: accountNo });
    if (!account) {
      Response(res, 404, "Not Found", "Account not found.", "Account not found.", null);
      return;
    }
    account.status = "active";

    // Generate password using birth year and some random characters
    const generatePassword = (dob) => {
      const birthYear = new Date(dob).getFullYear();  // Extract birth year from dob
      const randomChars = crypto.randomBytes(2).toString('hex');  // Generate 4 random characters
      return `${birthYear}${randomChars}`;  // Combine birth year and random characters
    };

    const newPassword = generatePassword(account.dob);  // Generate password with birth year

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    account.password = hashedPassword;

    await account.save();

    const info = await transporter.sendMail({
      from: "mohobbatchutiya@gmail.com", // sender address
      to: account.email, // list of receivers
      subject: "Account Active", // Subject line
      text: `Your account has been created. Your customer ID is: ${account.accountNo}`, // plain text body
      html: `<p>Your account has been Approved. Your Account No is: <strong>${account.accountNo}</strong></p><p>Your new password is: <strong>${newPassword}</strong></p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    Response(res, 200, "OK", "Account activated.", "Account activated.", null);
  }
  catch (error) {
    console.error("Error activating account:", error);
    Response(res, 500, "Internal Server Error", "Internal Server Error", error.message, null);
  }
}


exports.deleteAccount = (req, res) => {
  const { account_no } = req.params;
  try {
    connection.query(
      "DELETE FROM `customer` WHERE `account_no` = ?",
      [account_no],
      (err, result, fields) => {
        if (err) {
          response(
            res,
            500,
            "Internal Server Error",
            "Internal Server Error",
            err.message,
            null
          );
        }
        if (result.affectedRows > 0) {
          response(res, 200, "OK", "Account Deleted", "Account Deleted", null);
        } else {
          response(
            res,
            404,
            "Not Found",
            "No Account Found",
            "No Account Found",
            null
          );
        }
      }
    );
  } catch (error) {
    response(
      res,
      500,
      "Internal Server Error",
      "Internal Server Error",
      error.message,
      null
    );
  }
};
exports.updateAccount = (req, res) => {
  accountUpdate =
    "UPDATE customers SET name = 'NewNme', address = 'New Address', email = 'newemail@example.com', mobile = '555-555-5555', pin = 'newpin', balance = 1500.00, status = 'Active' WHERE customer_id = 18";
  accountUpdateValue = [];
  connection.query(accountUpdate, accountUpdateValue, (err, result, fields) => {
    if (err) {
      res.send(err);
    }
    if (result.changedRows > 0) {
      res.send("Updated");
    } else {
      res.send("No Change");
    }
  });
};
