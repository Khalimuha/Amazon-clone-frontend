
import classes from "./category.module.css"

function CategoryCard ({data}) {
  return (
    <div className ={classes.category}>
    <a href="">
     <span> 
      <h2>{data.title}</h2>
     </span>
     <img src= {data.imgLink} alt="Product image"/>
      <p> Shop now</p>

    </a>
  
    </div>
  )
}

export default CategoryCard