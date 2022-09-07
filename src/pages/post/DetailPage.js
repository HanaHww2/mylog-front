import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Comment from '../../components/post/Comment';
import PostDetail from '../../components/post/PostDetail';

const DetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //const [searchParams, setSearchParams] = useSearchParams();
  const postId = location.state?.id;
  const [log, setLog] = useState({});

  const contentHandler = (content) => {
    const dom = document.createElement('div');
    return dom;
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/posts/' + postId)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const result = json.data;
        const log = { ...result }; //, content: contentHandler(result.content) };

        setLog({ ...log });
        //setLogs(json.data);
      });
    //setLogs(mockPost);
  }, []);

  return (
    <div className="main-container">
      <div className="mb-normal">
        <h1>{log.title}</h1>
        <div className="sm-info mt-normal">
          <span>Author: {log.authorName}</span>
          <span>
            lastModified:{' '}
            {log.modifiedDate
              ? log.modifiedDate.replace('T', ' ').substring(0, 19)
              : null}
          </span>
        </div>
        <div className="mt-normal">
          <div dangerouslySetInnerHTML={{ __html: log.content }}></div>
        </div>
        {/* <PostDetail /> */}
        <div className="left-button-area">
          <button>삭제</button>
          <button>수정</button>
          <button onClick={() => navigate(-1)}>이전으로</button>
        </div>
      </div>
      <Comment />
    </div>
  );
};

export default DetailPage;