import React, { useState, useEffect } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Districts from "../Data/Districts.json";
import CustomerInformation from "../Components/CustomerInformation";
import AccountInformation from "../Components/AccountInfomation";
import NomineeInformation from "../Components/NomineeInformation";

export default function CustomerRegister() {
  const [validated, setValidated] = useState(false);

  
  const [formData, setFormData] = useState({


    // Account Information
    accountTitleEnglish: '',
    accountTitleBangla: '',
    accountType: 'savingsAccounts',
    currency: 'BDT',
    selectedDivision: '',
    selectedDistrict: '',
    contactAddress: '',
    sourceOfFund: [],
    selfImageUrl: '',
    nidImageUrl: '',

    // Customer Information
    firstName: "",
    lastName: "",
    banglaFullTitle: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
    gender: "",
    dob: "",
    occupation: "",
    monthlyIncome: "",
    nationalId: "",
    email: "",
    phone1: "",
    phone2: "",
    presentAddress: "",
    permanentAddress: "",
    religion: '',
    maritalStatus: '',

    // Nominee Information
    nomineeName: "",
    relationshipWithAccountHolder: "Spouse/Child",
    nomineeDob: "",
    nomineePercentage: "",
    nomineeNationalId: "",
    nomineeIdType: "NID",
    nomineeOtherIdType: "",
    nomineeOtherIdDescription: "",
    nomineeAddress: "",
    isNomineeUnder18: false,
  });
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  useEffect(() => {
    if (formData.selectedDivision) {
      const filtered = Districts.filter((district) => district.division_id === formData.selectedDivision);
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts([]);
    }
  }, [formData.selectedDivision]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formData);

    try {
      const response = await fetch("http://localhost:4000/customer/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result)
      if (response.status === 201) {
        alert(result.message);
        // window.location.href = "/customer/login";
      } else {
        alert(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="container ">
      <Row className="d-flex justify-content-center">
        <div className="col-md-12  mt-5 p-5 inner-body">
          <h2 className="text-center" style={{ color: "#0d47a1" }}>
            Customer Sign Up
          </h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-4">

            <AccountInformation onAccountInformationSubmit={handleFormDataChange} />
            
            <CustomerInformation onCustomerInformationSubmit={handleFormDataChange} />
            
            <NomineeInformation onNomineeInformationSubmit={handleFormDataChange} />


            <Button type="submit" className="w-100 btn btn-primary btn-lg shadow-sm mt-5">
              Sign Up
            </Button>
            <p className="mt-3 text-center">
              Already have an account? <Link to="/customer/login" className="text-primary">Login</Link>
            </p>
          </Form>
        </div>
      </Row>
    </div>
  );
}
