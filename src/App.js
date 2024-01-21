import React, {useEffect} from "react";

// Components

import Nav from "./components/Nav/Nav.js";
import Footer from "./components/Footer/Footer.js";
import AnimatedRoutes from "./pages/AnimatedRoutes.js";

function App() {

  return (
    <>
      <Nav></Nav>
      <div>
        <AnimatedRoutes></AnimatedRoutes>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
