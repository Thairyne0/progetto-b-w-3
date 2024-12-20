import FeedRecommendations from "../components/FeedRecommendations";
import MyFooter from "../components/MyFooter";
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
          <div className="row justify-content-center">
            <div className="d-none d-md-block col-3 mt-4">
              <UserProfile></UserProfile>
            </div>
            <div className="col-12 col-md-6">
              <NewsFeed></NewsFeed>
            </div>
            <div className="col-12 col-md-3 mt-4 flex justify-content-center">
              <FeedRecommendations></FeedRecommendations>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <MyFooter></MyFooter>
      </footer>
    </div>
  );
};

export default Homepage;
