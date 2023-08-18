import React from 'react';
import { useNavigate } from 'react-router-dom';
// import useConfetti from '../../hooks/Animations/useConfetti';
import useColorConfetti from '../../hooks/Animations/useColorConfetti';
import "../styles/IntroPage/IntroCaution.css"

interface IntroCautionProps {
  onButtonClick: () => void;
}

const IntroCaution: React.FC<IntroCautionProps> = ({ onButtonClick }) => {
  const navigate = useNavigate();
  // const { triggerConfetti } = useConfetti(["🧡", "💗", "💙", "💚", "🖤", "💛", "🤎"], 30, 200);
  const { triggerConfetti } = useColorConfetti(5, 400);

  const handleButtonClick = () => {
    // 확인 버튼을 눌렀을 때 LoginPage로 이동
    triggerConfetti(); // 폭죽 효과 트리거
    navigate('/login');
  };

  return (
    <div className="intro-caution">
      <h1 className="caution-heading">주의</h1>
      <p className="caution-text">
        유아가 이 애플리케이션을 사용하는 동안, 부모님의 동반 및 관찰이 필요합니다. 부모님과 함께 사용하면서 즐거운 시간을 보내는 것을 권장드립니다.
      </p>
      <button onClick={handleButtonClick} className="btn">
        확인
      </button>
    </div>
  );
};

export default IntroCaution;
