import React, { useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import "./Login.scss";
import * as actions from "../../store/actions";
import { handleLoginService } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnchangeUsername = (e) => {
    setUserName(e.target.value);
  };
  const handleOnchangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await handleLoginService({
        userName: userName,
        password: password,
      });

      if (res && res.errCode === 0) {
        sessionStorage.setItem("accessToken", res.data.token);
        sessionStorage.setItem("refreshToken", res.data.refreshToken.token);
        dispatch(actions.userLoginSuccess(res));
        navigate("/home");
      } else {
        setError(res.errMessage);
      }
    } catch (error) {
      console.log("Error login", error);
      alert("Please login again!");
    }
  };
  return (
    <>
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1
                className="my-5 display-5 fw-bold ls-tight"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                The best offer <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>
                  for your business
                </span>
              </h1>
              <p
                className="mb-4 opacity-70"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Temporibus, expedita iusto veniam atque, magni tempora mollitia
                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                ab ipsum nisi dolorem modi. Quos?
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5 mt-2">
                  <div className="login " htmlFor="form3Example3">
                    LOGIN
                  </div>
                  <form onSubmit={handleLogin}>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example3"
                        className="form-control"
                        onChange={handleOnchangeUsername}
                      />
                      <label className="form-label" htmlFor="form3Example3">
                        User name
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control"
                        onChange={handleOnchangePassword}
                      />
                      <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                    </div>
                    <div className="error-message">{error}</div>
                    <div className="text-center d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary mb-2 btn-login"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
