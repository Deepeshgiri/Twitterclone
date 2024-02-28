import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { Row, Col } from "./components/styles/common";
import { Row, Col } from "antd";
const MenuBar = React.lazy(() => import("./components/menubar/index.js"));
const SignIn = React.lazy(() => import("./components/signin/index.js"));
const Home = React.lazy(() => import("./components/home/index.js"));
const Explore = React.lazy(() => import("./components/explore/index.js"));
const Notifications = React.lazy(() =>
  import("./components/notifications/index.js")
);
const Messages = React.lazy(() => import("./components/messages/index.js"));
const BookMarks = React.lazy(() => import("./components/bookmarks/index.js"));
const Lists = React.lazy(() => import("./components/lists/index.js"));
const Profile = React.lazy(() => import("./components/profile/index.js"));
const Tweet = React.lazy(() => import("./components/tweet/index.js"));
const Likes = React.lazy(() => import("./components/tweet/likes.js"));
const Retweet = React.lazy(() => import("./components/tweet/retweets.js"));
const SideBar = React.lazy(() => import("./components/sidebar/index.js"));
const PageNotFound = React.lazy(() => import("./components/pageNotFound.js"));
import PrivateRoute from "./privateRoute.js";

const Routes = () => {
  // const dispatch = useDispatch();
  // React.useEffect(() => {
  //   dispatch({ type: "SET_THEME", payload: "dark" });
  // }, []);
  const theme = useSelector((state) => state.theme);
  const withMenuBar = (WrappedComponent) => (props) => (
    <React.Fragment>
      <Row style={{ background: theme.bg }}>
        <Col lg={7} md={5} xs={5}>
          <MenuBar />
        </Col>
        <Col lg={9} md={19} xs={19}>
          <WrappedComponent />
        </Col>
        <Col lg={8} md={0} xs={0}>
          <SideBar />
        </Col>
      </Row>
    </React.Fragment>
  );

  const withLikeModal = (WrappedComponent) => (props) => (
    <React.Fragment>
      <Likes />
      <WrappedComponent />
    </React.Fragment>
  );

  const withRetweetModal = (WrappedComponent) => (props) => (
    <React.Fragment>
      <Retweet />
      <WrappedComponent />
    </React.Fragment>
  );

  const withOnlyMenuBar = (WrappedComponent) => (props) => (
    <Row>
      <Col md={7} xs={5}>
        <MenuBar />
      </Col>
      <Col md={17} xs={19}>
        <WrappedComponent />
      </Col>
    </Row>
  );

  return (
    <HashRouter>
      <Switch>
        <PrivateRoute exact path="/" component={SignIn} homeAuthenticated />
        <PrivateRoute exact path="/home" component={withMenuBar(Home)} />
        <Route path="/explore" component={withMenuBar(Explore)} />
        <PrivateRoute
          path="/notifications"
          component={withMenuBar(Notifications)}
        />
        <PrivateRoute path="/messages" component={withMenuBar(Messages)} />
        <PrivateRoute path="/bookmarks" component={withMenuBar(BookMarks)} />
        <PrivateRoute path="/lists" component={withMenuBar(Lists)} />
        <Route
          exact
          path="/profile/:username"
          component={withMenuBar(Profile)}
        />
        <Route
          path="/profile/:username/:activity"
          component={withMenuBar(Profile)}
        />
        <Route
          exact
          path="/:username/status/:tweetId"
          component={withMenuBar(Tweet)}
        />
        <Route
          path="/:username/status/:tweetId/likes"
          component={withMenuBar(withLikeModal(Tweet))}
        />
        <Route
          path="/:username/status/:tweetId/retweets"
          component={withMenuBar(withRetweetModal(Tweet))}
        />
        <Route component={withOnlyMenuBar(PageNotFound)} />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
