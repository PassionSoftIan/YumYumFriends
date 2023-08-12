import React, { useEffect } from 'react';

declare global {
    interface Window {
        Kakao: any
    }
}

const InvitationYum: React.FC = () => {

    const UserID = localStorage.getItem("id");
    const storedNickname = localStorage.getItem("nickname");
    const UserName = storedNickname ? storedNickname.replace(/['"]+/g, "") : "null";


    // 배포한 자신의 사이트
    const realUrl = `https://yumyumfriends.site/observation?SessionID=${ UserID }&HostInfo=${ UserName }`
    
    // 재랜더링시에 실행되게 해준다.
    useEffect(()=>{
        console.log('여기보세요')
        console.log(UserID)
        console.log(UserName)
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
                title: `${ UserName }이가 밥을 먹어요!`,
                description: `${ UserName }이 냠냠 보러오세요!`,
                imageUrl:
                'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
                link: {
                    mobileWebUrl: realUrl,
                },
            },
            buttons: [
                {
                    title: `${ UserName }이 냠냠 보러가기`,
                    link: {
                    mobileWebUrl: realUrl,
                    },
                },
                ],
            });
    }
        
    return (
        <div style={{ position: 'absolute', top: 0, right: 20, zIndex: 9999 }}>
          <button 
            className='grey-btn'
            onClick={() => {
              shareKakao();
            }}
          >
            참관 초대
          </button>
        </div>
      );
};

export default InvitationYum;