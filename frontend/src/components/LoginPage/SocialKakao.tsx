import React, { FC, useEffect } from 'react';

interface SocialKakaoProps {
    onSuccess: () => void;  // Success handler prop
}

const SocialKakao: FC<SocialKakaoProps> = ({ onSuccess }) => {

    const KAKAO_OAUTH_URL = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=db4a66f215fd566fd6a8b24f9cfb4ef7&redirect_uri=https://yumyumfriends.site/api/v1/kakao/login';

    const handleLogin = () => {
        const loginWindow = window.open(
            KAKAO_OAUTH_URL,
            "KakaoLogin",
            "width=500,height=500"
        );

        const checkLogin = setInterval(() => {
            // Check if the loginWindow is not null and closed
            if (loginWindow && loginWindow.closed) {
                clearInterval(checkLogin);
                onSuccess();  // Call the success handler after the login window is closed
            }
        }, 500);
    };

    return (
        <button onClick={handleLogin}>
            Login with Kakao
        </button>
    );
};

export default SocialKakao;
