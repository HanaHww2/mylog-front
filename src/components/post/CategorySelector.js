import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const CategorySelector = ({ categoryHandler, boardId, categoryId }) => {
  const boardRef = useRef();
  const categoryRef = useRef();
  const [categories, setCategoires] = useState([]);
  const boardList = JSON.parse(window.sessionStorage.getItem('boardList'));

  const getBoradNameAndCategories = (boardId) => {
    const temp = {};
    if (boardList) {
      const board = boardList.find((item) => item.id == boardId);
      setCategoires(board.categories);
      temp.categoryId = board.categories[0]?.id;
      temp.boardName = board.boardName;
    }
    return temp;
  };

  const getBoardName = (e) => {
    const idx = e.target.selectedIndex;
    const boardName = e.target[idx].text;
    return boardName;
  };
  const onChangeBoardId = (e) => {
    const boardId = e.target.value;
    const { categoryId, boardName } = getBoradNameAndCategories(boardId);

    categoryHandler(boardId, categoryId, boardName);
  };
  const onChangeCategoryId = (e) => {
    const boardId = boardRef.current.value;
    const categoryId = e.target.value;
    const boardName = getBoardName(e);

    categoryHandler(boardId, categoryId, boardName);
  };

  useEffect(() => {
    const boardId = boardRef.current.value;
    const { categoryId, boardName } = getBoradNameAndCategories(boardId);
    console.log(boardId, categoryId);

    categoryHandler(boardId, categoryId, boardName);
  }, []);

  return (
    <div className="flex-row mb-normal">
      <div>
        <select
          ref={boardRef}
          defaultValue={boardId}
          onChange={onChangeBoardId}
        >
          {boardList
            ? boardList.map((item) => {
                return <option value={item.id}>{item.name}</option>;
              })
            : null}
        </select>
      </div>
      <div>
        <select
          ref={categoryRef}
          defaultValue={categoryId ? categoryId : 0}
          onChange={onChangeCategoryId}
        >
          {categories != []
            ? categories.map((item) => {
                return <option value={item.id}>{item.name}</option>;
              })
            : () => {
                return `<option value>카테고리 없음</option>`;
              }}
        </select>
      </div>
    </div>
  );
};

export default CategorySelector;
