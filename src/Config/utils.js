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

export const validateAvatarName = (firstName,lastName) => {
 if(typeof firstName === 'string' && typeof lastName === 'string'){
    let trimmedFirstName = firstName && firstName.trim() ;
    let trimmedLastName = lastName && lastName.trim();
    if(trimmedFirstName.length > 0 && trimmedLastName.length > 0){
        return (trimmedFirstName.charAt(0).toUpperCase() + trimmedLastName.charAt(0).toUpperCase());
    }else if(trimmedFirstName.length > 0 && trimmedLastName == ""){
         return (trimmedFirstName.charAt(0).toUpperCase() + trimmedLastName);
    }else if(trimmedFirstName == "" && trimmedLastName.length > 0){
         return (trimmedFirstName + trimmedLastName.charAt(0).toUpperCase());
    }else{
        return ""
    }
 }else{
     console.log("dasd");
     return
 }
}

export const getChangedFields=(original, updated)=>{
  const changed = {};

  Object.keys(updated).forEach((key) => {
    const originalValue = original[key];
    const updatedValue = updated[key];

    // Handle nested objects (like ticketDetail)
    if (
      typeof updatedValue === 'object' &&
      updatedValue !== null &&
      !Array.isArray(updatedValue)
    ) {
      const nestedDiff = getChangedFields(originalValue || {}, updatedValue);
      if (Object.keys(nestedDiff).length > 0) {
        changed[key] = nestedDiff;
      }
    }
    // Handle arrays (shallow compare)
    else if (Array.isArray(updatedValue)) {
      const originalArray = originalValue || [];
      // Simple array comparison — can be made more advanced if needed
      const arraysAreEqual =
        originalArray.length === updatedValue.length &&
        originalArray.every((val, index) => val === updatedValue[index]);

      if (!arraysAreEqual) {
        changed[key] = updatedValue;
      }
    }
    // Primitive values
    else {
      if (updatedValue !== originalValue) {
        changed[key] = updatedValue;
      }
    }
  });

  return changed;
}