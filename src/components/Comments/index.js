import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    total: 0,
    name: '',
    description: '',
    commentsArr: [],
    time: new Date(),
  }

  toggleIsFavorite = value => {
    this.setState(prevState => ({
      commentsArr: prevState.commentsArr.map(ele => {
        if (ele.id === value) return {...ele, isLiked: !prevState.isLiked}
        return ele
      }),
    }))
  }

  onDeleteComment = value => {
    const {total, commentsArr} = this.state
    const filteredCommentsList = commentsArr.filter(ele => ele.id !== value)
    this.setState({
      total: total - 1,
      commentsArr: filteredCommentsList,
    })
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      commentsArr: prevState.commentsArr.map(eachContact => {
        if (id === eachContact.id) {
          return {...eachContact, isLiked: !eachContact.isLiked}
        }
        return eachContact
      }),
    }))
  }

  onEnterName = event => {
    this.setState({name: event.target.value})
  }

  onEnterDescription = event => {
    this.setState({description: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, description, time} = this.state
    const getTime = formatDistanceToNow(time)
    const getRandomBg =
      initialContainerBackgroundClassNames[
        Math.floor(
          Math.random(0, initialContainerBackgroundClassNames.length) * 10,
        )
      ]
    if (name !== '' && description !== '') {
      const commentObj = {
        id: uuidv4(),
        name,
        description,
        getTime,
        getRandomBg,
        isLiked: false,
      }
      this.setState(prevState => ({
        total: prevState.total + 1,
        name: '',
        description: '',
        commentsArr: [...prevState.commentsArr, commentObj],
        time,
      }))
    }
  }

  render() {
    const {total, name, description, commentsArr} = this.state
    return (
      <div className="bg">
        <div>
          <div className="flexi">
            <img
              className="commentsimage"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
            <div>
              <h1 className="heading">Comments</h1>
              <p>Say something about 4.0 Technologies</p>
              <form onSubmit={this.onAddComment}>
                <input
                  value={name}
                  onChange={this.onEnterName}
                  placeholder="Your Name"
                  type="text"
                  className="username"
                />
                <br />
                <textarea
                  value={description}
                  onChange={this.onEnterDescription}
                  placeholder="Your Comment"
                  rows="4"
                  cols="5"
                />
                <br />
                <button type="submit" className="button2">
                  Add Comment
                </button>
              </form>
            </div>
          </div>
          <hr className="line" />
          <p>
            <span className="tot-comment">{total}</span> Comments
          </p>
          <ul className="list-container">
            {commentsArr.map(ele => (
              <CommentItem
                key={ele.id}
                commentDetails={ele}
                onDeleteComment={this.onDeleteComment}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Comments
