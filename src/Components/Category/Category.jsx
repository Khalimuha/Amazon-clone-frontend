import React from 'react'
import {categoryInfos} from "./CategoryFullInfo"
import CategoryCard from './CategoryCard'
import classes from "./category.module.css"

function Category(){
  return (
    
    <section className={classes.category_container}>  
     {
    categoryInfos.map((Infos)=>(
    <CategoryCard data ={Infos}/>
    
    ))
    }
    </section>
  
    
    
  )
}

export default Category