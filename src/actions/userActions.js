import axios from 'axios';
import { appJson, httpStatusCode } from '../constants/staticData';
import * as types from '../constants/actionTypes';
import * as API_END_POINTS from '../constants/apiEndpoints';

export function requestEmailVerifcation(email) {
  /**
   * requestEmailVerifcation() function helps to send otp to user's email
   * @param  {string} email - user's email id.
   * dispatch() - which helps to dispatch action object .action object conatins action type and payload.
   */
  return async dispatch => {
    try {
      const response = await axios.post(
        API_END_POINTS.REQUEST_EMAIL_VERIFICATION,
        { email: email },
        { headers: { Accept: appJson, 'Content-Type': appJson } }
      );
      if (response.status === httpStatusCode.sucess) {
        localStorage.setItem('userToken', response.data.results.token);
        dispatch({
          type: types.REQUEST_EMAIL_VERIFICATION,
          isRequestEmailVerifcationLoaded: true,
          requestEmailVerifcationData: response.data
        });
      } else {
        dispatch({
          type: types.REQUEST_EMAIL_VERIFICATION,
          isRequestEmailVerifcationLoaded: false
        });
      }
    } catch (err) {
      dispatch({
        type: types.REQUEST_EMAIL_VERIFICATION,
        isRequestEmailVerifcationLoaded: false
      });
    }
  };
}
export function resendToken(payload) {
  /**
   * resendToken() function helps to resend otp to user's email
   * @param  {object} payload -  object that should be passed with update request  which contains token,email.
   * dispatch() - which helps to dispatch action object .action object conatins action type and payload.
   */
  return async dispatch => {
    try {
      const response = await axios.put(API_END_POINTS.RESEND_OTP, payload, {
        headers: {
          Accept: appJson,
          'Content-Type': appJson
        }
      });
      if (response.status === httpStatusCode.sucess) {
        dispatch({
          type: types.RESEND_OTP,
          isOTPResent: true,
          resentResponse: response.data
        });
      } else {
        dispatch({
          type: types.RESEND_OTP,
          isOTPResent: false
        });
      }
    } catch (err) {
      dispatch({
        type: types.RESEND_OTP,
        isOTPResent: false
      });
    }
  };
}

export function verifyEmail(payload) {
  /**
   * verifyEmail() function helps to verify user's email
   * @param  {object} payload -  object that should be passed with update request  which contains token,email,otp.
   *  dispatch() - which helps to dispatch action object .action object conatins action type and payload.
   */
  return async dispatch => {
    try {
      const response = await axios.put(API_END_POINTS.VERIFY_EMAIL, payload, {
        headers: {
          Accept: appJson,
          'Content-Type': appJson
        }
      });
      if (response.status === httpStatusCode.sucess) {
        dispatch({
          type: types.VERIFY_EMAIL,
          isEmailVerifyLoaded: true,
          emailVerificationResponse: response.data
        });
      } else {
        dispatch({
          type: types.VERIFY_EMAIL,
          isEmailVerifyLoaded: false
        });
      }
    } catch (err) {
      dispatch({
        type: types.VERIFY_EMAIL,
        isEmailVerifyLoaded: false
      });
    }
  };
}

export function signup(payload) {
  /**
   * signup() function helps to verify user's email
   * @param  {object} payload -  object that should be passed with update request  which contains firstName,agreeToTerms,token,email,refrerral code.
   * dispatch() - which helps to dispatch action object .action object conatins action type and payload.
   */
  return async dispatch => {
    try {
      const response = await axios.post(API_END_POINTS.SIGN_UP, payload, {
        headers: {
          Accept: appJson,
          'Content-Type': appJson
        }
      });
      if (response.status === httpStatusCode.sucess) {
        dispatch({
          type: types.SIGN_UP,
          isUserLoaded: true,
          userData: response.data
        });
      } else {
        dispatch({
          type: types.SIGN_UP,
          isUserLoaded: false
        });
      }
    } catch (err) {
      dispatch({
        type: types.SIGN_UP,
        isUserLoaded: false
      });
    }
  };
}

export function logout(id, token) {
  /**
   * signup() function helps to logout user.
   * @param  {string} id - which helps to construct api url.
   * @param  {number} token - which helps to construct Bearer token.
   * dispatch() - which helps to dispatch action object .action object conatins action type and payload.
   */
  return async dispatch => {
    try {
      const response = await axios.delete(`${API_END_POINTS.LOG_OUT}/${id}`, {
        headers: {
          Accept: appJson,
          'Content-Type': appJson,
          Authorization: `Bearer ${id},${token}`
        }
      });
      if (response.status === httpStatusCode.sucess) {
        localStorage.removeItem('userToken');
        dispatch({
          type: types.LOG_OUT,
          isUserLoggedOut: true
        });
      } else {
        dispatch({
          type: types.LOG_OUT,
          isUserLoggedOut: false
        });
      }
    } catch (err) {
      dispatch({
        type: types.LOG_OUT,
        isUserLoggedOut: false
      });
    }
  };
}

export function checkReferralToken(referralCode) {
  /**
   * checkReferralToken() function helps to verify user's referal.
   * @param  {string} referralCode - which helps to construct api url.
   * dispatch() - which helps to dispatch action object .action object conatins action type and payload.
   */
  return async dispatch => {
    try {
      const response = await axios.get(`${API_END_POINTS.CHECK_REFERRAL_TOKEN}/${referralCode}`, {
        headers: {
          Accept: appJson,
          'Content-Type': appJson
        }
      });
      if (response.status === httpStatusCode.sucess) {
        dispatch({
          type: types.CHECK_REFERRAL_TOKEN,
          referralCodeVerified: response.data.success
        });
      } else {
        dispatch({
          type: types.CHECK_REFERRAL_TOKEN,
          referralCodeVerified: false
        });
      }
    } catch (err) {
      if (err && err.config) {
        dispatch({
          type: types.CHECK_REFERRAL_TOKEN,
          referralCodeVerified: false
        });
      }
    }
  };
}
