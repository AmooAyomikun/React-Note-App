import React from 'react'
import NoteCard from './NoteCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({notes, activeNoteId, searchQuery, onNewNote, onSelectNote, formatDate, onSearchChange}) => {
  return (
    <aside className='side-bar'>
      <div className="sidebar-header">
        <h1>My Notes</h1>
        <button onClick={onNewNote}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <div className="search-wrapper">
        <span className="search-icon"><FontAwesomeIcon icon={faSearch} /></span>
        <input type="text" placeholder="Search notes..." value={searchQuery}  onChange={(e) => onSearchChange(e.target.value)}/>
      </div>
      
      <div className="notes-list">
        {notes.length === 0 && <h1>No notes yet</h1>}
        {notes.length > 0 && searchQuery !== "" && <span>{notes.length} Notes </span>}
        {notes.map((note) => {
          return <NoteCard 
                    key={note.id}
                    note = {note} 
                    isActive = {note.id === activeNoteId} 
                    onSelect = {onSelectNote} 
                    formatDate = {formatDate}
                  />
        })}
      </div>
    </aside>
  )
}

export default Sidebar