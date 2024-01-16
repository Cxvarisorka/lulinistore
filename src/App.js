import React from "react";
import LandingPage from "./pages/LandingPage.js";
import CatalogPage from "./pages/CatalogPage.js";
import Nav from "./components/Nav/Nav.js";
import Footer from "./components/Footer/Footer.js";
import { Route,Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage.js";
import ContactPage from "./pages/ContactPage.js";

async function AccountsRequest(){
  try{
    const json = await fetch('http://127.0.0.1:5000/accounts');
    const data = await json.json();
    console.log(data)
  } catch(err){
    console.log(err)
  }
}

function App() {
  AccountsRequest();
  return (
    <>
      <Nav></Nav>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/catalog" element={<CatalogPage />}/>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
