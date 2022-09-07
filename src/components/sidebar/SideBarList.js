import React from 'react';
import { useEffect } from 'react';
import SideBarSub from './SideBarSub';

const SideBarList = ({ boardList, checked }) => {
  useEffect(() => {
    // visitingBoard 라면 정보 조회 수행
    // uri 첫 pathvariable로 비교 수행
  }, [checked]);

  return (
    <div>
      <div>---myZone---</div>
      {boardList
        ? boardList.map((item, index) => {
            return <SideBarSub item={item} key={index} checked={checked} />;
          })
        : null}
      <div>---visiting---</div>
      {/* 타인의 보드 정보와 카테고리 정보 조회하는 api */}
    </div>
  );
};

export default SideBarList;
