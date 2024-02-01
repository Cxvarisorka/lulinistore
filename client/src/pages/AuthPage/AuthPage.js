import React from "react";
import Register from "../../components/Register/Register.js";
import Login from "../../components/Login/Login.js";
import PageHero from "../../components/PageHero/PageHero.js";

import './AuthPage.css';


function AuthPage(){
    return (
        <>
            <PageHero title={'Catalog'} from={{name:'Home',href:'/'}} to={{name:'Authentication',href:'/authentication'}}></PageHero>
            <div className="main-auth">
                <div className="auth">
                    <Login></Login>
                    <div className="hr-auth"></div>
                    <Register></Register>  
                </div>
                
            </div>
        </>
        
    )
}

export default AuthPage;