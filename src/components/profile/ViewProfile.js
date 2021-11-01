import React, { useEffect } from 'react';
import '../../styles/profile.css';
import toast, { Toaster } from 'react-hot-toast';

/**
 * ViewProfile react functional component to render user profile with user's data.
 */
function ViewProfile(props) {
  /**
   * Destructuring user data object which has avatar,firstName,phoneNumber,email,token,_id properties.
   */
  const {
    avatar,
    firstName,
    phoneNumber,
    email,
    token,
    _id
  } = props.userReducer.userData.results.user;
  /**
   * onLogout() helps to call logout function in actions.
   */
  function onLogout() {
    props.actions.logout(_id, token);
  }
  useEffect(() => {
    /**
     * checks isUserLoggedOut is true then it calls toaster and navigates to Landing Component.
     */
    if (props.userReducer.isUserLoggedOut) {
      toast.success('Logout Successfully');
      props.history.push('/landing');
    }
  }, [props.history, props.userReducer.isUserLoggedOut]);
  return (
    <div className='container'>
      <div className='section-box'>
        <div className='profile-box'>
          <button className='logout' onClick={onLogout}>
            logout
          </button>
          <img src={avatar} className='avatar' alt='Profile Pic' />
          <div className='user-details'>
            <label className='profile-label'>Name:</label>
            <p className='profile-text'>{firstName}</p>
          </div>
          <div className='user-details'>
            <label className='profile-label'>Phone Number:</label>
            <p className='profile-text'>{phoneNumber}</p>
          </div>
          <div className='user-details'>
            <label className='profile-label'>Email:</label>
            <p className='profile-text'>{email}</p>
          </div>
        </div>
        <Toaster position='bottom-center' />
      </div>
    </div>
  );
}

export default ViewProfile;
