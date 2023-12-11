import './index.css'

const CommentItem = props => {
  const {commentDetails, onDeleteComment, toggleIsFavorite} = props
  const {id, name, description, getTime, getRandomBg, isLiked} = commentDetails
  const onDelete = () => {
    onDeleteComment(id)
  }
  const onLike = () => {
    toggleIsFavorite(id)
  }
  const imageUrl =
    isLiked === false
      ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  return (
    <li className="list-container">
      <div className="user-container">
        <p className={`${getRandomBg} fllexi`}>{name[0].toUpperCase()}</p>
        <div>
          <p className="par">
            {name} <span className="par2">{getTime}</span>
          </p>
          <p>{description}</p>
        </div>
      </div>
      <div className="fllexi3">
        <button onClick={onLike} className="button fi" type="button">
          <img className="like-img" src={imageUrl} alt="like" />
          Like
        </button>
        <button
          onClick={onDelete}
          data-testid="delete"
          className="button"
          type="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
