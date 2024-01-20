import { images } from "./utils/ImgImports"
import { useAuth0 } from '@auth0/auth0-react'
import "../Banner/index.scss"

const Banner = () => {
  const { isAuthenticated } = useAuth0()
  const { logoDragon } = images
  return (
    isAuthenticated && (
      <div className="Banner-container">
        <div className="Banner-ImgBanner">
          <picture>
            <source media="(max-width: 600px)" srcSet={logoDragon.mobile} />
            <img src={logoDragon.default} alt="Logo Dragon" className="Banner-Img" />
          </picture>
        </div>
      </div>
    )
  )
};

export default Banner;
