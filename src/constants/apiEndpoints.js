//All API's  are exported from this file.
const BASE_URL = 'https://dev.getbasis.co/candidate';
export const REQUEST_EMAIL_VERIFICATION = `${BASE_URL}/users/email`;
export const VERIFY_EMAIL = `${BASE_URL}/users/email/verify`;
export const SIGN_UP = `${BASE_URL}/users`;
export const LOG_OUT = `${BASE_URL}/users/logout`;
export const RESEND_OTP = `${BASE_URL}/users/token/resendtoken`;
export const CHECK_REFERRAL_TOKEN = `${BASE_URL}/users/referral`;
