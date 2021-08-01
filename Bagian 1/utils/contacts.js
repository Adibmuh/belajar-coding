// semua yang berhubungan dengan pengelolaan data contact ada disini.

const fs = require('fs');

// membuat folder yang belum ada.
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath); 
}

// membuat file yang belum ada.
const filePath = './data/contacts.json';
if(!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
}


// mengambil semua contact yang ada di json
const loadContact = () => { // cara  mengambil data dari file contacts.json
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts =  JSON.parse(file); 
    return contacts;
};

// mencari contact berdasarkan nama

const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase() );
         return contact
};

module.exports = { loadContact, findContact };