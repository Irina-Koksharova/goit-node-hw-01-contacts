import * as fs from 'fs/promises'
import * as path from 'path'
import shortid from 'shortid';

const contactsPath = path.join('db', 'contacts.json')

async function listContacts() {
  try {
      const data = await fs.readFile(contactsPath)
      const contacts = JSON.parse(data)
      contacts.length > 0
          ? console.table(contacts)
          : console.log('You have no contacts in your list')
  } catch (error) {
      console.log(error.message)
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath)
        const selectedContact = JSON.parse(data).find(({ id }) => id === contactId)
        selectedContact
            ? console.table(selectedContact)
            : console.log('You have no such contact')
    } catch (error) {
        console.log(error.message)
    }
}
  
async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath)
        const contacts = JSON.parse(data)
        if (contacts.find(({ id }) => id === contactId)) {
            const updatedContacts = contacts.filter(({ id }) => id !== contactId)
            await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2))
            console.log('This operation was successful')
        } else {
            console.log('This operation cannot be performed')
        }
    } catch (error) {
        console.log(error.message)
    }
}

async function addContact(name, email, phone) {
    const newContact = {
        id: shortid.generate(),
        name,
        email,
        phone
    }
    try {
        const data = await fs.readFile(contactsPath)
        const contacts = JSON.parse(data)
        const includesContact = contacts.some(({ name }) => name === newContact.name);
        if (!includesContact) {
            const newList = [...contacts, newContact]
            await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2))
            console.log(`Contact ${newContact.name} has been added to your list`)
            console.table(newList)
        } else {
            console.log(`${newContact.name} is already in your contacts`)
        }
    } catch (error) {
        console.log(error.message)
    }
}
 
export {listContacts, getContactById, removeContact, addContact}