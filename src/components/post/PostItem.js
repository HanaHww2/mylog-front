import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ log }) => {
  const {
    id,
    email,
    title,
    authorName,
    modifiedDate,
    plainContent,
    thumbnail,
  } = log;
  const path = `${log.boardUri}/${title}`;

  // useEffect(() => {
  //   plainContent = contentHandler(content);
  // }, [plainContent]);

  return (
    <Link
      to={path}
      state={{ log: log, boardId: log.boardId, categoryId: log.categoryId }}
      className="post-item flex-row"
    >
      <div>
        <img
          src={thumbnail ? thumbnail : 'favicon.ico'}
          alt=""
          height="128px"
          width="150px"
        />
      </div>
      <div className="ml-normal fill-flex-parent text-left">
        <div className="logItem-header">
          <h2>{title}</h2>
          <div className="sm-info mt-small">
            <span>Author</span>
            <span>{authorName}</span>
            <span>lastModified </span>
            <span>
              {modifiedDate
                ? modifiedDate.replace('T', ' ').substring(0, 16)
                : null}
            </span>
          </div>
        </div>
        <div className="logItem-body">
          <div>{plainContent}</div>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
