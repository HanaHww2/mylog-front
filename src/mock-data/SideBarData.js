import React from 'react';
import * as RiIcons from 'react-icons/ri';
import * as IoIcons from 'react-icons/io';

const cateData2 = [
  {
    name: 'MyLog',
    uri: '/MyLog',
    icon: '🧭',
    iconOpened: <RiIcons.RiArrowDownSFill />,
    iconClosed: <RiIcons.RiArrowRightSFill />,

    subCate: [
      {
        title: 'cate1',
        path: '/MyLog?type=category&id=cate1',
        icon: '🚗',
      },
      {
        title: 'cate2',
        path: '/MyLog?type=category&id=cate2',
        icon: '🎶',
      },
    ],
  },

  {
    title: 'Team',
    path: '/Team',
    icon: '🌏',
    iconOpened: <RiIcons.RiArrowDownSFill />,
    iconClosed: <RiIcons.RiArrowRightSFill />,

    subCate: [
      {
        title: 'Reports',
        path: '/Team?type=category&id=repo1',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Reports 2',
        path: '/Team?type=category&id=repo2',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Reports 3',
        path: '/Team?type=category&id=repo3',
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: 'Messages',
    path: '/Messages',
    icon: '✉',
    iconOpened: <RiIcons.RiArrowDownSFill />,
    iconClosed: <RiIcons.RiArrowRightSFill />,

    subCate: [
      {
        title: 'Message 1',
        path: '/Messages?type=category&id=message1',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Message 2',
        path: '/Messages?type=category&id=message2',
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
  },
];

const SideBarData = () => {
  return cateData2;
};

export default SideBarData;
