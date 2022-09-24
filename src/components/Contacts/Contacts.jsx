import React, { Component } from "react";
import contactsJSON from "../../contacts.json";
import "./Contacts.css";

const contactsStore = [...contactsJSON];

class Contacts extends Component {
  state = {
    contacts: contactsStore.splice(0, 5), // Quitamos los 5 primeros para que no se repitan, y encima splice me los devuelve!
    sortBy: null // null | popularity | name
  };

  addRandomContact = () => {
    const randomIndex = Math.floor(Math.random() * contactsStore.length)
    
    const newRandomContactArr = contactsStore.splice(randomIndex, 1) // splice no suele ser un buen metodo porque modifica el array original, pero en este caso nos va bien

    this.setState(prevState => ({ contacts: [...newRandomContactArr, ...prevState.contacts] }))
    // this.setState({ contacts: [...newRandomContactArr, ...this.state.contacts] })
  }

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }))

    // () => {  CODIGOS EQUIVALENTES
    //   return {

    //   }
    // }

    // () => ({ })
  }

  // sortByPopularity = () => {
  //   this.setState(prevState => {
  //     const newContacts = [...prevState.contacts] // clono para no tocar el estado original

  //     newContacts.sort((a, b) => b.popularity - a.popularity) // ordeno por popularidad

  //     return {
  //       contacts: newContacts // seteo el nuevo array ordenado
  //     }
  //   })
  // }

  sortByPopularity = (contacts) => {
    const newContacts = [...contacts]

    newContacts.sort((a, b) => b.popularity - a.popularity)

    return newContacts
  }

  sortByName = (contacts) => {
    const newContacts = [...contacts]

    newContacts.sort((a, b) => a.name.localeCompare(b.name))

    return newContacts
  }

  setSortBy = (event) => {
    const value = event.target.value // popularity || name

    // this.setState({ sortBy: value })
    this.setState(prevState => ({ sortBy: prevState.sortBy !== value ? value : null })) // si en el estado esta el valor que tiene el boton, lo paso a null para que desactive ese sortBy
  }

  contactsToRender = () => {
    const { contacts, sortBy } = this.state

    if (sortBy) {
      if (sortBy === 'popularity') {
        return this.sortByPopularity(contacts)
      } else if (sortBy === 'name') {
        return this.sortByName(contacts)
      }

      return contacts
    }

    return contacts
  }


  render() {
    const { sortBy } = this.state
    const contacts = this.contactsToRender()

    return (
      <div className="Contacts">
        <h1 className="text-center">Iron Contacts</h1>

        <div>
          <button
            className="btn btn-primary" onClick={this.addRandomContact}
            {...(contactsStore.length === 0 ? { disabled: true } : {})} // https://amberley.dev/blog/2020-09-07-conditionally-add-to-array-or-obj/#:~:text=To%20conditionally%20add%20a%20property,use%20of%20the%20%26%26%20operator.&text=In%20the%20example%20above%2C%20in,then%20spread%20into%20the%20object.
          >
            Add random contact
          </button>

          <button
            value="popularity"
            className={`btn btn-${sortBy === 'popularity' ? 'success' : 'primary'}`}
            onClick={this.setSortBy}
          >
            Sort by popularity
          </button>

          <button
            value="name"
            className={`btn btn-${sortBy === 'name' ? 'success' : 'primary'}`}
            onClick={this.setSortBy}
          >
            Sort by name
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Picture</th>
              <th scope="col">Name</th>
              <th scope="col">Popularity</th>
              <th scope="col">Won Oscar</th>
              <th scope="col">Won Emmy</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td className="align-middle">
                  <img src={contact.pictureUrl} alt={contact.name} height={60} />
                </td>
                <td className="align-middle">{contact.name}</td>
                <td className="align-middle">{contact.popularity.toFixed(2)}</td>
                <td className="align-middle">{contact.wonOscar ? '🏆' : '🤡'}</td>
                <td className="align-middle">{contact.wonEmmy ? '🏆' : '🤡'}</td>
                <td className="align-middle">
                  <button
                    className="btn btn-danger"
                    onClick={() => this.deleteContact(contact.id)}
                    >
                      Delete
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Contacts;
