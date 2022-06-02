import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import{motion} from "framer-motion";
import {Link, useParams} from "react-router-dom";



function Cuisine() {

    let params = useParams();
    const [cuisine, setCuisine] = useState([]);
    const getCuisine = async (name) => {
        const data = await fetch(`https://www.themealdb.com/api/json/v2/9973533//filter.php?a=${name}`) 
        const recipes = await data.json();
        setCuisine(recipes.meals);  
        
    }

    useEffect(()=>{
        getCuisine(params.type);
        console.log(params.type);
        console.log(cuisine);
    },[params.type])

  return (
      <Grid>{cuisine.map((item) => {
          return (
              <Card key={item.idMeal}>
                  <Link to={"/recipe/" + item.idMeal}>
                  <img src={item.strMealThumb} alt="" />
                  <h4>{item.strMeal}</h4>
                  </Link>
              </Card>
          )
      })

      }</Grid>
  )
}

const Grid= styled.div`
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;
const Card = styled.div`
    img{
        width: 100%;
        border-radius: 5px;
        border: 1px solid grey;
    }
    a{
        text-decoration: none;
    }
    h4{
        text-align:center;
        padding: 1rem;
    }
`

export default Cuisine