import MyNewNavBar from "../components/MyNewNavBar";
import NewsFeed from "../components/NewsFeed";
import UserProfile from "../components/UserProfile";

const Homepage = () => {
  return (
    <div>
      <header>
        <MyNewNavBar></MyNewNavBar>
      </header>
      <main>
        <div className="container mt-3">
          <div className="row">
            <div className="col-3 mt-4">
              <UserProfile></UserProfile>
            </div>
            <div className="col-7">
              <NewsFeed></NewsFeed>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
