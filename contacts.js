import * as fs from 'fs/promises'
import * as path from 'path'
import shortid from 'shortid';
import createDirname from './lib/dirname.js'

const __dirname = createDirname(import.meta.url)

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

async function listContacts() {
  try {
      const data = await fs.readFile(contactsPath)
      const contacts = JSON.parse(data)
      console.log('Here is your contacts list')
      console.table(contacts)
  } catch (error) {
      console.log(error.message)
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath)
        const selectedContact = JSON.parse(data).find(({ id }) => id.toString() === contactId)
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
            console.log('Delete operation was successful')
            listContacts()
        } else {
            console.log(`Delete operation cannot be performed. There is no user with id ${contactId}`)
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
            console.log(`${newContact.name} has been added to your list`)
            console.table(newList)
        } else {
            console.log(`${newContact.name} is already in your contacts`)
        }
    } catch (error) {
        console.log(error.message)
    }
}
 
export {listContacts, getContactById, removeContact, addContact}