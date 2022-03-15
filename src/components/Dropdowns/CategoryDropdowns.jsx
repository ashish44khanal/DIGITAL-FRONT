import React from "react";
import { Link } from "react-router-dom";

function CategoryDropdowns({ data }) {
  return (
    <div
      className="z-100 grid grid-cols-2 gap-8 font-light"
      style={{ maxWidth: "40rem" }}
    >
      {data.map((item) => (
        <div className="" key={item.id}>
          <Link to={`/search/${item.id}/${item.category}`}>
            {item.category}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoryDropdowns;
