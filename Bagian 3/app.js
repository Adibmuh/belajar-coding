// menggunakan express

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require('./utils/contacts'); // cara memanggil function secara instan.
const { body, validationResult, check } = require('express-validator'); // body untuk menangkap apa yang sudah diisikan dalam form, sedangkan validationResult untuk menyimpan data validasinya.

// untuk menambahkan pesan saat contact sudah berhasil dibuat.
const session = require('express-session');
const cookieParse = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

//  Gunakan ejs.
app.set('view engine', 'ejs');

// Third-party Middleware
app.use(expressLayouts); // third-party ada di link expressJs.com

// Built-in Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Cara phars menggunakan middleware.
// extended agar tidak muncul deprecated saat menjalankan nodemon.


// konfigurasi flash.
app.use(cookieParse('secret'));
app.use(
    session({
        cookie: {maxAge: 6000},
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());


app.get('/', (req, res) => {
    // res.sendFile('./index.html', { root: __dirname }); // untuk mengambil file dari directory yang sama, {root: __dirname} => adalah directory tempat filePath nya berada
    const mahasiswa = [ // length di index untuk menentukan ada tidaknya array, dan di eksekusi jika arraynya kosong
        {
            nama: 'Muhammad Adib',
            email: 'adib@gmail.com',
        },

        {
            nama: 'Aiysah',
            email: 'aisyah@gmail.com',
        },
        
        {
            nama: 'Muhammad',
            email: 'muhammad@gmail.com',
        },
    ];

    res.render('index', { 
        nama : 'Muhammad Adib', 
        title : 'Halaman Home', 
        mahasiswa,
        layout: 'layouts/main-layout',
    }); // cara mengambil syntax dari index ke app. 
});

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'Halaman About',
        layout: 'layouts/main-layout',
    }); // cara prnggunaan layout
});

// cara mengirim file contact yang ada di file json.
app.get('/contact', (req, res) => {
    const contacts = loadContact(); // cara mengambil dalam file json.

    res.render('contact', { 
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
        contacts,
        msg: req.flash('msg'),
    });
});

// Halaman form tambah data contact.
app.get('/contact/add', (req, res) => {  
    res.render('add-contact', {
        title: 'Tambah Data Contact',
        layout: 'layouts/main-layout',
    });
});

// proses data contact
app.post('/contact',

[
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value);
        if (duplikat) {
            throw new Error('Nama contact sudah ada!');
        };

        return true;
    }),
    check('email', 'Email tidak valid!').isEmail(), // menggunakan check jangan lupa dipanggil dulu di express.
    check('nohp', 'Nomor HP tidak valid!').isMobilePhone('id-ID'),

], (req, res) => { // jangan lupa data harus di phars terlebih dahulu, caranya menggunakan middleware.
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        res.render('add-contact', {
            title: 'Tambah Data contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
        });
        // return res.status(400).json({ errors: errors.array()});
    } else {
        addContact(req.body); // bisa melakukan redirect

        // kirimkan flash message.
        req.flash('msg', 'Data Contact Berhasil Ditambahkan!')

        res.redirect('/contact'); // jika melakukan seperti ini maka method yang menangani ini bukan lagi post tapi get jadi akan kembali kehalaman contact
    };
});

// proses delete contact.
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    // jika contact tidak ada.
    if (!contact) {
        res.status(404);
        res.send('<h1>404</h1>');
    } else {
        deleteContact(req.params.nama);
        req.flash('msg', 'Data Contact Berhasil Dihapus!');
        
        res.redirect('/contact'); 
    };

});


// Halaman form Ubah data contact.
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('edit-contact', {
        title: 'Ubah Data Contact',
        layout: 'layouts/main-layout',  
        contact,
    });
});

// proses ubah data.
app.post(
    '/contact/update',

 [
    body('nama').custom((value, { req }) => { // agar bisa mengakses req kita harus kirim menjadi parameter didalam validasinya. Caranya, kirim menjadi objek dalam parameternya
        const duplikat = cekDuplikat(value);
        if (value !== req.body.oldName && duplikat) {
            throw new Error('Nama contact sudah ada!');
        };

        return true;
    }),
    check('email', 'Email tidak valid!').isEmail(), // menggunakan check jangan lupa dipanggil dulu di express.
    check('nohp', 'Nomor HP tidak valid!').isMobilePhone('id-ID'),

 ],
 (req, res) => { // jangan lupa data harus di phars terlebih dahulu, caranya menggunakan middleware.
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        res.render('edit-contact', {
            title: 'Ubah Data contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
            contact: req.body,
        });
    } else {
        updateContacts(req.body); 
        req.flash('msg', 'Data Contact Berhasil DiUbah!')
        res.redirect('/contact');
    };
});

// Halaman detail contact.
app.get('/contact/:nama', (req, res) => { // :nama sebagai placeHolder untuk params dan apapun yang ditulis setelah itu tidak akan di eksekusi.
    const contact = findContact(req.params.nama); // mencari contact spesifik sesuai dengan nama yang di kirim, findContact() akan menerima nama dari placeHoldernya yang ditulis sebagai params.

    res.render('detail', { 
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});

app.use('/', (req, res) => { // use => untuk menangkap jika halaman web tidak ada dan jangan ditaruh diawal karena akan menghalangi komputer mengakses syntax lainnya
    res.status(404);
    res.send('404');
    
  });
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});