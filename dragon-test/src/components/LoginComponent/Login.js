import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { images } from "../../components/LoginComponent/utils/ImgImports";
import "./index.scss";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { logoDragon, logoTipo } = images;

  return (
    !isAuthenticated && (
      <div className="login-background">
        <div className="login-content">
          <div className="login-container">
            <picture>
              <source media="(max-width: 600px)" srcSet={logoDragon.mobile} />
              <img src={logoDragon.default} alt="Logo Dragon" className="login-ImageDesk" />
            </picture>
            <picture>
              <source media="(max-width: 600px)" srcSet={logoTipo.mobile} />
              <img src={logoTipo.default} alt="Logo Dragon" className="login-ImageLogotipoDesk" />
            </picture>
            <button
              className="login-button"
              onClick={() => loginWithRedirect()}
            >
              Faça Login
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default LoginButton;