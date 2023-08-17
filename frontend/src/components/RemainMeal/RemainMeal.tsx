import React, { useEffect } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${URL}/api/v1/user`, {
          params: { id: UserID },
        })
        .then((response) => {
          setMeal(response.data.mealRemain);
          localStorage.setItem("RemainMeal", response.data.mealRemain);
        })
        .catch((err) => console.log("err"));
    };

    fetchData();
  }, [setMeal]);

  return (
    <div className="user-profile">
      <div className="user-nickname">
        <div className="icon-and-nickname">
          <span className="nick">
            <strong style={{fontSize: 'x-large'}}>{UserName}</strong>
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
