import React,{useState,useEffect,memo} from "react";
import { Link } from "react-router-dom";
import './Cageories.css';


function CateDiv({category}){
    const [img,setImg] = useState({});

    const apiKey = `2F1TAudH5fPFbNptV1NSu7B90BC5m9fRLa3LkCF_8E4`;
    const apiUrl = `https://api.unsplash.com/search/photos?query=${category}&client_id=${apiKey}&w=1500&dpr=2`;

    useEffect(function(){
        fetch(apiUrl)
            .then(res => res.json())
            .then(function({results}){
                setImg(results)
            })
    }, []);

    const date = new Date();

    return (
        <div className="img-block">
            <img src={img[2]?.urls.raw} height={500} width={580} alt={category + ' Image'}/>
            <div className="overlay"></div>
            <div className="img-info">
                <p>{category}</p>
                <h2>{`${date.getFullYear()}/${Number(date.getFullYear()) + 1}`}</h2>
                <Link to="/catalog" className="btn-a-categories" aria-label="Shop Now">Shop Now</Link>
            </div>
        </div>
    )
}

function Categories(){
    const [cate, setCate] = useState([]);

    useEffect(function(){
        try{
            fetch('https://fakestoreapi.com/products/categories')
                .then(res => res.json())
                .then(data => {
                    let modData = [...data];
                    modData.splice(0,1);
                    setCate([...modData]);
                });
        } catch(err) {
            console.error(err)
        }
    }, []);

    return (
        <div className="main-categories">
            <div className="categories">
                {cate.map(function(elem,i){
                    return <CateDiv category={elem} key={i}></CateDiv>
                })}
            </div>
        </div>
    )
}

export default memo(Categories);