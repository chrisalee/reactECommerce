import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SigninScreen.css";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";

const SigninScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1] 
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    // todo: signin action
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="signinScreen">
      <form className="signinScreen__form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <Loading />}
        {error && <MessageBox varient="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="signinScreen__button" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to={`/register?redirect=${redirect}`}>Create</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SigninScreen;
