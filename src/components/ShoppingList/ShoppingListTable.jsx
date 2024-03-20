import React, { Fragment, useEffect, useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { chemicalData } from "../../Data/Data";

import { Link, useNavigate } from "react-router-dom";
import {  fetchgetitemNeededShoping , STATUSES } from "../../redux/Slices/getItemNeeded";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Pagination from "../Pagination/Pagination";
import { DeleteShopinglistData } from "../../redux/postReducer/postShopingList";
import {  Checkbox } from 'antd';
import { UpdateItemNeedePostData } from "../../redux/postReducer/postItemNeeded";
import Loader from "../NoDataComponent/Loader";
import NoData from "../NoDataComponent/NoData";

export default function ShoppingListTable(tableData) {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { data: getitemNeededData, statusdata } = useSelector(
    (state) => state.getitemNeededData
  );
  const [checkNick, setCheckNick] = useState(false);

  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const paginate = (page) => setpage(page);

  const [isPurchased , setTableData] = useState(false)
  const [isbilled , setisbilled] = useState(false)


  useEffect(() => {
    dispatch(fetchgetitemNeededShoping({isPurchased,isbilled, page }));
  }, [dispatch, page]);

  useEffect(() => {
    setTotalPages(getitemNeededData.totalPages);
    setpostsPerPage(getitemNeededData.pagepage);
    settotalPost(getitemNeededData.totalCount);
  });

  const DeleteItemNeeded = async (id, key) => {
    await dispatch(DeleteShopinglistData({ id }));
    dispatch(fetchgetitemNeededShoping({ page }));
  };

  const UpdateItemNeeded  = async ( id) => {
    navigate(`/edit-shopping/${id}`)
  };

  
  if (statusdata === STATUSES.LOADING) {
    return (
      <Loader />
    );
  }

  if (statusdata === STATUSES.ERROR) {
    return (
      <h2
        style={{
          margin: "100px",
        }}
      >
        Something went wrong!
      </h2>
    );
  }


  const onCheckboxChange = async (e,data) => {
    const item_needed_id = data;
    setCheckNick(e.target.checked);
    const values = {
      isPurchased:e.target.checked
    }
    await dispatch(UpdateItemNeedePostData({  values , item_needed_id }));
    dispatch(fetchgetitemNeededShoping({ page }));
  };

  return (
    <Fragment>
      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
        {
              getitemNeededData?.items?.length == 0 ? <NoData /> : <table>
           
              <thead>
                <tr>
                  <th>Purchased</th>
                  <th>Name</th>
                  <th>Item Description</th>
                  <th>Added On</th>
                  <th>Price </th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
  
              <tbody>
                {getitemNeededData &&
                  getitemNeededData?.items?.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <Checkbox
                          checked={item.isPurchased}
                          onChange={(e) => {
                            onCheckboxChange(e, item._id);
                          }}
                        >
                          Is Purchased
                        </Checkbox>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
  
                      <td>{moment(item.createdAt).format("MMMM Do YYYY")}</td>
                      <td>{item.price}</td>
                      <td>
                        <Dropdown as={Nav.Item} className="notidrop">
                          <Dropdown.Toggle
                            data-toggle="dropdown"
                            id="dropdown-67443507"
                            variant="default"
                            className="m-0"
                          >
                            <img src={Noti} alt="boximg" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() =>
                                UpdateItemNeeded(item._id)
                              }
                            >
                              Edit
                            </Dropdown.Item>
                            
                            <Dropdown.Item
                              onClick={() =>
                                DeleteItemNeeded(item?._id)
                              }
                            >
                              {" "}
                              Delete{" "}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            }
          
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={page}
          />
        </div>
      </div>
    </Fragment>
  );
}
