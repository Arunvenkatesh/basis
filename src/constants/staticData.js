//All Static Data stored in variable are exported from this file.
export const appJson = 'application/json';

//validateEmail() functions helps to check whether given string is email.
export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

//To avoid magic numbers in action file
export const httpStatusCode = {
  sucess: 200
};
