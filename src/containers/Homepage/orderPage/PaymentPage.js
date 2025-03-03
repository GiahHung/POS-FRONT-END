import { Fragment, useEffect, useState } from "react";
import Header from "../../header/Header";
import "./PaymentPage.scss";
import { handlePayment } from "../../../services/userServices";
import { useLocation, useNavigate } from "react-router-dom";
import * as actions from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
function PaymentPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const arrPaymentRedux = useSelector((state) => state.admin.paymentId);
  const { order } = location.state || {};
  const [payment, setPayment] = useState([]);
  const [paymentId, setPaymentId] = useState("");
  const [customerChange, setCustomerChange] = useState(0);
  useEffect(() => {
    dispatch(actions.fetchPaymentId());
  }, [dispatch]);
  useEffect(() => {
    setPayment(arrPaymentRedux || []);
  }, [arrPaymentRedux]);
  const handleSelectPayment = (paymentId) => {
    setPaymentId(paymentId);
  };
  const handleBack = () => {
    navigate("/order", {
      state: {
        orderId: order.id,
      },
    });
  };
  const handleCompletePayment = async () => {
    const res = await handlePayment({ id: order.id, paymentId: paymentId,totalAmount:order.totalAmount });
    if(res && res.errCode === 0){
      navigate('/home-order')
    }else{
      alert(res.errMessage)
    }
  };
  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="content-top">
          <div className="row">
            <div className="col-4 d-flex justify-content-start">
              <button
                className="btn btn-secondary btn-back"
                onClick={handleBack}
              >
                <i class="fa-solid fa-arrow-left me-1"></i>Back
              </button>
            </div>
            <div className="col-4 d-flex justify-content-center">
              <span className="title">PAYMENT</span>
            </div>
            <div className="col-4 d-flex justify-content-end">
              <button
                className="btn btn-success btn-validate"
                disabled={paymentId === "" ? true : false}
                onClick={handleCompletePayment}
              >
                Validate<i class="fa-solid fa-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content-bottom">
          <div className="row">
            <div className="col-5 content-left">
              {payment &&
                payment.length > 0 &&
                payment.map((item, index) => {
                  return (
                    <button
                      className={
                        paymentId !== "" && paymentId === item.keyMap
                          ? "btn btn-secondary btn-is-payment"
                          : "btn btn-secondary btn-payment"
                      }
                      onClick={() => {
                        handleSelectPayment(item.keyMap);
                      }}
                      value={index}
                    >
                      {item.value}
                    </button>
                  );
                })}
            </div>
            <div className="col-7 content-right">
              <div className="row">
                {paymentId === "" ? (
                  <div className="col-12 total-amount">
                    <div className="number"> 0</div>
                    <div>please select a payment</div>
                  </div>
                ) : (
                  <div className="col-12 total-amount">
                    <div className="number">
                      {" "}
                      {Number(order.totalAmount).toLocaleString("vi-VN") + "đ"}
                    </div>
                    <div></div>
                  </div>
                )}
                <div className="col-5 change">
                  <input
                    type="number"
                    className="inp-number"
                    placeholder="Customer cash...."
                  />
                  <div className="change-number">
                    Change:{" "}
                    {Number(customerChange).toLocaleString("vi-VN") + "đ"}
                  </div>
                </div>
                <div className="col-5 customer-name">
                  <div className="row">
                    <div className="col-4 icon">
                      {" "}
                      <i class="fa-solid fa-user "></i>
                    </div>
                    <div className="col-8 d-flex justify-content-start customer">
                      {" "}
                      aaaaaaaaaaaaa
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PaymentPage;
