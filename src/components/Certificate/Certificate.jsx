import React from "react";
import certificate from "../../images/snvcertificate.jpg";

function Certificate({ name, course }) {
  return (
    <div>
      {name}
      <img src={certificate} alt="" />
    </div>
  );
}

export default Certificate;
