import './index.css'
import {Link} from 'react-router-dom'
const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
    </div>
  )
}

export default Header
