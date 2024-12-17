import { useState } from "react";
import HeroSection from "../components/HeroSection";
import MyExperience from "../components/MyExperience";
import MyFooter from "../components/MyFooter";
import MyNewNavBar from "../components/MyNewNavBar";
import ContactsList from "../components/Sidebar";
import TokenProps from "../types/Hero";


const Profile = (props:TokenProps) => {
  const [profileData, setProfileData] = useState({
    name: "",
    surname: "",
    username: "",
    bio: "",
    title: "",
    area: "",
    image: "",
    _id:"",
  });
  const updateProfileData = (newData: Partial<typeof profileData>) => {
    setProfileData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <div>
      <header>
        <MyNewNavBar></MyNewNavBar>
      </header>
      <main>
        <div className="row justify-content-center align-items-top g-0">
          <div className="col-8 col-md-7">
            <HeroSection token={props.token} profileData={profileData} 
              updateProfileData={updateProfileData} />
            <MyExperience profilo={profileData}  token={props.token} />
          </div>
          <div className="col-8 col-md-3 mt-5">
            <ContactsList></ContactsList>
          </div>
        </div>
      </main>
      <footer>
        <MyFooter></MyFooter>
      </footer>
    </div>
  );
};

export default Profile;
