import React from 'react';

const Comment = () => {
  return (
    <div className="mt-normal">
      --이하 Comments --
      <div className="comment-item">
        <div>작성자명 작성일시</div>
        <div>내용 mock comment</div>
        <div className="left-button-area">
          <button>수정</button>
          <button>답댓글?</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
