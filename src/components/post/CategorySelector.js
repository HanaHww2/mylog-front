import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const CategorySelector = ({ categoryHandler }) => {
  const boardRef = useRef();
  const categoryRef = useRef();
  const [categories, setCategoires] = useState([]);
  const boardList = JSON.parse(window.sessionStorage.getItem('boardList'));

  const getCategories = (boardId) => {
    let categoryId;
    if (boardList) {
      const board = boardList.find((item) => item.id == boardId);
      setCategoires(board.categories);
      categoryId = board.categories[0].id;
    }
    return categoryId;
  };
  const onChangeBoardId = (e) => {
    const boardId = e.target.value;
    const categoryId = getCategories(boardId);

    categoryHandler(boardId, categoryId);
  };
  const onChangeCategoryId = (e) => {
    const boardId = boardRef.current.value;
    const categoryId = e.target.value;
    categoryHandler(boardId, categoryId);
  };

  useEffect(() => {
    const boardId = boardRef.current.value;
    const categoryId = getCategories(boardId);
    console.log(boardId, categoryId);
    categoryHandler(boardId, categoryId);
  }, []);
  return (
    <div className="flex-row mb-normal">
      <div>
        <select ref={boardRef} onChange={onChangeBoardId}>
          {boardList
            ? boardList.map((item) => {
                return <option value={item.id}>{item.name}</option>;
              })
            : null}
        </select>
      </div>
      <div>
        <select ref={categoryRef} onChange={onChangeCategoryId}>
          {categories
            ? categories.map((item) => {
                return <option value={item.id}>{item.name}</option>;
              })
            : `<option value>카테고리 없음</option>`}
        </select>
      </div>
    </div>
  );
};

export default CategorySelector;
