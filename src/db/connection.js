const mongoose = require('mongoose')






mongoose.connect('mongodb+srv://cluster0.faizy.mongodb.net/myFirstDatabase?retryWrites=true=majority/Ahmadch',
    {

        dbName: 'Cash&Carry',
        user: 'Ahmadch',
        pass: 'emmich12345',
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)





    .then(() => { console.log('connected to mongoDB') })
    .catch(err => console.log(err.message))
