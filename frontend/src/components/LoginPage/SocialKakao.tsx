import React, { FC } from 'react';

interface SocialKakaoProps {
    onSuccess: () => void;  // Success handler prop
}

const SocialKakao: FC<SocialKakaoProps> = ({ onSuccess }) => {

    const KAKAO_OAUTH_URL = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=db4a66f215fd566fd6a8b24f9cfb4ef7&redirect_uri=https://yumyumfriends.site/api/v1/kakao/login';

    const handleLogin = () => {
        window.open(
            KAKAO_OAUTH_URL,
            "KakaoLogin",
            "width=500,height=500"
        );
        onSuccess();  // Call the success handler after opening the login window
    };

    return (
        <button onClick={handleLogin}>
            Login with Kakao
        </button>
    );
};

export default SocialKakao;
