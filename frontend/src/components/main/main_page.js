import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./main_page.css";

class MainPage extends React.Component {
  render() {
    return (
      <div className="splash__bg">
        <div className="splash">
          <div className="splash__intro">
            <h1>Find out whatsGood now!</h1>
            <Link to="/signup">
              <Button variant="contained">Login / Sign Up</Button>
            </Link>
          </div>
          <div className="splash__section">
            <img src="follow_list.png" className="splash__img" />
            <div className="splash__text">
              <h2>Follow Lists</h2>
              <p>
                Bookmark your favorite lists. Make sure you always have a high
                quality read on queue.
              </p>
            </div>
          </div>
          <div className="splash__section">
            <div className="splash__text">
              <h2>Follow your friends</h2>
              <p>
                Users can follow each other, allowing them to keep track of
                their friends' new lists and go-to reads. When viewing a book on
                whatsGood, a personalized rating is generated based on the
                percentage of following users that have the selected book on at
                least one of their lists.
              </p>
            </div>
            <img src="/follow_user.png" className="splash__img" />
          </div>
          <div className="splash__section">
            <img src="/add_list.png" className="splash__img" />
            <div className="splash__text">
              <h2>Create lists</h2>
              <p>Utilize the Google Books API to create custom book lists.</p>
            </div>
          </div>
          <footer>Copyright &copy; 2022 whatsGood</footer>
        </div>
      </div>
    );
  }
}

export default MainPage;
