import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./Tea_dashboard.jpg";
import teaImage from "./tea.png";

const DDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={dashboardStyle}>
      <h2>Welcome to Wholesale Inventoty</h2>
      <h3>I'm Dasuni..</h3>
      <img src={teaImage} alt="Tea Dashboard" style={imageStyle} />
      <button onClick={() => navigate("/productlist")} style={buttonStyle}>
        Product List
      </button>
      <button onClick={() => navigate("/orderlist")} style={buttonStyle}>
        Order List
      </button>
      <button onClick={() => navigate("/vendorlist")} style={buttonStyle}>
        Vendor List
      </button>
    </div>
  );
};

// Styles
const dashboardStyle = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh", // 75px is your header height
  width: "100vw",
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  margin: 0,
  paddingTop: "75px", // Ensures content starts below the header
  boxSizing: "border-box"
};
const imageStyle = {
  width: "25%",
  height: "auto",
  maxHeight: "50vh",
  objectFit: "cover",
  marginBottom: "20px"
};
const buttonStyle = {
  margin: "6px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  border: "none",
  borderRadius: "5px",
  height: "5vh",
  width: "15vw",
  backgroundColor: "mint green",
  color: "#fff",
  fontWeight: "bold",
  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
  transition: "0.3s"
};

// Hover effect
buttonStyle[":hover"] = {
  backgroundColor: "#66cc66", // Slightly darker green on hover
};

export default DDashboard;
