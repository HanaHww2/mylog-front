import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import '../../styles//components.css';
import '../../styles/sidebar.css';
import SideBarSub from './SideBarSub';
import SideBarData from '../../mock-data/SideBarData';
import { getBoardInfo, getBoardInfoByUri, getBoardList } from '../../api/Api';
import SideBarList from './SideBarList';

const SideBar = (props) => {
  const location = useLocation();
  // const pathId = { boardId: 0, categoryId: 0 };
  // const [boardId, setBoardId] = useState('');
  // const [categoryId, setCategoryId] = useState('');

  const [boardList, setBoardList] = useState([]);
  const [visitingBoard, setVisitingBoard] = useState(null);

  // 비로그인 혹은 권한이 없는 게시판 방문시 아이디로 정보 조회
  const getVisitingBoard = async (boardId) => {
    const boardInfo = await getBoardInfo(boardId);

    setVisitingBoard(boardInfo.data);
  };
  const getVisitingBoardByUri = async (uriArr) => {
    const boardInfo = await getBoardInfoByUri(uriArr);

    setVisitingBoard(boardInfo.data);
  };

  const checkBoard = (boardId) => {
    if (boardList.find((item) => item.id === boardId)) {
      setVisitingBoard(null);
    } else if (visitingBoard && visitingBoard.id === boardId) {
      // do nothing
    } else {
      getVisitingBoard(boardId);
    }
  };
  // uri로 페이지에 접근하는 경우에 대해서, 어떻게 처리하는지 확인해봐야 할 거 같다.
  // 상태값을 하나씩 설정해줘야 할 듯!
  const checkBoardByUri = (uriArr) => {
    console.log(uriArr);
    if (
      uriArr[1] !== '' &&
      boardList.find((item) => item.uri === uriArr[1]) &&
      visitingBoard &&
      visitingBoard.uri === uriArr[1]
    ) {
      setVisitingBoard(null);
      // setBoardId(curBoardId);
      // setCategoryId(location.state?.categoryId);
    } else if (visitingBoard && visitingBoard.uri === uriArr[1]) {
    } else {
      getVisitingBoardByUri(uriArr);
    }
  };

  useEffect(() => {
    const getMenu = async () => {
      const result = await getBoardList();

      if (result.status === 200) {
        setBoardList(result.data);
      }
    };

    if (!props.unsigned) getMenu();
    else setBoardList([]);
  }, [props.unsigned]);

  useEffect(() => {
    console.log(location);
    if (location.pathname === '/' || !location.pathname.startsWith('/@')) {
      setVisitingBoard(null);
      return;
    }

    if (!location.state) {
      const uriArr = location.pathname.split('/');
      checkBoardByUri(uriArr);
    }

    let curBoardId = location.state?.boardId;
    if (!curBoardId) curBoardId = location.state?.log.boardId;

    checkBoard(curBoardId);
  }, [location, props.unsigned]);

  return (
    <div
      className={`sidebar flex-col ${
        // props.unsigned ? 'hidden' :
        props.visible ? 'show' : 'hidden'
      }`}
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
        <SideBarList boardList={boardList} visitingBoard={visitingBoard} />
      </ul>
    </div>
  );
};

export default SideBar;
