import React, { useContext, useState } from "react";
import config from "./config";
import "./edit-password.css";

const EditPassword = (props) => {
  const { errorMessages } = config;
  const [error, setError] = useState("");
  const [currentPsw, setCurrentPsw] = useState("");
  const [currentPswError, setCurrentPswError] = useState("");
  const [newPsw, setNewPsw] = useState("");
  const [newPswError, setNewPswError] = useState("");
  const inactive = currentPswError || newPswError ? true : false;

  const isValidatePsw = (psw) => {
    // Min 8 symbols, minimum 1 special characters, minimum 1 number, minimum 1 capital letter
    const pswValidator = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (psw.length < 8) return false;
    return pswValidator.test(psw);
  };

  const validatePsw = ({ target: { name, value } }) => {
    const validPsw = isValidatePsw(value);
    if (name === "currentPsw" && value.length < 1) return setCurrentPswError(errorMessages.required);
    else if (name === "newPsw" && value.length < 1) return setNewPswError(errorMessages.required);
    else if (name === "currentPsw" && !validPsw) return setCurrentPswError(errorMessages.passwordFormate);
    else if (name === "newPsw" && !validPsw) return setNewPswError(errorMessages.passwordFormate);
    if (name === "currentPsw" && validPsw) setCurrentPswError("") + setCurrentPsw(value);
    if (name === "newPsw" && validPsw) setNewPswError("") + setNewPsw(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // todo: send passwords to the server

    console.log(currentPsw, newPsw);
    props.setMode(false);
  };
  return (
    <form onChange={validatePsw} onSubmit={handleSubmit} className="edit-password-wrapper">
      <h4 className="user-data-heading">
        <span className="heading">Password</span>
      </h4>
      <div className="fields-wrapper">
        <div className="input-field">
          <label for="current-psw">Current Password:</label>
          <input
            type="password"
            name="currentPsw"
            id="current-psw"
            className={currentPswError ? "error" : ""}
          />
          {currentPswError && <span className="error-text">{currentPswError}</span>}
        </div>
        <div className="input-field">
          <label for="new-psw">New Password:</label>
          <input type="password" name="newPsw" id="new-psw" className={newPswError ? "error" : ""} />
          {newPswError && <span className="error-text">{newPswError}</span>}
        </div>
      </div>
      <button type="submit" className="profile-btn save" disabled={inactive}>
        Save Password
      </button>
    </form>
  );
};

export default EditPassword;
