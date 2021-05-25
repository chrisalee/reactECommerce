import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import './UserProfileScreen.css';

const UserProfileScreen = () => {
    const userSignin = useSelector(state => state.userSignin);
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const { userInfo } = userSignin;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsUser(userInfo._id))
    }, [dispatch, userInfo._id]);

    const submitHandler = (event) => {
        event.preventDefault();
        // dispatch(updateProfile());
    }

    return (
        <div className='userProfileScreen'>
            <form className="userProfileScreen__form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <Loading /> : error ? <MessageBox varient='danger'>{error}</MessageBox> : 
                    <>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <input id='firstName' type="text" placeholder='Enter first name' value={user.firstName}/>
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <input id='lastName' type="text" placeholder='Enter last name' value={user.lastName}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id='email' type="email" placeholder='Enter email' value={user.email}/>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id='password' type="password" placeholder='Enter password'/>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input id='confirmPassword' type="password" placeholder='Confirm Password'/>
                        </div>
                        <div>
                            <label/>
                            <button className='userProfileScreen__button' type='submit'>Update Information</button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}

export default UserProfileScreen;
