import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import "./RegisterScreen.css";

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    if(password !== confirmPassword){
      alert('Password and Confirm Password do not match')
    } else{
      dispatch(register(name, email, password));
    }
    
  };

  useEffect(() => {
    if(userInfo){
      props.history.push(redirect)
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="registerScreen">
      <form className="registerScreen__form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {loading && <Loading />}
        {error && <MessageBox varient="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(event) => setName(event.target.value)}
          />
        </div>
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter password"
            required
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <div>
          <label />
          <button className='registerScreen__button' type='submit'>Register</button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?<Link to={`/signin?redirect=${redirect}`}>Go to Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
