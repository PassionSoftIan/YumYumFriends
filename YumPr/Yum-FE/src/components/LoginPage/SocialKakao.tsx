import React from "react";
import KakaoLogin from "react-kakao-login";
import logo from "../assets/gametitle.png";

const SocialKakao = () => {
  const kakaoClientId = '32fb0d038e3668baf93731bff12acf54';

  const kakaoOnSuccess = async (data: any) => { // 여기서 any 대신에 KakaoLogin에서 반환하는 타입을 사용하는 것이 좋습니다.
    console.log(data);
    const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
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
