import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Nav, Navbar } from "react-bootstrap";
import { UserState } from "../Context/UserProvider"; // To get the logged-in user data

export default function CustomerDashboard() {
  const { setUser } = UserState();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("myAccount");

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/customer/login");
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>Customer Dashboard</Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md={3} className="sidebar">
            {/* Sidebar */}
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="/customer"
                active={activeLink === "myAccount"}
                onClick={() => setActiveLink("myAccount")}
              >
                My Account
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/customer/transfer"
                active={activeLink === "transfer"}
                onClick={() => setActiveLink("transfer")}
              >
                Transfer
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/customer/balance"
                active={activeLink === "balance"}
                onClick={() => setActiveLink("balance")}
              >
                Balance
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/customer/transactions"
                active={activeLink === "transactions"}
                onClick={() => setActiveLink("transactions")}
              >
                All Transactions
              </Nav.Link>
              <Button variant="danger" onClick={handleLogout} className="mt-3">
                Logout
              </Button>
            </Nav>
          </Col>

          {/* Dashboard Content */}
          <Col md={9}>
            <h2 className="text-center mb-4">Welcome to Your Dashboard</h2>

            {/* Your Account */}
            {activeLink === "myAccount" && (
              <div>
                <h4>Account Details</h4>
                {/* Display account details here */}
                <p>Account Number: ACC2024000001</p>
                <p>Account Title: John Doe</p>
                <p>Email: john.doe@example.com</p>
                {/* More account details */}
              </div>
            )}

            {/* Transfer */}
            {activeLink === "transfer" && (
              <div>
                <h4>Transfer Funds</h4>
                {/* Form or other components to handle transfer */}
                <p>Transfer functionality will go here.</p>
              </div>
            )}

            {/* Balance */}
            {activeLink === "balance" && (
              <div>
                <h4>Balance</h4>
                {/* Display balance here */}
                <p>Current Balance: BDT 50,000</p>
              </div>
            )}

            {/* Transactions */}
            {activeLink === "transactions" && (
              <div>
                <h4>All Transactions</h4>
                {/* List of transactions */}
                <p>Transaction history will be displayed here.</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
