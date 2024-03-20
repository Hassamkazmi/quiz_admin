import React from "react";
import { Fragment } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchReadingCSVData } from "../../redux/Slices/getCSVData";
export default function ReadingHeader() {
  const { data: getAllreading } = useSelector((state) => state.getAllreading);

  const { data: getCSVData, isloading } = useSelector(
    (state) => state.getCSVData
  );
  const dispatch = useDispatch();

  const data = getCSVData ? getCSVData : [];

  const getCSVFunction = async () => {
    try {
      await dispatch(fetchReadingCSVData());
    } catch (error) {
      toast.error(error);
    }
  };
  console.log(data, "<=====data");
  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 equipmentssss">
          <h2>Readings</h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
          <button className="yellowbtn">
            <CSVLink data={data} onClick={() => getCSVFunction()}>
              Export
            </CSVLink>
          </button>
          <Link to="/add-readings">
            <button className="bluebtn">Add New</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
