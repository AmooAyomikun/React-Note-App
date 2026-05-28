import React from 'react'

const NoteCard = ({note, isActive, onSelect, formatDate}) => {
  return (
    <div className={isActive ? "note-card active" : "note-card"}
      onClick={() => onSelect(note.id)}>
      <h1 className='note-title'>{note.title || "Untitled Note"}</h1>
      <p className='note-body'>{note.body || "No additional text"}</p>

      <div className="card-bottom">
        <p className='note-date'>
          {formatDate(note.updatedAt)}
        </p>

        <p className={note.tag === "work" 
                        ? "category work" 
                        : note.tag === "personal" 
                        ? "category personal"
                        : note.tag === "ideas" 
                        ? "category ideas"
                        : "category"
                      }
                        >{note.tag}
        </p>
      </div>
    </div>
  )
}

export default NoteCard