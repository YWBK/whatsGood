import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./about_us.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#F0EAD2",
  border: "2px solid #000",
  boxShadow: 24,
  zIndex: 20000,
  p: 4,
};

export default function AboutUs() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div onClick={(e) => handleOpen(e)}>About Us</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 15000 }}
      >
        <Box sx={style} className="about-us__container">
          <div className="about__ethan">
            <img
              src="/ethan_profile.png"
              alt="ethan profile"
              className="about-img"
            />
            <p>Ethan Gumin</p>
            <a href="https://angel.co/u/ethan-gumin">
              <img
                src="/angellist_icon.svg"
                alt="ethan angel list"
                className="social-img"
              />
            </a>
            <a href="https://www.linkedin.com/in/ethan-gumin-2959b996/">
              <img
                src="/linkedin_icon.svg"
                alt="ethan linkedin"
                className="social-img"
              />
            </a>
            <a href="https://github.com/ethangumin">
              <img
                src="/github_icon.svg"
                alt="ethan github"
                className="social-img"
              />
            </a>
          </div>
          <div className="about__katie">
            <img
              src="/katie_profile.png"
              alt="katie profile"
              className="about-img"
            />
            <p>Katie Hang</p>
            <a href="">
              <img
                src="/angellist_icon.svg"
                alt="katie angel list"
                className="social-img"
              />
            </a>
            <a href="https://www.linkedin.com/in/yuchen-katie-hang-443b27a4/">
              <img
                src="/linkedin_icon.svg"
                alt="katie linkedin"
                className="social-img"
              />
            </a>
            <a href="https://github.com/johnda911">
              <img
                src="/github_icon.svg"
                alt="katie github"
                className="social-img"
              />
            </a>
          </div>
          <div className="about__bill">
            <img
              src="/bill_profile.jpeg"
              alt="bill profile"
              className="about-img"
            />
            <p>Bill Kim</p>
            <a href="https://angel.co/u/yong-woo-kim-1">
              <img
                src="/angellist_icon.svg"
                alt="bill angel list"
                className="social-img"
              />
            </a>
            <a href="https://www.linkedin.com/in/bill-kim-88987a42/">
              <img
                src="/linkedin_icon.svg"
                alt="bill linkedin"
                className="social-img"
              />
            </a>
            <a href="https://github.com/YWBK">
              <img
                src="/github_icon.svg"
                alt="bill github"
                className="social-img"
              />
            </a>
          </div>
          <div className="about__steven">
            <img
              src="/steven_profile.jpeg"
              alt="steven profile"
              className="about-img"
            />
            <p>Steven Wu</p>
            <a href="https://angel.co/u/steven-wu-31">
              <img
                src="/angellist_icon.svg"
                alt="steven angel list"
                className="social-img"
              />
            </a>
            <a href="https://www.linkedin.com/in/steven-wu-cams-29814136/">
              <img
                src="/linkedin_icon.svg"
                alt="steven linkedin"
                className="social-img"
              />
            </a>
            <a href="https://github.com/swusteven">
              <img
                src="/github_icon.svg"
                alt="steven github"
                className="social-img"
              />
            </a>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
