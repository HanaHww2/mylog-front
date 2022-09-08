import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Category from './Category';

import * as RiIcons from 'react-icons/ri';
import { useEffect } from 'react';

const SideBarSub = ({ item }) => {
  const location = useLocation();
  const [subCateVis, setSubCateVis] = useState(true);
  const iconOpened = () => {
    return <RiIcons.RiArrowDownSFill />;
  };
  const iconClosed = () => {
    return <RiIcons.RiArrowRightSFill />;
  };

  // 선택된 카테고리 탭의 css 변경
  function isActive(curBoardId, curCategoryId) {
    if (location.state && location.state.categoryId) {
      if (location.state.categoryId === curCategoryId) {
        setSubCateVis(true);
        return true;
      }
      return false;
    } else if (location.state && location.state.boardId)
      return location.state.boardId === curBoardId;
  }
  // 서브 카테의 드롭다운 기능
  const showSubCate = () => {
    setSubCateVis(!subCateVis);
  };

  return (
    <li className="">
      <div
        className={`flex-row sidebar-btn ${
          isActive(item.id, null) ? 'clicked' : ''
        }`}
      >
        <div
          className="dropdown-arrow"
          onClick={item.categories && showSubCate}
        >
          {subCateVis && item.categories
            ? iconOpened()
            : item.categories
            ? iconClosed()
            : null}
        </div>
        <Link
          className="board"
          to={item.uri}
          state={{ boardId: item.id, categoryId: null }}
        >
          <span>{item.icon}</span>
          <span>{item.name}</span>
        </Link>
      </div>

      <div className="subCate">
        {subCateVis && item.categories ? (
          <Category
            categories={item.categories}
            visible={subCateVis}
            isActive={isActive}
            boardId={item.id}
          />
        ) : null}
        <div
          className={`sidebar-btn add-new-btn ${
            subCateVis ? 'show' : 'hidden'
          }`}
        >
          <div>
            <span>+</span>
            <span>create new</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SideBarSub;
