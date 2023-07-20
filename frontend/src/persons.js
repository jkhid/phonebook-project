import App from "./App"
const Contacts = ({person, deleteContact}) => {
    return (
      <li>
        <span style={{marginRight:"4px"}}> {person.name} </span>
        <span style={{marginRight:"4px"}}> {person.number} </span>
        <button onClick={() => deleteContact(person.id)}>delete </button>
        </li>
    )
  }

const Persons = ({ filteredPersons, deleteContact}) => {
return(
    <div style={{listStyle:'none'}}>
        {filteredPersons.map(person => 
            <Contacts key={person.name} person={person} deleteContact={deleteContact}/>
        )}
    </div>
    )
}
export default Persons