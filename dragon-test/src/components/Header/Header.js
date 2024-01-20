import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from "./LogoutButton/LogoutButton";
import { images } from "./utils/ImgImports";
import "../Header/index.scss";


const Header = () => {
  const { isAuthenticated } = useAuth0();
  const { logoDragon } = images;

  return (
    isAuthenticated && (
      <div className="Header-main">
          <div className="Header-container">
              <div className="Header-logoDragon">
                  <picture>
                  <source media="(max-width: 600px)" srcSet={logoDragon.mobile} />
                  <img src={logoDragon.mobile} alt="Logo Dragon"  className="Header-Img" />
                  </picture>
              </div>
              <LogoutButton />
          </div>
      </div>
    )
  );
};

export default Header;
