import React from 'react'

const EmptyState = ({title, message, buttonText, onNewNote}) => {
  return (
    <div className='empty-state'>
      <h1>{title}</h1>
      <p>
        {message}
      </p>
      <button onClick={onNewNote}>{buttonText}</button>
    </div>
  )
}

export default EmptyState