import { logRoles } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getData, getDataInSessionStorage, patchData } from '../../api/Api';
import Comment from '../../components/post/Comment';
import PostDetail from '../../components/post/PostDetail';

const DetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //const [searchParams, setSearchParams] = useSearchParams();
  //const postId = location.state?.id;
  const data = location.state?.log;

  console.log(data);
  const boardName = data.boardName;
  const [log, setLog] = useState(data);

  const checkBoardName = () => {
    getDataInSessionStorage('boardList');
  };

  const addPostReadingCount = async () => {
    console.log(data);
    const result = await getData(`/api/v1/posts/${data.id}/counting`);
    console.log(result);
  };
  useEffect(() => {
    const result = addPostReadingCount();
    console.log(result);
  }, []);

  return (
    <div className="main-container">
      <div className="mb-normal">
        <h1>{log.title}</h1>
        <div className="sm-info mt-normal">
          <span>Author {log.authorName}</span>
          <span>lastModified </span>
          <span>
            {log.modifiedDate
              ? log.modifiedDate.replace('T', ' ').substring(0, 16)
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
