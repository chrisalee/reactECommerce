import React, { useState } from "react";
import "./SigninScreen.css";
import { Link } from 'react-router-dom';

const SigninScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    // todo: signin action
  };

  return (
    <div className="signinScreen">
      <form className="signinScreen__form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
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
            <label />
            <button className='signinScreen__button' type='submit'>Sign In</button>
        </div>
        <div>
            <label />
            <div>
                New customer? { ' ' }
                <Link to='/register'>Create</Link>
            </div>
        </div>
      </form>
    </div>
  );
};

export default SigninScreen;
