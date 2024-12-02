import {Component} from 'react'
import TailSpin from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}
class CourseItem extends Component {
  state = {apiStatus: apiConstants.initial, courseDetails: {}}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    this.setState({apiStatus: apiConstants.inProgress})
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const course = data.course_details
      const fetched = {
        id: course.id,
        name: course.name,
        imageUrl: course.image_url,
        description: course.description,
      }
      this.setState({apiStatus: apiConstants.success, courseDetails: fetched})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  successView = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <div className="course-detail">
        <img src={imageUrl} alt={name} className="detail-image" />
        <div className="descrption-container">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  onClickRetry = () => this.getCourseDetails()

  renderFailureView = () => {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button onClick={this.onClickRetry}>Retry</button>
      </div>
    )
  }

  renderLoading = () => {
    return (
      <div data-testid="loader" className="loader">
        <TailSpin
          height="80"
          width="80"
          color="#1e293b"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    )
  }

  renderCourseBody = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.successView()
      case apiConstants.inProgress:
        return this.renderLoading()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderCourseBody()}
      </div>
    )
  }
}

export default CourseItem
