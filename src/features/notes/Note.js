import { useNavigate } from 'react-router-dom'
import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from "@fortawesome/free-solid-svg-icons"

const Note = ({ noteId }) => {
    const { note } = useGetNotesQuery('notesList', {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        })
    })

    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', 
            { day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' })

        const updated = new Date(note.updatedAt).toLocaleString('en-US', 
            { day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' })

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        const status = !note.completed ? '' : 'card--inactive'

        return (
            <div className={`note__container ${status}`} onClick={handleEdit}>
                <div className='note__container-top'>
                    <div>#{note.ticket}: {note.title}</div>
                    <span className={ note.completed
                        ? "note__status--completed"
                        : "note__status--open"
                    }>
                        <FontAwesomeIcon icon={faCircle} />
                    </span>
                </div>
                <div className='note__container-mid'>
                    Assigned: {note.username}
                </div>
                <div className='note__container-bottom'>
                    <div>Created:<br />{created}</div>
                    <div>Updated:<br />{updated}</div>
                </div>
            </div>
        )

    } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote