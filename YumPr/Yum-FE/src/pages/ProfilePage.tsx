import React from "react";
 // Replace this with your actual profile picture

const ProfilePage: React.FC = () => {
  // Replace the following with your actual profile data
  const userProfile = {
    name: "CollJH",
    age: 27,
    email: "coolJH@example.com",
    bio: "",
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>{userProfile.name}</h1>
        <img src={""} alt="Profile" />
      </div>
      <div className="profile-details">
        <p>Age: {userProfile.age}</p>
        <p>Email: {userProfile.email}</p>
        <p>Bio: {userProfile.bio}</p>
      </div>
      <div className="profile-buttons">
        <button>Edit Profile</button>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;
