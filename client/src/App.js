import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerDeshboard from "./Pages/CustomerDeshboard";
import CustomerRegister from "./Pages/CustomerRegister";
import CustomerLogin from "./Pages/CustomerLogin";
import TransferMoney from "./Components/TransferMoney";
import AdminDeshboard from "./Pages/AdminDeshboard";
import AllAccountList from "./Components/AllAccountList";
import Header from "./Components/Header";
import AdminLogin from "./Pages/AdminLogin";
import UserProvider from "./Context/UserProvider";
import Track from "./Pages/Track";

function App() {
  return (
    <div class="App">
      <Header />
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/customer/register" element={<CustomerRegister />} />
            <Route path="/customer/login" element={<CustomerLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/" element={<Home />} />
            <Route path="/track" element={<Track />} />
            <Route path="/customer" element={<CustomerDeshboard />} />
            <Route path="/customer/transfer" element={<CustomerDeshboard />} />
            <Route path="/customer/balance" element={<CustomerDeshboard />} />
            <Route path="/customer/transactions" element={<CustomerDeshboard />} />
            <Route path="/customer" element={<CustomerDeshboard />} />
            <Route path="/customer/transfer" element={<TransferMoney />} />
            <Route path="/admin" element={<AdminDeshboard />} />
            <Route path="/admin/allaccountlist" element={<AllAccountList />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
