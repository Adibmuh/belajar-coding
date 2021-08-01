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

// untuk menuliskan / menimpa data contacts.json dengan yang baru

const saveContacts = ( contacts ) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
};

// untuk menambahkan data contacts baru.

const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact); // cara menambahkan data baru
    saveContacts(contacts); // jika data sudah dtambahkan berati tinggal menimpa menggunakan saveContacts.
};

// cek nama yang duplikat.

const cekDuplikat = (nama) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama === nama); // jika tidak ada yang sama maka aman jika ada nanti akan di kirim ke duplikatyang ada di app.js
};


// hapus contact
 
const deleteContact = (nama) => {
    const contacts = loadContact();
    const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
    
    saveContacts(filteredContacts);  
};

// fungsi baru untuk mengubah contact.

const updateContacts = (contactBaru) => {
    const contacts = loadContact();
    // hilangkan contact lama yang namanya sama dengan oldName.
    const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldName );
    
    delete contactBaru.oldName; // cara menghapus properti dalam objek. dan sebelum masuk ke json oldName sudah tidak dibutuhkan lagi soalnya mau di timpa properti baru
    
    filteredContacts.push(contactBaru); // setelah selesai kita push
    
    saveContacts(filteredContacts); // lalu kita timpa yang ada di file json dengan contactBaru.
};

module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts};