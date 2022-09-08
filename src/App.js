import './App.css';
import './styles/common.css';

import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import EditPage from './pages/post/EditPage';
import MainPage from './pages/MainPage';
import DetailPage from './pages/post/DetailPage';
import AboutPage from './pages/AboutPage';
import ListPage from './pages/post/ListPage';
import Footer from './components/Footer';
import SideBar from './components/sidebar/SideBar';
import { checkIfAccessTokenIsValid } from './api/Api';
import Header from './pages/Header';

function App() {
  let [unsigned, setUnsigned] = useState(true); // default true!
  let [sidebarVis, setSidebarVis] = useState(true);

  useEffect(() => {
    // async 한 번 씌우기
    const makeAsyncBlock = async () => {
      const result = await checkIfAccessTokenIsValid();
      if (result && result.status === 200) {
        setUnsigned(false);
        return;
      }
      setUnsigned(true);
    };
    makeAsyncBlock();
  }, []);

  //  const toggleHandler = (toggleOption) => {};
  const sidebarHandler = () => setSidebarVis(!sidebarVis);

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
          sidebarVis={sidebarVis}
          setUnsigned={setUnsigned}
          sidebarHandler={sidebarHandler}
        />
        <Routes>
          <Route path="/" exact={true} element={<MainPage />} />
          <Route path="/about" exact={true} element={<AboutPage />} />
          <Route
            path="/edit"
            exact={true}
            element={<EditPage unsigned={unsigned} />}
          />
          <Route
            path="/:boardname/:categoryname/list"
            exact={true}
            element={<ListPage />}
          />
          <Route path="/:boardname" exact={true} element={<ListPage />} />
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
