import React from 'react'
import PostIndex from './components/posts'

const  layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className='z-40'>{children}</div>
  )
}

export default layout