export const validateEmail = (email) => {
  var regularExp= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regularExp.test(email);
};

export const checkPasswordComplexity = (pwd) => {
  var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*_])(?=.*[a-zA-Z]).{6,}$/;
  return regularExpression.test(pwd);
};

export const firstLastName = (flname)=>{
    var regularExpression = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/
    return regularExpression.test(flname)
}

export const validatePhoneNo = (phoneNo) => {
  var regularExpression = /^[6-9]\d{9}$/;
  return regularExpression.test(phoneNo);
};