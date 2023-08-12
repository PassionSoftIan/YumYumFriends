import React from "react";
import Cloud from "../components/Animation/Cloud";
import useConfetti from "../hooks/Animations/useConfetti";
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import Action0 from "../assets/Action/02_mandarin_acquired.gif";
import Action1 from "../assets/Action/13_apple_acquired.gif";
import Action2 from "../assets/AttackingYums/01_tofu_attack.gif";
import Action3 from "../assets/Attacked/31_bacteria_attacked.gif";
// import Action4 from "../assets/Attacked/31_bacteria_attacked.gif"
import "./styles/MainPage.css";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const { triggerConfetti } = useConfetti(
    ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣"],
    70,
    60
  );

  const handleAction = (action: () => void) => {
    triggerConfetti();
    action();
<<<<<<< HEAD
>>>>>>> 9d70f7e639a6f2f6d484a65906fb0e114b91ba9e
=======
>>>>>>> 5fe25c1f62622c409cbce073f158a2d2d85b3b77
  };

  return (
    <div className="main-container">
      <Cloud />

      <div className="center">
        <div className="button-container">
          <Button
            onClick={() => handleAction(() => navigate("/single"))}
            className="game-button button-second"
          >
            <span>밥 먹기</span>
<<<<<<< HEAD
<<<<<<< HEAD
          </button>
>>>>>>> 9d70f7e639a6f2f6d484a65906fb0e114b91ba9e
=======
          </Button>
>>>>>>> c10fbf7dbd37d7d391fdc57850935f545f1ca714
=======
          </Button>
>>>>>>> 5fe25c1f62622c409cbce073f158a2d2d85b3b77

          <Button
            onClick={() => handleAction(() => navigate("/multi"))}
            className="game-button button-second"
          >
<<<<<<< HEAD
<<<<<<< HEAD
            <span>Multi</span>
          </button>

          {/* <button
            onClick={() => handleAction(() => navigate("/dex"), "도감")}
            className="game-button button-second btn"
          >
<<<<<<< HEAD
            <span>프로필</span>
          </button>
          <Button onClick={handleSettings}>설정</Button>
          <Button onClick={handleSelect}>대표냠</Button>
        </div>
      </div>
      </div>
=======
            <span>냠냠이들</span>
          </button> */}
=======
            <span>같이 먹기</span>
          </Button>

>>>>>>> c10fbf7dbd37d7d391fdc57850935f545f1ca714
=======
            <span>같이 먹기</span>
          </Button>

>>>>>>> 5fe25c1f62622c409cbce073f158a2d2d85b3b77
          <div className="sub-buttons">
            <Button
              onClick={() => handleAction(() => navigate("/select"))}
              className="game-button button-second"
            >
              대표냠
            </Button>
            <Button
              onClick={() => handleAction(() => navigate("/settings"))}
              className="game-button button-second"
            >
              설정
            </Button>
          </div>
        </div>
      </div>
      <img src={Action0} alt="" className="action-image" />
      <img src={Action1} alt="" className="action-image1" />
      <img src={Action2} alt="" className="action-image2" />
      <img src={Action3} alt="" className="action-image3" />
      {/* <img src={Action4} alt="" className="action-image4" /> */}
    </div>
  );
};

export default MainPage;
