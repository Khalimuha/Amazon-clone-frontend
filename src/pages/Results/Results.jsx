import React, { useEffect, useState } from 'react'
import classes from "./Results.module.css"
import LayOut from './../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from "axios"
import { productUrl} from '../../Api/endPoints';
import ProductCard from './../../Components/Product/ProductCard';


const Results = () => {
  const {categoryName}= useParams() 
  const [Results, setResults] = useState([])
  
  useEffect(()=>{

    axios.get(`${productUrl}/category/${categoryName}`)
    .then((res)=>{
      setResults(res.data)
    
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
      
    }) 
  

  },[])
   return (
     <LayOut>
       <section>
         <h1 style={{ padding: "30px" }}>Results</h1>
         <br />
         <p style={{ padding: "30px" }}>Category/{categoryName}</p>
         <br/>
 <div className={classes.products_conatiner}>
          {Results?.map((product)=>(
            <ProductCard key={product.id}
             renderAdd ={true} 
             product={product}
             />
          ))}
         </div>
 

       </section>

     </LayOut>
   );
}

export default Results