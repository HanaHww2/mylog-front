import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';

import * as RiIcons from 'react-icons/ri';

const SideBarSub = ({ item, checked }) => {
  const [subCateVis, setSubCateVis] = useState(false);
  const iconOpened = () => {
    return <RiIcons.RiArrowDownSFill />;
  };
  const iconClosed = () => {
    return <RiIcons.RiArrowRightSFill />;
  };

  // 선택된 카테고리 탭의 css 변경
  function isActive(path) {
    return checked === path + '/all/list' || checked === path + '/list';
  }
  // 서브 카테의 드롭다운 기능
  const showSubCate = () => {
    setSubCateVis(!subCateVis);
  };

  return (
    <li className="">
      <div
        className={`flex-row sidebar-btn ${
          isActive(item.uri) ? 'clicked' : ''
        }`}
      >
        <div
          className="dropdown-arrow"
          onClick={item.categories && showSubCate}
        >
          {item.categories && subCateVis
            ? iconOpened()
            : item.categories
            ? iconClosed()
            : null}
        </div>
        <Link className="board" to={item.uri + '/all/list'}>
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
