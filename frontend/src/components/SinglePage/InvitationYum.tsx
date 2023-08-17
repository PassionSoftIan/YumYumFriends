import React, { useEffect } from "react";
import styles from "../styles/SinglePage/InvitationYum.module.css";

declare global {
  interface Window {
    Kakao: any;
  }
}

const InvitationYum: React.FC = () => {
  const UserID = localStorage.getItem("id");
  const storedNickname = localStorage.getItem("nickname");
  const UserName = storedNickname
    ? storedNickname.replace(/['"]+/g, "")
    : "null";
  const yumyum = localStorage.getItem("currentYum")

  // 배포한 자신의 사이트
  const realUrl = `https://yumyumfriends.site/observation?SessionID=${UserID}&HostInfo=${UserName}&yumyum=${yumyum}`;

  // 재랜더링시에 실행되게 해준다.
  useEffect(() => {
    // console.log('여기보세요')
    // console.log(UserID)
    // console.log(UserName)
    // init 해주기 전에 clean up 을 해준다.
    window.Kakao.cleanup();
    // 자신의 js 키를 넣어준다.
    window.Kakao.init("b7122629a0a31ceda48e9b68c1655d8d");
    // 잘 적용되면 true 를 뱉는다.
    console.log(window.Kakao.isInitialized());
  }, []);

  const shareKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${UserName}님의 냠냠 랜드로 초대!`,
        description: `${UserName}의 초대 링크로 냠냠 보러오세요!`,
        imageUrl:
          "",
        link: {
          mobileWebUrl: realUrl,
        },
      },
      buttons: [
        {
          title: `${UserName}이 냠냠 보러가기`,
          link: {
            mobileWebUrl: realUrl,
          },
        },
      ],
    });
  };

  return (
    <div className={styles["button-container"]}>
      <button
        className={styles["invitation-button"]}
        onClick={() => {
          shareKakao();
        }}
      >
        <p>초대하기</p>
        <img
          className={styles["kakao-icon"]}
          src={require(`../../assets/Common/kakao-talk.png`)}
          alt=""
        />
      </button>
    </div>
  );
};

export default InvitationYum;
