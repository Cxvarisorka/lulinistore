import React from "react";

// Components

import Nav from "./components/Nav/Nav.js";
import Footer from "./components/Footer/Footer.js";
import AnimatedRoutes from "./pages/AnimatedRoutes.js";

function App() {

  return (
    <>
      <Nav></Nav>
      <main>
        <AnimatedRoutes></AnimatedRoutes>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
