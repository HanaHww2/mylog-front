import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import '../../styles//components.css';
import '../../styles/sidebar.css';
import SideBarSub from './SideBarSub';
import SideBarData from '../../mock-data/SideBarData';
import { getBoardList } from '../../api/Api';
import SideBarList from './SideBarList';

const SideBar = (props) => {
  const [boardList, setBoardList] = useState([]);
  const [visitingBoard, setVisitingBoard] = useState([]);
  const [checked, setChecked] = useState('/');

  useEffect(() => {
    const getMenu = async () => {
      const result = await getBoardList();
      console.log(result);

      if (result.status === 200) {
        setBoardList(result.data);
      }
    };
    if (!props.unsigned) getMenu();
  }, [props.unsigned]);

  const handleChecked = () => {
    setChecked(window.location.pathname + window.location.search);
  };

  return (
    <div
      className={`sidebar flex-col ${
        // props.unsigned ? 'hidden' :
        props.visible ? 'show' : 'hidden'
      }`}
      onClick={handleChecked}
    >
      <div className="top">
        <div className="logo">
          <Link to="/">
            <span>🚀</span>
            <span>MyLog</span>
          </Link>
        </div>
        <button className="hideBtn" onClick={props.sidebarHandler}>
          <FaIcons.FaAngleDoubleLeft />
        </button>
      </div>

      <ul className="text-center sidebar-menu">
        <SideBarList boardList={boardList} checked={checked} />
      </ul>
    </div>
  );
};

export default SideBar;
