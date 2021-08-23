const { ObjectID } = require('bson');
const { MongoClient } = require('mongodb');

// melakukan konfigurasi
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'try';


// cara setup mongodb
const client = new MongoClient(url, {
    useNewUrlParser: true,
    // useUnifiedToplogy: true,
});

client.connect((error, client) => {
    if (error) {
        return console.log('Koneksi gagal!');
    }

    // pilih database
    const db = client.db(dbName)

    // menambahkan 1 data ke collection mahasiswa.
    // db.collection('mahasiswa').insertOne(
    //     {
    //         nama: 'Insyofah',
    //         email: 'Insyofah@gmail.com',
    //     },
    //     (error, result) => {
    //         if (error) {
    //             return console.log('gagal menambahkan collection!');
    //         }

    //         console.log(result);
    //     }
    // );


    // menambahkan lebih dari 1 data.
    
    // db.collection('mahasiswa').insertMany( // insertMany terdiri dari array of object.
    //     [
    //         {
    //             nama: 'Aisyah',
    //             email: 'aisyah@gmail.com',
    //         },
    //         {
    //             nama: 'Duwi',
    //             email: 'duwi@gmail.com',
    //         }
    //     ],
    //     (error, result) => {
    //         if (error) {
    //             return console.log('gagal ditambahkan!');
    //         }

    //         console.log(result);
    //     }
    // );



    // # // Menampilkan semua data yang ada dalam collection mahasiswa.
    // console.log(
    //     db
    //     .collection('mahasiswa')
    //     .find()
    //     .toArray((error, result) => {
    //         console.log(result);
    //     }) // toArray mengembalikan menjadi sebuah array dan menerima callback.
    // );
    
    // ## // Menampilkan data berdasaarkan kriteria yang ada dalam collection mahasiswa.
    // console.log(
    //     db
    //     .collection('mahasiswa')
    //     .find( { nama: 'Aisyah'} )
    //     .toArray((error, result) => {
    //         console.log(result);
    //     }) // toArray mengembalikan menjadi sebuah array dan menerima callback.
    // );


    // ### Mengubah data berdasaarkan id. 
    
    // Agar bisa melihat data dimasukkan kedalam promise lebih dulu dan dijadikan kedalam variabel.

    // const update = db.collection('mahasiswa').updateOne( // object pertama masukan kriteria, kedua apa yang mau diupdate
    //     {
    //         _id: ObjectID("611713389365b0bc5c24abb4")
    //     },
    //     {
    //         $set: {
    //             email: 'aisyah@yahoo.com',
    //         }
    //     }
    // );

    // update // dan akan di cek disini menggunakan then dan ditangkap oleh catch jika berhasil tampilkan result jika error tampilkan error.
    // .then((result) => {
    //     console.log(result);
    // })
    // .catch((error) => {
    //     console.log(error) 
    // })


    //  Mengubah data lebih dari 1 berdasarkan kriteria.

    // db.collection('mahasiswa').updateMany(
    //     {
    //         nama: 'Aisyah',
    //     },
    //     {
    //         $set: {
    //             nama: 'Cah ayu',
    //         },
    //     }
    // );

    // Menghapus 1 data.

    // db.collection('mahasiswa').deleteOne(
    //     {
    //         _id: ObjectID("611713389365b0bc5c24abb4"),
    //     }
    // ).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // Menghapus lebih 1 data, berdasarkan kriteria.

    db.collection('mahasiswa').deleteMany(
        {
            nama: 'Duwi',
        },
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error); 
    });
});