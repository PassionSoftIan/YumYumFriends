export interface Yum {
  id: number;
  name: string;
  type: string;
  personality: string; // 성격을 나타내는 속성 추가
  strengths: string; // 강점을 나타내는 속성 추가
}

const yums: Yum[] = [
  { id: 1, name: "1_tofu", type: "두부맨", personality: "용감하고 지혜로운 리더", strengths: "힘과 지혜를 갖추어 팀을 이끄는 능력, 신뢰받는 존재" },
  { id: 2, name: "2_mandarin", type: "귤걸", personality: "활기차고 쾌활한 탐험가", strengths: "민첩한 움직임, 기민한 상황 대처 능력" },
  { id: 3, name: "3_hamburger", type: "햄버거맨", personality: "힘과 건강을 상징하는 캐릭터", strengths: "강력한 근육과 끈질긴 인내력, 어려운 장애물을 넘어갈 수 있는 힘" },
  { id: 4, name: "4_icecream", type: "아이스크림맨", personality: "밝고 유쾌한 성격, 사랑과 즐거움을 전하는 역할", strengths: "마법 같은 아이스크림 기술, 어려운 상황을 해결하는 데 도움" },
  { id: 5, name: "5_radish", type: "무맨", personality: "무자비한 전투력과 용감한 마음을 가진 전사", strengths: "강력한 주먹으로 적을 제압하는 능력" },
  // 다른 캐릭터들도 personality와 strengths 속성을 포함시켜서 추가해주세요.
];

export default yums;
