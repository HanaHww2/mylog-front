import React from 'react';
import { useEffect } from 'react';
import SideBarSub from './SideBarSub';

const SideBarList = ({ boardList, visitingBoard }) => {
  return (
    <div>
      <hr className="pale-borderline" />
      <span className="pale-borderline-index">My Board</span>
      {boardList
        ? boardList.map((item, index) => {
            return <SideBarSub item={item} key={index} />;
          })
        : null}
      <hr className="pale-borderline" />
      <span className="pale-borderline-index">Visiting</span>
      {visitingBoard ? (
        <SideBarSub key={visitingBoard.id} item={visitingBoard} />
      ) : null}
    </div>
  );
};

export default SideBarList;
