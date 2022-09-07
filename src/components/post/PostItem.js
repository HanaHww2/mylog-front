import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ log, boardName }) => {
  const {
    id,
    title,
    email,
    authorName,
    modifiedDate,
    plainContent,
    thumbnail,
  } = log;
  const path = `/${boardName ? boardName : log.boardName}/${title}`;

  // useEffect(() => {
  //   plainContent = contentHandler(content);
  // }, [plainContent]);
  return (
    <Link to={path} state={{ id: id }} className="post-item flex-row">
      <div>
        <img
          src={thumbnail ? thumbnail : 'favicon.ico'}
          alt=""
          height="128px"
          width="150px"
        />
      </div>
      <div className="ml-normal">
        <div className="logItem-header">
          <h2>{title}</h2>
          <div className="sm-info mt-normal">
            <span>Author: {authorName}</span>
            <span>
              lastModified:{' '}
              {modifiedDate
                ? modifiedDate.replace('T', ' ').substring(0, 19)
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
