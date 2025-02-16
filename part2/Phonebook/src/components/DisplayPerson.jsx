



const Display = ({ person, deletePerson }) => {
    const handleDelete = () => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            deletePerson(person.id);
        }
        else {
            console.log("Cancelled");
        }
    };
    return (
        <div key={person.name}>
            {person.name} {person.number}
            <button onClick={handleDelete}>delete</button>
        </div>
    )
}


const DisplayPerson = ({ persons, filter, displayFiltered, deletePerson }) => {
    return (
        <div>
            {filter === '' ?
                persons.map(person => <Display person={person} deletePerson={deletePerson} />)
                :
                displayFiltered.map(person => <Display person={person} deletePerson={deletePerson} />)
            }
        </div>
    )
}
export default DisplayPerson;