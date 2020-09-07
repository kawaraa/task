import React, { useState } from "react";
import EditPassword from "./edit-password";
import config from "./config";
import "./profile.css";

const Profile = (props) => {
  const { errorMessages } = config;
  const [state, setState] = useState({ firstName: "", lastName: "", email: "", language: "" });
  const [editPassword, setEditPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w[a-zA-Z]{1,5})+$/;

  const saveChanges = ({ target: { name, value } }) => {
    if (name === "firstName") {
      if (value.length < 1) return setFirstNameError(errorMessages.required);
      else setFirstNameError("");
    } else if (name === "lastName") {
      if (value.length < 1) return setLastNameError(errorMessages.required);
      else setLastNameError("");
    } else if (name === "email") {
      if (value.length < 1) return setEmailError(errorMessages.required);
      else if (!emailValidation.test(value)) return setEmailError(errorMessages.email);
      else setEmailError("");
    }

    setState({ ...state, [name]: value });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000); // mocking the API request
  };

  const btn = (
    <button onClick={() => setEditPassword(true)} className="profile-btn change">
      Change Password
    </button>
  );

  return (
    <main className="profile-tab">
      <h4 className="user-data-heading">
        <span className="heading">User Data</span>
      </h4>
      {success && <span id="saved-label">Saved</span>}
      <div className="fields-wrapper">
        <div className="input-field">
          <label for="last-name">Last Name:</label>
          <input
            onChange={saveChanges}
            type="text"
            name="lastName"
            id="last-name"
            className={lastNameError ? "error" : ""}
          />
          {lastNameError && <span className="error-text">{lastNameError}</span>}
        </div>
        <div className="input-field">
          <label for="first-name">First Name:</label>
          <input
            onChange={saveChanges}
            type="text"
            name="firstName"
            id="first-name"
            className={firstNameError ? "error" : ""}
          />
          {firstNameError && <span className="error-text">{firstNameError}</span>}
        </div>
      </div>
      <div className="fields-wrapper">
        <div className="input-field">
          <label for="email" lassName="field-babel">
            Email:
          </label>
          <input
            onChange={saveChanges}
            type="email"
            name="email"
            placeholder="example@mail.com"
            id="email"
            className={emailError ? "error" : ""}
          />
          {emailError && <span className="error-text">{emailError}</span>}
        </div>
        <div className="input-field">
          <label for="language" className="field-babel">
            Language:
          </label>
          <input
            onChange={saveChanges}
            name="language"
            list="languages"
            id="language"
            defaultValue="English"
          />
          <datalist id="languages">
            <option value="english" />
            <option value="german" />
          </datalist>
        </div>
      </div>
      {editPassword ? <EditPassword setMode={(v) => setEditPassword(v)} /> : btn}
    </main>
  );
};

export default Profile;
