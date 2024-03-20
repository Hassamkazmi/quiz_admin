import React, { Fragment } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { chemicalData } from "../../Data/Data";

import { fetchgetAllreading , STATUSES} from "../../redux/Slices/getAllReading";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { DeleteReadingDataData } from "../../redux/postReducer/postReadingData";
import { useNavigate } from "react-router-dom";
import Loader from "../NoDataComponent/Loader";
import NoData from "../NoDataComponent/NoData";
import DeleteModal from "../Modals/DeleteModal";


export default function Readingtable() {
  const navigate = useNavigate();

  const { data: getAllreading, statusdata } = useSelector(
    (state) => state.getAllreading
  );
  const { success, error } = useSelector((state) => state.postReading);
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState();

  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const paginate = (page) => setpage(page);

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await dispatch(DeleteReadingDataData({ id }));
    dispatch(fetchgetAllreading({ page }));
  };

  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  const handleEdit = async (id) => {
    navigate("/edit-readings", {
      state: {
        id: id,
      },
    });
  };

  useEffect(() => {
    dispatch(fetchgetAllreading({ page }));
  }, [page]);

  useEffect(() => {
    setTotalPages(getAllreading.totalPages);
    setpostsPerPage(getAllreading.pageSize);
    settotalPost(getAllreading.totalCount);
  });

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [success, error]);

    
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
  return (
    <Fragment>
      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          {
            getAllreading?.items?.length == 0 ? <NoData /> :     <table>
            <thead>
              <tr>
                <th>Name</th>

                <th>UOM</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {getAllreading?.items?.map((item, i) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item?.unit_of_measurement}</td>

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
                        <Dropdown.Item onClick={() => handleEdit(item)}>
                          Edit
                        </Dropdown.Item>
                        {/* <Dropdown.Item
                           
                          >
                            {" "}Update */}
                        {/* </Dropdown.Item> */}
                        <Dropdown.Item
                        onClick={() => handleModal(item._id)}
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
           <DeleteModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleDelete={handleDelete}
            id={id}
          />
        </div>
      </div>
    </Fragment>
  );
}
