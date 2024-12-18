import { useState } from "react";
import HeroSection from "../components/HeroSection";
import MyExperience from "../components/MyExperience";
import MyFooter from "../components/MyFooter";
import MyNewNavBar from "../components/MyNewNavBar";
import ContactsList from "../components/Sidebar";
import TokenProps from "../types/Hero";
import { Container } from "react-bootstrap";

const Profile = (props: TokenProps) => {
  const [profileData, setProfileData] = useState({
    name: "",
    surname: "",
    username: "",
    bio: "",
    title: "",
    area: "",
    image: "",
    _id: "",
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
        <Container className="mt-2 mt-md-5">
          <div className="row justify-content-center align-items-top g-0">
            <div className="col col-12 col-md-8 col-lg-8 ">
              <HeroSection
                token={props.token}
                profileData={profileData}
                updateProfileData={updateProfileData}
              />
              <MyExperience profilo={profileData}  token={localStorage.getItem("userToken")} />
            </div>
            <div className=" col col-12 col-md-4 col-lg-4 mt-3">
              <ContactsList></ContactsList>
            </div>
          </div>
        </Container>
      </main>
      <footer>
        <MyFooter></MyFooter>
      </footer>
    </div>
  );
};

export default Profile;
