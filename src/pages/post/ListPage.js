import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Pagenation from '../../components/post/Pagenation';
import PostItem from '../../components/post/PostItem';
import PostData from '../../mock-data/PostData';

const ListPage = () => {
  //const mockPost = PostData;
  const [logs, setLogs] = useState([]);
  const location = useLocation();
  console.log(location);

  const uriArr = location.pathname.split('/');
  const boardInfo = { boardName: uriArr[1], cateName: uriArr[2] };

  const contentHandler = (content) => {
    const dom = document.createElement('div');
    dom.innerHTML = content;
    const text = dom.innerText;
    return text;
  };

  useEffect(() => {
    console.log('hi');
    fetch('http://localhost:8080/api/v1/posts') // 보드별, 카테고리별 조회 필요
      .then((res) => res.json())
      .then((json) => {
        const result = json.data;
        const logs = result.map((item) => {
          item.plainContent = contentHandler(item.content);
          return item;
        });
        console.log(logs);
        setLogs(logs);
      });
  }, []);

  return (
    <div className="main-container">
      <div className="flex-row justify-end">
        <Link to="/edit" state={boardInfo}>
          <button>Add New</button>
        </Link>
      </div>
      <h2 className="flex-row justify-center mb-normal">
        {boardInfo.boardName} / {boardInfo.cateName}
      </h2>
      <div className="post-list-section">
        {logs.map((log) => (
          <PostItem key={log.id} log={log} boardName={boardInfo.boardName} />
        ))}
        <Pagenation />
      </div>
    </div>
  );
};

export default ListPage;
