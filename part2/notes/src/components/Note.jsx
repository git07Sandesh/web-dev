const Note = ({ note, toggleEvent }) => {
    const label = note.important ?
        'make not important' : 'make important'

    return (
        <li>
            {note.content}
            <button onClick={toggleEvent}>{label}</button>
        </li>

    )
}

export default Note