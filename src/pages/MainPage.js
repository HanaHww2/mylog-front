import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPostListForMain } from '../api/Api';
import PostItem from '../components/post/PostItem';
import '../styles/components.css';
import ListPage from './post/ListPage';

const MainPage = () => {
  //const mockPost = PostData;
  const [logs, setLogs] = useState([]);

  const getMainPostList = async () => {
    const logs = await getPostListForMain();
    setLogs(logs);
  };

  useEffect(() => {
    getMainPostList();
  }, []);

  return (
    <div>
      <div className="main-container">
        <div>
          <h1>Hello, there!</h1>
          <section>
            안녕하세요! 여기는 myLog 입니다!😁 <br />
            아직 부족한 점이 많지만, 지속적으로 기능을 추가하고 리팩토링을
            수행하며 저만의 놀이터로 가꿔나갈 예정입니다!
          </section>
        </div>
        <div className="post-list-section text-center">
          <h3>인기 게시글</h3>
          {logs ? logs.map((log) => <PostItem key={log.id} log={log} />) : null}
        </div>
        <div className="post-list-section text-center">
          <h3>추천 블로그</h3>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
