import React, { useState, useEffect } from 'react';
import PrimaryHeader from '../common/PrimaryHeader';
import Button from '../common/Button';
import OtpInput from 'react-otp-input';
import toast, { Toaster } from 'react-hot-toast';
import '../../styles/otp.css';
/**
 * VerifyOTP component get otp as input from user and verify otp.
 * Allows us to resend otp.
 * if user resend otp 3 time or not verfied within 3 attempt then navigated to landing component.
 * if verified navigates to signup component
 */
function VerifyOTP(props) {
  /**
   * email which user's email id
   * otp which is used to otp string
   * isDisabled to disable state
   * seconds for timer
   */
  const [email] = useState(props.location.state.email);
  const [otp, setOtp] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [seconds, setSeconds] = React.useState(3);

  /**
   *
   * @param {string} otpText value of otp input
   * onOtpChange() sets otp text and set disabled state if length is equal to 6
   */
  function onOtpChange(otpText) {
    setOtp(otpText);
    if (parseInt(otpText.length, 10) === 6) {
      setIsDisabled(false);
    }
  }
  /**
   * onResendClick() function allows user to make resend otp request
   */
  function onResendClick() {
    let payload = {
      email: email,
      token: localStorage.getItem('userToken')
    };
    props.actions.resendToken(payload);
  }
  /**
   * onVerifyOTPClick() function allows user to verify otp.
   */
  function onVerifyOTPClick() {
    let payload = {
      email: email,
      token: localStorage.getItem('userToken'),
      verificationCode: otp
    };
    props.actions.verifyEmail(payload);
  }
  useEffect(() => {
    if (props.userReducer.isOTPResent) {
      toast.success('Otp is resent', {
        style: { width: '150px' },
        duration: 2000
      });
      setSeconds(3);
      if (!props.userReducer.resentResponse.results) {
        props.history.push('/landing');
      }
    }
  }, [props.history, props.userReducer.isOTPResent, props.userReducer.resentResponse]);

  useEffect(() => {
    if (props.userReducer.isEmailVerifyLoaded && props.userReducer.isEmailVerified) {
      toast.success('Otp is verified Successfully', { duration: 2000 });
      props.history.push('/signup', { email: email });
    }
    if (
      props.userReducer.emailVerificationData &&
      !props.userReducer.emailVerificationData.success &&
      !props.userReducer.isOTPResent
    ) {
      toast.error('Error! please enter valid otp', { duration: 2000 });
    }
    if (
      props.userReducer.emailVerificationData &&
      !props.userReducer.emailVerificationData.success
    ) {
      if (props.userReducer.emailVerificationData.messageObj.wrongEmailTokenCount === 3) {
        onVerifyOTPClick();
        toast.error('Token Expired!Start again', { duration: 2000 });
        props.history.push('/landing');
      }
    }
  }, [
    email,
    props.history,
    props.userReducer.isEmailVerified,
    props.userReducer.isEmailVerifyLoaded,
    props.userReducer.isOTPResent,
    props.userReducer.resentResponse,
    props.userReducer.emailVerificationData
  ]);
  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  });
  return (
    <div className='container'>
      <div className='section-box'>
        <div className='box'>
          <PrimaryHeader value={'Verify OTP'} />

          <div className='form__group'>
            <p className='primary-text'>
              Enter OTP send to <span className='u-bold-medium'>{email}</span>
            </p>
            <OtpInput
              value={otp}
              onChange={onOtpChange}
              numInputs={6}
              shouldAutoFocus={true}
              isInputNum={true}
              focusStyle={'otp__focus'}
              containerStyle={'otp__container'}
              inputStyle={'otp__input'}
            />
          </div>

          {seconds < 1 && (
            <div className='u-display-flex'>
              <p className='primary-text'>Din't receive otp?</p>
              <div className='resend' onClick={onResendClick}>
                Resend OTP
              </div>
            </div>
          )}
          {seconds > 1 && (
            <div className='u-display-flex'>
              <p className='primary-text'>Please try again after</p>
              <p className='primary-text u-color-green'>{`${seconds} seconds`} </p>
            </div>
          )}

          <Button name='Verify OTP' onButtonClick={onVerifyOTPClick} disabled={isDisabled} />
        </div>
        <Toaster position='bottom-center' />
      </div>
    </div>
  );
}

export default VerifyOTP;
