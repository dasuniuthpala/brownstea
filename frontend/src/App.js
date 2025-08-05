import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Shared Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Pages & Modules
import MainContent from "./components/MainContent";
import AboutUs from "./pages/AboutUs";
import Blogs from "./pages/Blogs";
import Login from "./pages/Auth/Login";
import TeaCollection from "./pages/TeaCollection";
import TeaDetails from "./pages/TeaDetails";
import BlogPostPage from "./components/BlogPostPage";

// Feedback Module
import FeedbackList from "./components/Feedback/FeedbackList";
import AddFeedback from "./components/Feedback/AddFeedback";
import EditFeedback from "./components/Feedback/EditFeedback";

// Inventory & Dashboard Module
import DDashboard from "./components/DDashboard";
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";
import EditItem from "./components/EditItem";

// Order Module
import OrderList from "./components/Order/OrderList";
import AddOrder from "./components/Order/AddOrder";
import EditOrder from "./components/Order/EditOrder";

// Vendor Module
import VendorList from "./components/Vendor/VendorList";
import AddVendor from "./components/Vendor/AddVendor";
import EditVendor from "./components/Vendor/EditVendor";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="app">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <div className="content">
          <Routes>
            {/* General Pages */}
            <Route path="/" element={<MainContent />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/teas" element={<TeaCollection />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/teacollection" element={<TeaCollection />} />
            <Route path="/tea/:teaId" element={<TeaDetails />} />
            <Route path="/post/:id" element={<BlogPostPage />} />

            {/* Feedback Module */}
            <Route path="/feedback" element={<FeedbackList />} />
            <Route path="/add-feedback" element={<AddFeedback />} />
            <Route path="/edit-feedback/:id" element={<EditFeedback />} />

            {/* Inventory & Dashboard Module */}
            <Route path="/d" element={<DDashboard />} />
            <Route path="/inventory/wholesale" element={<DDashboard />} />
            <Route path="/productlist" element={<ItemList />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/edit/:id" element={<EditItem />} />

            {/* Order Module */}
            <Route path="/orderlist" element={<OrderList />} />
            <Route path="/addorder" element={<AddOrder />} />
            <Route path="/editOrder/:id" element={<EditOrder />} />

            {/* Vendor Module */}
            <Route path="/vendorlist" element={<VendorList />} />
            <Route path="/addvendor" element={<AddVendor />} />
            <Route path="/editvendor/:id" element={<EditVendor />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;