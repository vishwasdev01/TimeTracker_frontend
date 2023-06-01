import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Tracking from "../img/time.jpeg";
import Checkin from "./checkin";

function Landing() {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };


  return (
    <>
      <div className="App">
        <div className="image-part">
          <img src={Tracking} alt="tracking img" />
        </div>
        <div className="landing-btn">
          <nav>
            <button onClick={() => navigate("/managment")}>Time Managment</button>
            <button onClick={() => navigate("/usercreate")}>Create User</button>
            <button onClick={openModal}>Check In</button>
            {isOpen && <Checkin />}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Landing;
