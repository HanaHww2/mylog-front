import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import '../styles//components.css';
import Timer from './timer/Timer';

const Header = (props) => {
  return (
    <header className="nav-bar">
      <button
        className={`barBtn ${
          //props.unsigned ? 'unvisible' :
          props.visible ? 'unvisible' : 'show'
        }`}
        onClick={props.sidebarHandler}
      >
        <FaBars />
      </button>
      <ul className="">
        <li className="menu">
          <button>
            <Link to="/about">About</Link>
          </button>
        </li>
        <li className={`menu ${props.unsigned ? 'show' : 'hidden'}`}>
          <button onClick={props.signinModalHandler}>SingIn</button>
        </li>
        <li className={`menu ${props.unsigned ? 'hidden' : 'show'}`}>
          <button
          // onClick={}
          >
            UserInfo
          </button>
        </li>
        <li className="menu">
          <button>⏰</button>
          <Timer />
        </li>
      </ul>
    </header>
  );
};

export default Header;
