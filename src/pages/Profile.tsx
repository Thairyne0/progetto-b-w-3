import HeroSection from "../components/HeroSection";
import MyFooter from "../components/MyFooter";
import MyNewNavBar from "../components/MyNewNavBar";
import ContactsList from "../components/Sidebar";

const Profile = () => {
  return (
    <div>
      <header>
        <MyNewNavBar></MyNewNavBar>
      </header>
      <main>
        <div className="row justify-content-center align-items-top g-0">
          <div className="col-8 col-md-7">
            <HeroSection></HeroSection>
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
