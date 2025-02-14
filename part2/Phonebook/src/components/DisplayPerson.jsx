const DisplayPerson = ({ persons, filter, displayFiltered }) => {
    return (
        <div>
            {filter === '' ?
                persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
                :
                displayFiltered.map(person => <div key={person.name}>{person.name} {person.number}</div>)
            }
        </div>
    )
}
export default DisplayPerson;