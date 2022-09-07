import React from 'react';
import { Link } from 'react-router-dom';

// categories.map((item, index) => {
//   return (
//     <Category
//       item={item}
//       index={index}
//       visible={subCateVis}
//       isActive={isActive}
//     />
//   );
// });
// 각 서브카테 탭 요소
const Category = ({ categories, visible, isActive }) => {
  return (
    <div>
      {categories.map((item, index) => {
        return (
          <Link
            to={item.uri + '/list'}
            className={`sidebar-btn ${
              visible && isActive(item.uri) ? 'active' : ''
            }`}
          >
            <div>
              <span>-</span>
              <span>{item.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
