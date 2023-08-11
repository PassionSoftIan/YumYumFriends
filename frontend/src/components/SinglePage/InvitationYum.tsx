import React, { useEffect } from 'react';

declare global {
    interface Window {
        Kakao: any
    }
}

const InvitationYum: React.FC = () => {
    // 배포한 자신의 사이트
    const realUrl = "https://yumyumfriends.site/"
    // 로컬 주소 (localhost 3000 같은거)
    const resultUrl = window.location.href;
    
    // 재랜더링시에 실행되게 해준다.
    useEffect(()=>{
        // init 해주기 전에 clean up 을 해준다.
        window.Kakao.cleanup();
        // 자신의 js 키를 넣어준다.
        window.Kakao.init('b7122629a0a31ceda48e9b68c1655d8d');
        // 잘 적용되면 true 를 뱉는다.
        console.log(window.Kakao.isInitialized());
    },[]);

    const shareKakao = () =>{

        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '오늘의 디저트',
                description: '아메리카노, 빵, 케익',
                imageUrl:
                'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
                link: {
                    mobileWebUrl: realUrl,
                },
            },
            buttons: [
                {
                    title: '나도 테스트 하러가기',
                    link: {
                    mobileWebUrl: realUrl,
                    },
                },
                ],
            });
    }
        
    return(
        <>
            <button 
                className='grey-btn'
                onClick={() => {
                    shareKakao()
                }}
            > 카카오톡 공유하기 </button>
        </>
    )
};

export default InvitationYum;