import React, {useState} from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useGlobalContext } from "./Context";
 const List = ( {removeItem, editItem})=> {
             
      const {busData} =useGlobalContext()

    return (
    <div>
{busData.map((mybus)=>{
    const{ id, bus, seats, price, to, from, time, date } = mybus;
    return (
    <article key={id}>
        <p>{bus}</p>
         <p>{seats}</p>
         <p>{from}</p>
         <p>{to}</p>
          <p>{price}</p>
           <p>{date}</p>
           <p>{time}</p>
        <div>
        <button onClick={()=> editItem(id)}>
            <FaEdit/>
        </button>
        <button onClick={() => removeItem(id)}>
            <FaTrash/>
        </button>


        </div>
    </article>
         
    )
})}
    </div>
    )
 }
  export default List;