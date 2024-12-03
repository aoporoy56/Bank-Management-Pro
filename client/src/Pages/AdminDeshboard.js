import React, {  useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function AdminDeshboard() {
  return (
    <div>
      <div className="container border mt-5 p-5">
        <h2>Admin Deshboard</h2>
        <div className="row">
          <Link to="/admin/allaccountlist" className="col-md-3">
            <div>
              <div className="customer-card">
                <img
                  src="images/account-list.png"
                  alt="Avatar"
                  class="avatar"
                  width={"100%"}
                />
                <div className="card-float">
                  <h3>Account List</h3>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/admin/allaccountlist" className="col-md-3">
            <div>
              <div className="customer-card">
                <img
                  src="images/logout.png"
                  alt="Avatar"
                  class="avatar"
                  width={"100%"}
                />
                <div className="card-float">
                  <h3>Logout</h3>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
