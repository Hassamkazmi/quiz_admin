import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Noti from "../../assets/img/more.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Dropdown, Nav } from "react-bootstrap";
import Pagination from "../Pagination/Pagination";
import { fetchTechnician ,STATUSES } from "../../redux/Slices/GetTechnician";
import {
  DeleteTechnicianData,
  resetData,
} from "../../redux/postReducer/postTechnician";
import DeleteModal from "../Modals/DeleteModal";
import Loader from '../NoDataComponent/Loader';



export default function CheckListTable() {
  const { data: Technician, status } = useSelector(
    (state) => state.Technician
  );
  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const paginate = (page) => setpage(page);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(resetData())
  // },[])
  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  useEffect(() => {
    dispatch(fetchTechnician({ page }));
  }, [dispatch, page]);

  const handleDelete = async (id) => {
    await dispatch(DeleteTechnicianData({ id }));
    dispatch(fetchTechnician({ page }));
    dispatch(resetData())
  };

  const handleEdit = async (id) => {
    navigate("/edit-user", {
      state: {
        id: id,
      },
    });
  };
  useEffect(() => {
    setTotalPages(Technician.totalPages);
    setpostsPerPage(Technician.pageSize);
    settotalPost(Technician.totalCount);
  });

  if (status === STATUSES.LOADING) {
    return (
      <Loader />
    );
  }

  if (status === STATUSES.ERROR) {
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
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {Technician?.items?.map((item, i) => (
                <tr key={i}>
                 
                  <td>{item.first_name}</td>
                  
                  <td>{item.email}</td>
                  <td>{item.user_type}</td>

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
                        {" "}
                        {/* <Link to="/edit-user"> Edit </Link> */}
                        {/* <Dropdown.Item onClick={() => handleEdit(item)}>  Edit </Dropdown.Item> */}
                        <Dropdown.Item onClick={() => handleEdit(item)}>
                          {" "}
                          Edit{" "}
                        </Dropdown.Item>
                        {/* <Dropdown.Item
                           
                          >
                            {" "}Update */}
                        {/* </Dropdown.Item> */}
                        <Dropdown.Item onClick={() => handleModal(item._id)}>
                          Delete{" "}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>

                  
                </tr>
              ))}
            </tbody>
          </table>
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
