// menggunakan express

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact } = require('./utils/contacts')
const app = express();
const port = 3000;

//  Gunakan ejs.
app.set('view engine', 'ejs');

// Third-party Middleware
app.use(expressLayouts); // third-party ada di link expressJs.com

// Built-in Middleware
app.use(express.static('public'));


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
    });
});

app.get('/contact/:nama', (req, res) => { // :nama sebagai placeHolder untuk params
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