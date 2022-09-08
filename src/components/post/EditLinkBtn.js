import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getDataInSessionStorage } from '../../api/Api';

const EditLinkBtn = () => {
  const location = useLocation();
  const boardList = getDataInSessionStorage('boardList');

  const checkPathId = () => {
    const pathId = {};
    pathId.boardId = location.state?.boardId;
    pathId.categoryId = location.state?.categoryId;

    if (!boardList.find((item) => item.id === pathId.boardId)) {
      pathId.boardId = 0;
      pathId.categoryId = 0;
    }
    console.log(pathId);
    return pathId;
  };

  const pathId = checkPathId();

  useEffect(() => {
    // if (!boardList.find((item) => item.id === pathId.boardId)) {
    //   pathId.boardId = 0;
    //   pathId.categoryId = 0;
    //   return;
    // }
    // pathId.boardId = location.state?.boardId;
    // pathId.categoryId = location.state?.categoryId;
  }, [location]);

  return (
    <button>
      <Link to="/edit" state={{ ...pathId }}>
        Add New
      </Link>
    </button>
  );
};

export default EditLinkBtn;
