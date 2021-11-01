import * as types from '../constants/actionTypes';

/**
 * isLogin is a boolean property which helps to find out wheather user is already logged in.
 * isRequestEmailVerifcationLoaded is a boolean property which helps to find out wheather request for email verifcation returns success and returns data.
 * isEmailVerifyLoaded is a boolean property which helps to find out wheather request for email verifcation returns success and retuns data.
 * isEmailVerified is a boolean property which helps to find out wheather user email is verified.
 * isUserLoaded is a is a boolean property which helps to find out wheather request for user data is loaded.
 * userData is an object to store user data
 * isUserLoggedOut is a boolean property which helps to find out wheather user is already logged Out.
 * referralCodeVerified  is a boolean property which helps to find out wheather request for referal verifcation returns success and retuns data.
 */
const initialState = {
  isLogin: false,
  isRequestEmailVerifcationLoaded: false,
  isEmailVerifyLoaded: false,
  isEmailVerified: false,
  isUserLoaded: false,
  userData: {},
  isUserLoggedOut: false,
  referralCodeVerified: false
};
/**
 * @param  {} state=initialState object that contains all state variables used in our application
 * @param  {} action is an object that contains action type and the payloads that we passed in our action files
 * userSignIn() function uses switch to find out action type and returns modified object.
 */
export default function userSignIn(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_EMAIL_VERIFICATION: {
      if (action.isRequestEmailVerifcationLoaded) {
        return Object.assign({}, state, {
          isRequestEmailVerifcationLoaded: true,
          isOTPResent: false,
          isLogin: action.requestEmailVerifcationData.results.isLogin
        });
      } else {
        return Object.assign({}, state, { isRequestEmailVerifcationLoaded: false });
      }
    }
    case types.VERIFY_EMAIL: {
      if (action.isEmailVerifyLoaded) {
        return Object.assign({}, state, {
          isEmailVerifyLoaded: true,
          isEmailVerified: action.emailVerificationResponse.success,
          emailVerificationData: action.emailVerificationResponse,
          isRequestEmailVerifcationLoaded: false,
          isOTPResent: false
        });
      } else {
        return Object.assign({}, state, { isEmailVerifyLoaded: false });
      }
    }
    case types.RESEND_OTP: {
      if (action.isOTPResent) {
        return Object.assign({}, state, {
          isOTPResent: true,
          resentResponse: action.resentResponse,
          isRequestEmailVerifcationLoaded: false,
          isEmailVerifyLoaded: false
        });
      } else {
        return Object.assign({}, state, { isOTPResent: false });
      }
    }
    case types.SIGN_UP: {
      if (action.isUserLoaded) {
        return Object.assign({}, state, {
          isUserLoaded: action.isUserLoaded,
          userData: action.userData,
          referralCodeVerified: false,
          isUserLoggedOut: false
        });
      } else {
        return Object.assign({}, state, { isUserLoaded: false });
      }
    }
    case types.CHECK_REFERRAL_TOKEN: {
      if (action.referralCodeVerified) {
        return Object.assign({}, state, {
          referralCodeVerified: action.referralCodeVerified
        });
      } else {
        return Object.assign({}, state, { referralCodeVerified: false });
      }
    }
    case types.LOG_OUT: {
      if (action.isUserLoggedOut) {
        return Object.assign({}, state, {
          isUserLoggedOut: action.isUserLoggedOut,
          isLogin: false,
          isRequestEmailVerifcationLoaded: false,
          isEmailVerifyLoaded: false,
          isEmailVerified: false,
          isUserLoaded: false
        });
      } else {
        return Object.assign({}, state, { isUserLoggedOut: false });
      }
    }
    default:
      return state;
  }
}
