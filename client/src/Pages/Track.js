import React, { useState } from "react";
import { Row, Form, Button, Alert, Spinner } from "react-bootstrap";

export default function Track() {
  const [accountId, setAccountId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrackStatus = async () => {
    setLoading(true);
    setError(null);
    setStatus("");

    try {
      const response = await fetch(`http://localhost:4000/customer/status/${accountId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch account status.");
      }

      const data = await response.json();
      setStatus(data.data); // Expecting API to return { status: "active" | "inactive" | "pending" }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Row className="d-flex justify-content-center">
        <div className="col-md-6 mt-5 p-5 inner-body">
          <h2 className="text-center" style={{ color: "#0d47a1" }}>
            Track Account Status
          </h2>

          <Form>
            <Form.Group className="mb-3" controlId="accountId">
              <Form.Label>Enter Account ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your account ID"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleTrackStatus}
              disabled={loading || !accountId}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Track Status"}
            </Button>
          </Form>

          {status && (
            <Alert variant={status === "active" ? "success" : status === "inactive" ? "danger" : "warning"} className="mt-3">
              Account Status: <strong>{status.charAt(0).toUpperCase() + status.slice(1)}</strong>
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </div>
      </Row>
    </div>
  );
}
