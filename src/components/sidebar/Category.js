import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ categories, visible, isActive, boardId }) => {
  return (
    <div>
      {categories.map((item, index) => {
        return (
          <Link
            to={item.uri + '/list'}
            state={{ boardId: boardId, categoryId: item.id }}
            className={`sidebar-btn ${
              visible && isActive(0, item.id) ? 'active' : ''
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
