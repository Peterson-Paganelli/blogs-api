const { name, email, password } = require('../../utils/joi');

const validateInputs = ({ displayName, emailSent, passwordSent }) => {
    const { error } = name.validate(displayName);
    console.log(error);
    if (error) {
      return { type: 400, 
      message: '"displayName" length must be at least 8 characters long' }; 
    }
    const { error } = email.validate(emailSent);
    if (errorEmail) {
        return { type: 400, 
        message: '"email" must be a valid email' }; 
      }
    const errorPwd = password.validate(passwordSent);
    if (errorPwd) {
        return { type: 400, 
        message: '"password" length must be at least 6 characters long' }; 
      }
};

module.exports = {
  validateInputs,
};