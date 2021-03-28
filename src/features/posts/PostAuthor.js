import React from 'react'
import { useSelector } from 'react-redux'

export const PostAuthor = ({ userId }) => {
  const author = useSelector(state =>
    state.users.find(user => user._id === userId)
  )

  return <span>{author ? author.email : 'Unknown author'}</span>
}