import React from 'react'

const NoteEditor = ({note, onUpdate, onDelete, formatLastEdited}) => {
  if (!note) {
    return null
  }
  return (
    <main className='note-editor'>
      <div className="toolbar">
        <button>B</button>
        <button>I</button>
        <button>U</button>

        <select
          value={note.tag}
          onChange={(e) => onUpdate(note.id, { tag: e.target.value })}
        >
          <option value="personal">Personal</option>
          <option value="ideas">Ideas</option>
          <option value="work">Work</option>
        </select>
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>

      <div className='editor-title'>
        <input type="text" placeholder="Note title..."  value={note.title} onChange={(e) => onUpdate(note.id, {title: e.target.value})}/>
        <p className="editor-meta">
          {formatLastEdited(note.updatedAt)} · {
            note.body
              .trim()
              .split(/\s+/)
              .filter(word => word !== "")
              .length
          } words
        </p>
        <textarea placeholder="Start writing your note..." value={note.body} onChange={(e) => onUpdate(note.id, {body: e.target.value})}></textarea>
        <footer>
          <span>
            {note.body
              .trim()
              .split(/\s+/)
              .filter((word) => {
                return word !== ""
              })
              .length
            } words
          </span>

          <span>{note.body.length} characters</span>

          <span>saved</span>
        </footer>
      </div>
    </main>
  )
}

export default NoteEditor