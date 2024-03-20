import React, { Fragment , useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { useNavigate } from "react-router-dom";
import { fetchgetWorkOrderType , STATUSES } from "../../redux/Slices/getWorkOrderType";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteworkOrderTypeSettingData } from "../../redux/postReducer/postWorkorderSetting";
import Pagination from "../Pagination/Pagination";
import DeleteModal from "../Modals/DeleteModal";
import Loader from "../NoDataComponent/Loader";
import NoData from "../NoDataComponent/NoData";
import { resetData } from "../../redux/postReducer/postWorkorderSetting";
import { toast } from "react-toastify";

export default function WorkOrderTypeTable() {
  const navigate = useNavigate();

  const { data: getWorkOrderType, statusdata } = useSelector(
    (state) => state.getWorkOrderType
  );

  const { error, success } = useSelector(
    (state) => state.postsworkOrderTypeSetting
  );

  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const paginate = (page) => setpage(page);
  const dispatch = useDispatch();

  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };
  const handleNavigate = async (id) => {
    await navigate("/edit-work-order-type", {
      state: {
        id: id,
      },
    });
  };

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

  useEffect(() => {
    setTotalPages(getWorkOrderType.totalPages);
    setpostsPerPage(getWorkOrderType.pageSize);
    settotalPost(getWorkOrderType.totalCount);
  });

  useEffect(() => {
    dispatch(fetchgetWorkOrderType({ page }));
  }, [dispatch, page]);

  const handleDelete = async (id) => {
    await dispatch(deleteworkOrderTypeSettingData({ id }));
    dispatch(fetchgetWorkOrderType({}));
  };

  if (statusdata === STATUSES.LOADING) {
    return <Loader />;
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
          {getWorkOrderType?.items?.length == 0 ? (
            <NoData />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>

                  <th>Description</th>

                  <th>Color</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {getWorkOrderType?.items?.map((item, i) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <input
                        type="color"
                        value={item.color_code}
                        readOnly
                        disabled
                      />
                    </td>

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
                          <Dropdown.Item onClick={() => handleNavigate(item)}>
                            Edit
                          </Dropdown.Item>

                          <Dropdown.Item
                            // onClick={() => handleDelete(item.work_order_type_id)}
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
          )}

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
