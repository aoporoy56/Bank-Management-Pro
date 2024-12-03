import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function TransferMoney() {
  const [receiverAccountNo, setReceiverAccountNo] = useState("");
  const [account_no, setAccount_no] = useState("98765"); // [1
  const [receiverName, setReceiverName] = useState("");
  const [accountValid, setAccountValid] = useState(false); // [1
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const findAccount = async (event) => {
    event.preventDefault();
    if (receiverAccountNo.length < 1) {
      alert("Account No must be 1 digit long");
      return;
    }
    await fetch(
      "http://localhost:4000/customer/findAccount/" + receiverAccountNo,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          // alert("Account Found");
          setReceiverName(result.data.full_name);
          setAccountValid(true);
        } else {
          // alert("Account Not Found");
          setReceiverName("");
          setAccountValid(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setReceiverName("");
        setAccountValid(false);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAccount_no(localStorage.getItem("user"));
    if (account_no === receiverAccountNo) {
      alert("You can't transfer money to your own account");
      return;
    } else if (!accountValid) {
      alert("Account Not Found");
    } else if (amount < 100) {
      alert("Amount must be 100 or more");
    } else if (password.length < 6) {
      alert("Password must be 6 digit long");
    } else {
      const data = {
        account_no: account_no,
        receiverAccountNo: receiverAccountNo,
        amount: amount,
        password: password,
      };
      await fetch("http://localhost:4000/customer/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          alert(res.message)
          if(res.message == "Money Transfered"){
            navigate("/customer");
          }
        })
        .catch((err) => {
          alert("Something wrong with server");
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <Row className="d-flex justify-content-center">
        <div className="col-md-6 border mt-5 p-5">
          <h2 className="text-center">Money Transfer</h2>
          <Form noValidate onSubmit={handleSubmit} className="mt-4">
            <Row className="mb-3">
              <div className="col-md-8">
                <Form.Group controlId="validationCustom03">
                  <Form.Control
                    required
                    type="number"
                    placeholder="Account No"
                    onChange={(e) => {
                      setReceiverAccountNo(e.target.value);
                      setAccountValid(false);
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Button className="w-100" onClick={findAccount}>
                  Find Account
                </Button>
              </div>
            </Row>
            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Control
                required
                type="text"
                placeholder="Account Holder Name"
                value={receiverName}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Control
                required
                type="number"
                placeholder="Amount"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Control
                required
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Button type="submit">Send</Button>
          </Form>
        </div>
      </Row>
    </div>
  );
}
