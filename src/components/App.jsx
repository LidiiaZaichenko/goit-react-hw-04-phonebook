import { useState, useEffect } from 'react';
import { PhonebookForm } from './PhonebookForm/PhonebookForm';
import { nanoid } from 'nanoid';
import { Contacts } from './Contacts/Contacts';
import { SearchBar } from './SearchBar/SearchBar';
import { Title } from './Title/Title';

const phoneContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) && phoneContacts;
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const dubleContact = contacts.find(
      item => item.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (dubleContact) {
      alert(newContact.name + ' is already in contacts');
    }
    return setContacts(prevState => [
      ...prevState,
      { ...newContact, id: nanoid() },
    ]);
  };

  const chengeContactFilter = newFilter => {
    setFilter(newFilter);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <>
      <Title title="Phonebook">
        <PhonebookForm onAdd={addContact} />
      </Title>

      <Title title="Contacts">
        <SearchBar filter={filter} onChengeContact={chengeContactFilter} />
        <Contacts
          listContacts={getVisibleContacts()}
          onDelete={deleteContact}
        />
      </Title>
    </>
  );
};
