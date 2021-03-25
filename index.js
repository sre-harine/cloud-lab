const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
//dotenv.config();

const studRoute=require('./students');

//connect to db
const uri = "mongodb+srv://17pw:admin123@rest.li14p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(
   uri,
    { useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false},
    ()=>console.log('connected to db')
);

//middleware
app.use(express.json());
app.use(cors());

app.use('/api',studRoute);

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on port ${port}`));

/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://17pw:<password>@rest.li14p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/