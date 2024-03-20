import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchgetitemNeededShoping } from "../../redux/Slices/getItemNeeded";
import { useState } from "react";

const ShoppingTabs = () => {

  const dispatch = useDispatch();
  // const [isPurchased , setTableData] = useState(false)
  // const [isbilled ,  ] = useState(true)
  const currentPage = 1;

  const handleCheck =  ()  => {
    const isPurchased = false;
    const isbilled = true;
      dispatch(fetchgetitemNeededShoping({isbilled,isPurchased, currentPage }));

  } 

  const handleCheck1 = async ()  => {
    const isPurchased = true;
    const isbilled = false;
    dispatch(fetchgetitemNeededShoping({isbilled,isPurchased, currentPage }));

  } 
 

  return (
    <div className="row shoppingTab">
      <button
        className="yellowbtn"
        onClick={() => handleCheck()}
      >
        Item Billed
      </button>

      <button
        className="yellowbtn"
        // value={true}
        onClick={() => handleCheck1()}
      >
        Purchased
      </button>
    </div>
  );
};

export default ShoppingTabs;
