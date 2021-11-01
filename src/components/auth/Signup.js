import React, { useState, useEffect } from 'react';
import TextInput from '../common/TextInput';
import PrimaryHeader from '../common/PrimaryHeader';
import Button from '../common/Button';
import toast, { Toaster } from 'react-hot-toast';
import '../../styles/signup.css';

function Signup(props) {
  const [email] = useState(props.location.state.email);
  const [firstName, setFirstName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [agreeCheckbox, setAgreeCheckbox] = useState(false);
  const [referralCodeVerified, setreferralCodeVerified] = useState(false);
  function onfirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function onReferralCodeChange(e) {
    setReferralCode(e.target.value.toUpperCase());
  }
  function onSignUp() {
    const payload = {
      email: email,
      firstName: firstName,
      referredCodeKey: referralCode,
      agreeToPrivacyPolicy: agreeCheckbox,
      token: localStorage.getItem('userToken'),
      source: 'WEB_APP'
    };
    props.actions.signup(payload);
  }
  function onCheckboxChange(e) {
    setAgreeCheckbox(e.target.checked);
  }
  function verifyToken() {
    if (parseInt(referralCode.length, 10) === 6) {
      props.actions.checkReferralToken(referralCode);
    } else {
      toast.error('Referal token should be length of 6');
    }
  }
  useEffect(() => {
    if (props.userReducer.isUserLoaded) {
      toast.success('User Account Created Successfully');
      props.history.push('/user');
    }
    if (props.userReducer.referralCodeVerified) {
      setreferralCodeVerified(true);
    }
  }, [
    email,
    props.history,
    props.userReducer.isUserLoaded,
    props.userReducer.referralCodeVerified
  ]);
  return (
    <div className='container'>
      <div className='section-box'>
        <div className='box extra-dimensions'>
          <PrimaryHeader value={'Sign Up'} />
          <div className='form__group'>
            <TextInput
              name='email'
              type='email'
              placeholder='Email ID'
              label='Email ID'
              value={email}
              isDisabled={true}
            />
          </div>
          <div className='form__group'>
            <TextInput
              name='firstname'
              type='text'
              placeholder='First Name'
              label='First Name'
              isRequired={true}
              value={firstName}
              onTextChange={onfirstNameChange}
            />
          </div>
          <div className='form__group'>
            <TextInput
              name='referralCode'
              type='text'
              placeholder='Referal code'
              label='Referal code'
              value={referralCode}
              onTextChange={onReferralCodeChange}
              maxlength={'6'}
              isDisabled={referralCodeVerified}
            />
            {parseInt(referralCode.length, 10) === 6 && !referralCodeVerified && (
              <button className='verify-token' onClick={verifyToken}>
                Verify Token
              </button>
            )}
            {referralCodeVerified && (
              <p className='primary-text u-margin-left  u-color-green'>Referral code Verified</p>
            )}
          </div>

          <div className='u-display-flex'>
            <input
              type='checkbox'
              className={'agree-checkbox'}
              onChange={onCheckboxChange}
              checked={agreeCheckbox}
            />
            <p className='primary-text u-margin-left'>I agree to Terms</p>
          </div>
          <div className='form__group'>
            <Button name='Signup' onButtonClick={onSignUp} />
          </div>
        </div>
        <Toaster position='bottom-center' />
      </div>
    </div>
  );
}

export default Signup;
