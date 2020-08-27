import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom'

class ListContacts extends Component{

  static propTypes = {
    contacts: propTypes.array.isRequired,
    onDeleteContact: propTypes.func.isRequired,
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  render() {
    const {query} = this.state;
    const {contacts, onDeleteContact} = this.props;

    const showingContacts = query === ''
    ? contacts
    : contacts.filter(x => x.name.toLowerCase().includes(query.toLowerCase()))

    return(
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input 
            className='search-contacts'
            type='text'
            placeholder='Search Contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link
            to='/create'
            className='add-contact'
          >AddContact</Link>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contacts.length}</span>
            <button onClick={() => this.clearQuery()}>Show all</button>
          </div>
        )}

        <ol className='contact-list'>
          {showingContacts.map(x => (
            <li key={x.id} className='contact-list-item'>
              <div 
                className='contact-avatar'
                style={{
                  backgroundImage: `url(${x.avatarURL})`
                }}>
              </div>
              <div className='contact-details'>
                <p>{x.name}</p>
                <p>{x.handle}</p>
              </div>
              <button onClick={() => onDeleteContact(x)} className='contact-remove'>
                Remove
              </button>
            </li>
            )
          )}
        </ol>
      </div>
    );
  }
}

export default ListContacts;