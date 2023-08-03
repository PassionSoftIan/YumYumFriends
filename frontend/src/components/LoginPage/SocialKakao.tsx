import React from "react";
import KakaoLogin from "react-kakao-login";
import { useNavigate } from "react-router-dom";

interface SocialKakaoProps {
  onSuccess: () => void;
}

const SocialKakao: React.FC<SocialKakaoProps> = ({ onSuccess }) => {
  const kakaoClientId = 'db4a66f215fd566fd6a8b24f9cfb4ef7'; // 카카오 개발자 사이트에서 발급받은 클라이언트 아이디로 변경
  // const redirectUri = 'https://yumyumfriends.site/api/v1/kakao/login'; // 카카오 개발자 사이트에서 설정한 리다이렉트 URI로 변경
  const navigate = useNavigate();

  const kakaoOnSuccess = (response: any) => {
    console.log(response);
    // const code = response.response.code; // 카카오로부터 받은 인가 코드
    // 백엔드로 인가 코드를 전달하고, 인가 코드를 사용하여 토큰을 발급받는 로직 구현
    // 토큰 발급이 성공하면 아래의 onSuccess 함수 호출
    onSuccess(); // 카카오 로그인이 성공했을 때, 전달받은 onSuccess 함수를 호출
    navigate("/main"); // 페이지 이동
  };

  const kakaoOnFail = (error: any) => {
    console.log(error);
  };

  return (
    <>
      <KakaoLogin
        token={kakaoClientId} // 클라이언트 아이디 -> 토큰으로 변경
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFail} // onFailure -> onFail로 변경
      />
    </>
  );
};

export default SocialKakao;
