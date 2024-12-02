import './index.css'
import {Link} from 'react-router-dom'

const Course = props => {
  const {courseItem} = props
  const {id, name, logoUrl} = courseItem
  return (
    <Link to={`courses/${id}`} className="linkitem">
      <li className="course">
        <img src={logoUrl} alt={name} className="logo" />
        <p>{name}</p>
      </li>
    </Link>
  )
}
export default Course
