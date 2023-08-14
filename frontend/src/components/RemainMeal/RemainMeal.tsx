import React, { useEffect, useState } from "react";
import axios from "axios";

interface RemainMealProps {
  Meal: number | null;
  setMeal: React.Dispatch<React.SetStateAction<number | null>>;
}

const RemainMeal: React.FC<RemainMealProps> = ({ Meal, setMeal }) => {
  const UserID = localStorage.getItem("id");
  const UserName =
    localStorage.getItem("nickname")?.replace(/['"]+/g, "") || "";
  const URL = "https://yumyumfriends.site";
  //   const [data, setData] = useState(null);

  // 컴포넌트 마운트 될 때 데이터를 가져옵니다.
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${URL}/api/v1/user`, {
          params: { id: UserID },
        })
        .then((response) => {
          //   console.log(response.data.mealRemain);
          setMeal(response.data.mealRemain);
          localStorage.setItem("RemainMeal", response.data.mealRemain);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, [setMeal]);

  return (
    <div className="user-profile">
      <div className="user-nickname">
        <div className="icon-and-nickname">
          <span className="nick">
            <strong>{UserName}</strong>
          </span>
          {Meal !== null &&
            Array.from({ length: Meal }, (_, index) => (
              <span key={index} className="icon">
                🥄
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RemainMeal;
