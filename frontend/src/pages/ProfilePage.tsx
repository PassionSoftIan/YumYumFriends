import React, { useState } from "react";
import "./styles/ProfilePage.css";
import yums, { Yum } from "../data/yums ";

const ProfilePage: React.FC = () => {
  // Assuming you have a state or variable that keeps track of acquired Yums' IDs
  const acquiredYumIds = [1, 2, 4]; // Example array of acquired Yum IDs

  // Find the acquired yums from the yums array
  const acquiredYums: Yum[] = yums.filter((yum) =>
    acquiredYumIds.includes(yum.id)
  );

  // State to keep track of the selected profile picture
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<
    string | null
  >(null);

  // State to control the visibility of the profile picture selection modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Function to handle profile picture selection
  const handleProfilePictureSelect = (yum: Yum) => {
    setSelectedProfilePicture(yum.name);
    setIsModalOpen(false); // Close the modal after selection
  };

  return (
    <div className="profile-container">
      <div className="profile-page">
        {/* 상단 배경 이미지 */}
        <div className="background-image" />

        {/* 프로필 사진 */}
        <div className="profile-picture" onClick={() => setIsModalOpen(true)}>
          {/* Display the selected profile picture */}
          {selectedProfilePicture ? (
            <img
              src={require(`../assets/StopYums/${selectedProfilePicture}.png`)}
              alt="Profile"
            />
          ) : (
            // If no picture is selected, display the first acquired Yum's picture
            acquiredYums.length > 0 && (
              <img
                src={require(`../assets/StopYums/${acquiredYums[0].name}.png`)}
                alt="Profile"
              />
            )
          )}
        </div>

        {/* 게시물, 팔로우, 팔로워 정보 */}
        <div className="profile-info">
          {/* Add the acquired yum count */}
          <div className="info-item">
            <span className="info-title">게시물</span>
            <span className="info-count">100</span>
          </div>
          <div className="info-item">
            <span className="info-title">팔로우</span>
            <span className="info-count">200</span>
          </div>
          <div className="info-item">
            <span className="info-title">팔로워</span>
            <span className="info-count">300</span>
          </div>
        </div>

        {/* Profile picture selection modal */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>프로필 사진 선택</h2>
              <div className="yum-list">
                {acquiredYums.map((yum: Yum) => (
                  <div
                    key={yum.id}
                    className={`yum-item${
                      selectedProfilePicture === yum.name ? " selected" : ""
                    }`}
                    onClick={() => handleProfilePictureSelect(yum)}
                  >
                    <img
                      src={require(`../assets/StopYums/${yum.name}.png`)}
                      alt={yum.name}
                    />
                  </div>
                ))}
              </div>
              <button onClick={() => setIsModalOpen(false)}>닫기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
