import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import './UserProfileScreen.css';

const UserProfileScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const { userInfo } = userSignin;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile
    const dispatch = useDispatch();

    useEffect(() => {
        if(!user){
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(detailsUser(userInfo._id))
        } else {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);

        }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (event) => {
        event.preventDefault();
        // dispatch(updateProfile());
        if(password !== confirmPassword){
            alert('Password and Confirm Password do no match');
        } else {
            dispatch(updateUserProfile({ userId: user._id, firstName, lastName, email, password }))
        }
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
                    {loadingUpdate && <Loading />}
                    {errorUpdate && <MessageBox varient='danger'>{errorUpdate}</MessageBox>}
                    {successUpdate && <MessageBox varient='success'>Profile Updated Successfully</MessageBox>}
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                id='firstName' 
                                type="text" 
                                placeholder='Enter first name' 
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                id='lastName' 
                                type="text" 
                                placeholder='Enter last name' 
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input 
                                id='email' 
                                type="email" 
                                placeholder='Enter email' 
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input 
                                id='password' 
                                type="password" 
                                placeholder='Enter password'
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                id='confirmPassword' 
                                type="password" 
                                placeholder='Confirm Password'
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
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
