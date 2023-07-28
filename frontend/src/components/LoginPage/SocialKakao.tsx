import React from "react";
import KakaoLogin from "react-kakao-login";
import { useNavigate } from "react-router-dom";

interface SocialKakaoProps {
  onSuccess: () => void;
}

const SocialKakao: React.FC<SocialKakaoProps> = ({ onSuccess }) => {
  const kakaoClientId = '32fb0d038e3668baf93731bff12acf54';
  const navigate = useNavigate();

  const kakaoOnSuccess = (data: any) => {
    console.log(data);
    const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
    onSuccess(); // 카카오 로그인이 성공했을 때, 전달받은 onSuccess 함수를 호출
    navigate("/main"); // 페이지 이동
  };

  const kakaoOnFailure = (error: any) => {
    console.log(error);
  };

  return (
    <>
      <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
      />
    </>
  );
};

export default SocialKakao;
