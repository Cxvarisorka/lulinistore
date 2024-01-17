import React from "react";
import Store from "../components/Store/Store.js";
import PageHero from "../components/PageHero/PageHero.js";

import {motion} from 'framer-motion'

function CatalogPage(){
    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <PageHero title={'Catalog'} from={{name:'Home',href:'/'}} to={{name:'Catalog',href:'/catalog'}}></PageHero>
            <Store></Store>
        </motion.div>
    )
}

export default CatalogPage;