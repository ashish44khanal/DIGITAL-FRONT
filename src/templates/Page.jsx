import React from "react";
import Footer from "../components/PageEssentials/Footer";
import Nav from "../nav/Nav";

function Page(props) {
  return (
    <div>
      <Nav />
      {props.children}
      {/* footer  */}
      <Footer />
    </div>
  );
}

export default Page;
