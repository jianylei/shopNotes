import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"

const NewNoteForm = ({ users }) => {
    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [userId, setUserId] = useState(users[0].id)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [titleValid, setTitleValid] = useState(true)
    const [textValid, setTextValid] = useState(true)

    useEffect(() => {
        if (isSuccess) {
            setUserId('')
            setTitle('')
            setText('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onUserIdChanged = e => setUserId(e.target.value)
    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)

    const canSave = [userId, title, text].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        setTitleValid(title ? true : false)
        setTextValid(text ? true : false)
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    const options = users.map(user => {
        if (user.active) {
            return (
                <option
                    key={user.id}
                    value={user.id}
                >
                    {user.username}
                </option>
            )
        } 
        return null
    })

    const errClass = isError ? "errmsg" : "offscreen"

    const titleBlurHanlde = () => {
        setTitleValid(title ? true : false)
    }

    const textBlurHanlde = () => {
        setTextValid(text ? true : false)
    }

    return (
        <form className="form" onSubmit={onSaveNoteClicked}>
            <p className={errClass}>{error?.data?.message}</p>
            <div className="form__title-row">
                <h2>New Note</h2>
            </div>
            <label className="form__label" htmlFor="title">
                Title:</label>
            <input
                className={titleValid ? 'form__input' 
                    : "form__input form__input--incomplete"}
                id="title"
                name="title"
                type="text"
                autoComplete="off"
                value={title}
                onChange={onTitleChanged}
                onBlur={titleBlurHanlde}
            />
            <label className="form__label" htmlFor="text">
                Text:</label>
            <textarea
                className={textValid ? 'form__input form__input--text validTextClass' 
                    : 'form__input form__input--text validTextClass form__input--incomplete'}
                id="text"
                name="text"
                value={text}
                onChange={onTextChanged}
                onBlur={textBlurHanlde}
            />
            <div className="form__select-container">
                <label className="form__label" htmlFor="username">
                    ASSIGNED TO:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>
            </div>
            <button className="form__submit-button">Add Note</button>
        </form>
    )
}

export default NewNoteForm