// src/data/yums.ts

export interface Yum {
    id: number;
    name: string;
    type: string;
  }
  
  const yums: Yum[] = [
    { id: 1, name: "1_tofu", type: "두부맨" },
    { id: 2, name: "2_mandarin", type: "귤걸" },
    { id: 3, name: "3_hamburger", type: "햄버거맨" },
    { id: 4, name: "4_icecream", type: "아이스크림맨" },
    { id: 5, name: "5_radish", type: "무맨" },
  ];
  
  export default yums;
  