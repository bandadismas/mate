import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts } from './postsSlice'
import { Link } from 'react-router-dom'


export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  console.log(posts);

  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)


  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])


  return (
    <section>
      <h2>Posts</h2>
    </section>
  )
}

