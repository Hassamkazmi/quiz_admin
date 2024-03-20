import React, { Fragment , useState , useEffect } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { chemicalData } from "../../Data/Data";
import Pagination from "../Pagination/Pagination";
import { useDispatch } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import { fetchchemicalReport } from "../../redux/Slices/getchemicalReportSlice";
import { useSelector } from "react-redux";

export default function Chemicaltable() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (page) => setCurrentPage(page);

  const {data : chemicalReport , status} = useSelector((state) => state.chemicalReport)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchchemicalReport({currentPage}))
  } ,[dispatch,currentPage])

  useEffect(() => {
    setTotalPages(chemicalReport.totalPages);
    setpostsPerPage(chemicalReport.pageSize);
    settotalPost(chemicalReport.totalCount);
  },[chemicalReport]);

  

  return (
    <Fragment>
      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          <table>
            <thead>
              <tr>
                <th>Total</th>
                <th>Total </th>
                <th>%</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {chemicalReport?.items?.map((item , key) => (
                <tr>
                  {/* <td>12 May 2023</td> */}
                  <td>
                    <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                      <div>
                        <img
                          src={
                            chemicalData.image
                              ? chemicalData.image
                              : "../images/avatar.png"
                          }
                          alt="image"
                        />
                      </div>
                      <div>
                        <b>{item?.first_name + " " + item?.last_name}</b>
                      </div>
                    </div>
                  </td>
                  <td>{item?.TotalWaterBodies}</td>
                  <td>{item?.TotalPrice ? item?.TotalPrice : "0"}</td>
                  <td>{item?.TotalCost ? item?.TotalCost : "0"}</td>
                  <td>{item?.TotalProfit ? item?.TotalProfit : "0"}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </Fragment>
  );
}
