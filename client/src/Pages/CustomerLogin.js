import React, { useState } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../Context/UserProvider";

export default function CustomerLogin() {
  const [accountNo, setAccountNo] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [welcomeMessage, setWelcomeMessage] = useState(""); // Welcome message state
  const { setUser } = UserState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.length < 6) {
      alert("Password must be 6 characters long");
      return;
    }
    const data = { accountNo, password };

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/customer/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Response:", result);

      if (response.status === 200) {
        // Display welcome popup
        setWelcomeMessage(`Welcome, ${result.data.account.accountTitleEnglish}!`);
        setShowModal(true);
        setUser(result.data.account.accountNo);
        localStorage.setItem("user", result.data.account.accountNo);
        setTimeout(() => {
           // Redirect after a short delay to allow the popup to appear
        }, 1500);
      } else if (response.status === 400) {
        alert("Account is not active");
        navigate("/customer/login");
      } else {
        alert("Account No or Password is wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something wrong with the server. Please try again later.");
    }
  };

  // Close modal
  const handleCloseModal = () => {
    navigate("/customer");
    setShowModal(false)
  };

  return (
    <div className="container">
      <Row className="d-flex justify-content-center">
        <div className="col-md-6 border mt-5 p-5">
          <h2 className="text-center">Customer Login</h2>
          <Form noValidate onSubmit={handleSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Control
                required
                type="text"
                placeholder="Account No"
                onChange={(e) => {
                  setAccountNo(e.target.value);
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

            <Button type="submit">Login</Button>
            <p className="mt-3">
              Create a Account? <Link to={"/customer/register"}>Signup</Link>{" "}
            </p>
          </Form>
        </div>
      </Row>

      {/* Welcome Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome</Modal.Title>
        </Modal.Header>
        <Modal.Body>{welcomeMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
