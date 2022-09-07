import './App.css';
import './styles/common.css';

import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import EditPage from './pages/post/EditPage';
import MainPage from './pages/MainPage';
import DetailPage from './pages/post/DetailPage';
import JoinPage from './pages/user/JoinPage';
import AboutPage from './pages/AboutPage';
import ListPage from './pages/post/ListPage';

import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import SideBar from './components/sidebar/SideBar';
import { checkIfAccessTokenIsValid } from './api/Api';

function App() {
  let [unsigned, setUnsigned] = useState(true); // default true!
  let [sidebarVis, setSidebarVis] = useState(true);
  let [signinModalVis, setSigninModalVis] = useState(true);
  let [signupModalVis, setSignupModalVis] = useState(true);

  useEffect(() => {
    // async 한 번 씌우기
    const makeAsyncBlock = async () => {
      const result = await checkIfAccessTokenIsValid();
      if (result.status === 200) {
        setUnsigned(false);
      }
      console.log(result);
    };
    makeAsyncBlock();
  }, []);

  //  const toggleHandler = (toggleOption) => {};
  const sidebarHandler = () => setSidebarVis(!sidebarVis);
  const signinModalHandler = () => setSigninModalVis(!signinModalVis);
  const signupModalHandler = () => setSignupModalVis(!signinModalVis);

  return (
    <div className="App">
      <SideBar
        unsigned={unsigned}
        visible={sidebarVis}
        sidebarHandler={sidebarHandler}
      />
      <div className="main-section">
        <Header
          unsigned={unsigned}
          visible={sidebarVis}
          sidebarHandler={sidebarHandler}
          signinModalHandler={signinModalHandler}
        />
        <Signin
          setUnsigned={setUnsigned}
          visible={signinModalVis}
          signinModalHandler={signinModalHandler}
        />
        <Signup
          visible={signupModalVis}
          signinModalHandler={signupModalHandler}
        />
        <Routes>
          <Route path="/" exact={true} element={<MainPage />} />
          <Route path="/about" exact={true} element={<AboutPage />} />
          {/* <Route path="/joinus" exact={true} element={<JoinPage />} />
          <Route path="/signin" exact={true} element={<SigninPage />} /> */}
          <Route path="/edit" exact={true} element={<EditPage />} />
          <Route
            path="/:boardname/:categoryname/list"
            exact={true}
            element={<ListPage />}
          />
          <Route
            path="/:boardname/:postsname"
            exact={true}
            element={<DetailPage />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
export default App;