import React from "react";
import Button from "@mui/material/Button";
import "./main_page.css";

class MainPage extends React.Component {
  render() {
    return (
      <div className="splash__bg">
        <div className="splash">
          <h1>Find out whatsGood now!</h1>
          <Button variant="contained">Login / Sign Up</Button>
          <footer>Copyright &copy; 2022 whatsGood</footer>
        </div>
      </div>
    );
  }
}

export default MainPage;
