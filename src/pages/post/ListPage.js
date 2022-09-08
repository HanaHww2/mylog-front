import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
  getMainPostList,
  getPostListBy,
  getPostListForMain,
} from '../../api/Api';
import Pagenation from '../../components/post/Pagenation';
import PostItem from '../../components/post/PostItem';
import PostData from '../../mock-data/PostData';

const ListPage = () => {
  //const mockPost = PostData;
  const location = useLocation();
  const [logs, setLogs] = useState([]);

  const uriArr = location.pathname.split('/');
  const searchParams = { firstUri: uriArr[1], secondUri: uriArr[2] };
  const boardInfo = { boardName: uriArr[1], cateName: uriArr[2] };
  const getPostList = async (searchParams) => {
    const logs = await getPostListBy(searchParams);
    setLogs(logs);
  };
  const getMainPostList = async () => {
    const logs = await getPostListForMain();
    setLogs(logs);
  };

  useEffect(() => {
    if (location.pathname === '/') return getMainPostList();
    if (location.state) {
      searchParams.boardId = location.state?.boardId;
      searchParams.categoryId = location.state?.categoryId;
    }
    getPostList(searchParams);
  }, [location]);

  return (
    <div className="main-container">
      <h2 className="flex-row justify-center mb-normal">
        {boardInfo.boardName}
        {boardInfo.cateName ? ` / ${boardInfo.cateName}` : null}
      </h2>
      <div className="post-list-section">
        {logs != []
          ? logs.map((log) => <PostItem key={log.id} log={log} />)
          : () => <p>게시물이 없습니다.</p>}
        <Pagenation />
      </div>
    </div>
  );
};

export default ListPage;
