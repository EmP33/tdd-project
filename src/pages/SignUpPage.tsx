import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export const lngs = {
  en: { nativeName: "English" },
  pl: { nativeName: "Polish" },
};

const SignUpPage = () => {
  const { t } = useTranslation();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [apiProgress, setApiProgress] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setApiProgress(true);
    const { username, email, password } = inputs;
    const body = { username, email, password };
    // axios.post("/api/1.0/users", body);
    fetch("/api/1.0/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSignUpSuccess(true);
  };

  return (
    <div className="col-lg-6 col-md-8 offset-lg-3 offset-md-2">
      <form className="card mt-5" onSubmit={handleSubmitForm}>
        <div className="card-header">
          <h1 className="text-center">{t("signUp")}</h1>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              {t("username")}
            </label>
            <input
              className="form-control"
              onChange={handleChange}
              name="username"
              id="username"
              placeholder={t("username")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              {t("email")}
            </label>
            <input
              className="form-control"
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder={t("email")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              {t("password")}
            </label>
            <input
              className="form-control"
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder={t("password")}
              value={inputs.password}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="repeatPassword" className="form-label">
              {t("passwordRepeat")}
            </label>
            <input
              className="form-control"
              onChange={handleChange}
              type="password"
              name="password-repeat"
              id="repeatPassword"
              placeholder={t("passwordRepeat")}
              value={inputs.repeatPassword}
            />
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary"
              disabled={
                inputs.password !== inputs.repeatPassword ||
                inputs.password === "" ||
                inputs.repeatPassword === "" ||
                apiProgress
              }
            >
              {apiProgress && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {t("signUp")}
            </button>
          </div>
        </div>
      </form>
      {signUpSuccess && (
        <div className="alert alert-success mt-3">
          Please check your email to activate your account
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
