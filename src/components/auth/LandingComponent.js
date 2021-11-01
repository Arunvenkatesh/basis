import React, { useState, useEffect } from 'react';
import PrimaryHeader from '../common/PrimaryHeader';
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import toast, { Toaster } from 'react-hot-toast';
import { validateEmail } from '../../constants/staticData';
/**
 * Landing component allows user to enter email id and allows us to send otp to eamil.
 * It allows only new user to  navigates to verify otp component
 */
function LandingComponent(props) {
  /**
   * email which user's email id, setEmail allow us to set email when input changes.
   * otp which is used to otp string.
   * oldUser to find existing user.
   * isDisabled to disable state.
   * seconds for timer.
   */
  const [email, setEmail] = useState('');
  const [oldUser, setOldUser] = useState(false);
  const [isDisabled, setIsDsiabled] = useState(true);
  const { actions, userReducer, history } = props;
  /**
   * onEmailChange() helps to set email value to state and validate email.
   */
  function onEmailChange(eventObject) {
    setEmail(eventObject.target.value);
    if (validateEmail(eventObject.target.value)) {
      setIsDsiabled(false);
    }
  }
  /**
   * onVerifyClick() helps user to reuest top.
   * it vaildates email string and makes the request
   */
  function onVerifyClick() {
    if (validateEmail(email)) {
      actions.requestEmailVerifcation(email);
    }
  }
  useEffect(() => {
    if (userReducer.isRequestEmailVerifcationLoaded) {
      if (userReducer.isLogin !== true) {
        toast.success('Otp is sent Successfully');
        history.push('/verifyOTP', { email: email });
      } else {
        setOldUser(true);
      }
    }
  }, [email, history, userReducer.isLogin, userReducer.isRequestEmailVerifcationLoaded]);
  return (
    <div className='container'>
      <div className='section-box'>
        <div className='box'>
          <PrimaryHeader value={"Let's get started"} />
          <div className='u-disabled-textinput'>
            {oldUser && (
              <p className='primary-text'>Email already registered.Please try another.</p>
            )}
            <TextInput
              name='email'
              type='email'
              placeholder='Email ID'
              label='Email ID'
              isRequired={true}
              value={email}
              onTextChange={onEmailChange}
            />
          </div>
          <Button name='Get OTP' onButtonClick={onVerifyClick} disabled={isDisabled} />
        </div>
        <Toaster position='bottom-center' />
      </div>
    </div>
  );
}

export default LandingComponent;
