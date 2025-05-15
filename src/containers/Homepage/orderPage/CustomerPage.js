import { Fragment, useEffect, useState } from "react";
import Header from "../../header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import {
  handleCreateCustomer,
  handleSelectCustomerService,
} from "../../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";

function CustomerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const arrCustomerRedux = useSelector((state) => state.user.customers);
  const currentOrder = useSelector((state) => state.user.order);
  const [arrCustomer, setArrCustomer] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
  });
  const [search, setSearch] = useState("");
  const { order } = location.state || {};
  useEffect(() => {
    dispatch(actions.fetchOneOrder(order.id));
    dispatch(actions.fetchAllCustomer("", "id", "asc"));
  }, [dispatch]);
  useEffect(() => {
    if (arrCustomerRedux && arrCustomerRedux.length > 0) {
      setArrCustomer(arrCustomerRedux);
    }
  }, [arrCustomerRedux]);
  const handleBack = () => {
    navigate("/order", {
      state: {
        orderId: order.id,
      },
    });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSave = async () => {
    try {
      if (formData.name == "" && formData.phone == "") {
        toast.error("Please fill in the customer's name and phone");
        return;
      } else {
        const res = await handleCreateCustomer({
          name: formData.name,
          phoneNumber: formData.phone,
        });
        if (res && res.errCode === 0) {
          dispatch(actions.fetchAllCustomer("", "id", "asc"));
        }
        setFormData({
          id: "",
          name: "",
          phone: "",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleClearState = () => {
    setFormData({
      id: "",
      name: "",
      phone: "",
    });
  };
  const handleClickCustomer = (customer) => {
    setFormData({
      id: customer.id,
      name: customer.name,
      phone: customer.phoneNumber,
    });
  };
  const handleSelectCustomer = async () => {
    if (formData.name == "" && formData.phone == "") {
      toast.error("Please select a customer");
      return;
    }
    try {
      const res = await handleSelectCustomerService(formData.id, order.id);
      if (res && res.errCode === 0) {
        navigate("/order", {
          state: {
            orderId: order.id,
          },
        });
        handleClearState();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeselectCustomer = () => {
    dispatch(actions.removeCustomerOrder(order.id));
  };
  console.log(formData);
  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="action mt-4 ">
          <div className="row">
            <div className="col-1">
              <button
                className="btn btn-secondary btn-back"
                onClick={handleBack}
              >
                {" "}
                <i class="fa-solid fa-arrow-left me-1"></i>Back
              </button>
            </div>
            <div className="col-3">
              <button
                onClick={() => {
                  currentOrder.customerName === ""
                    ? handleSelectCustomer()
                    : handleDeselectCustomer();
                }}
                class={
                  currentOrder.customerName !== "" || formData.name !== ""
                    ? "btn btn-success"
                    : "btn btn-secondary"
                }
              >
                {currentOrder.customerName !== "" ? (
                  <span>Deselect</span>
                ) : (
                  <span>Select customer</span>
                )}
              </button>
            </div>
            <div className="col-6">
              <input
                className="form-control rounded "
                type="number"
                placeholder="Enter phone number..."
              />
            </div>
            <div
              className="col-2 d-flex justify-content-end"
              data-bs-toggle="modal"
              data-bs-target="#OrderModal"
            >
              <button className="btn btn-secondary btn-back">Add new</button>
            </div>
          </div>
        </div>
        <div className="modal fade mt-5" id="OrderModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">ADD NEW CUSTOMER</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-2 form-group">
                  <label>Customer name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Customer name..."
                    value={formData.name}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-2 form-group">
                  <label>Phone number</label>
                  <input
                    type="number"
                    name="phone"
                    className="form-control"
                    placeholder="Phone number..."
                    value={formData.phone}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    handleClearState();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={"btn btn-success"}
                  onClick={handleSave}
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="customer mt-5"
          style={{ maxHeight: "600px", overflowY: "auto" }}
        >
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Phone number</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {arrCustomer &&
                arrCustomer.length > 0 &&
                arrCustomer.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        handleClickCustomer(item);
                      }}
                      class={
                        formData.name !== "" &&
                        formData.phone !== "" &&
                        formData.name === item.name &&
                        formData.phone === item.phoneNumber
                          ? "table-active"
                          : ""
                      }
                    >
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.loyaltyPoint}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default CustomerPage;
