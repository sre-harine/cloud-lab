const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
//dotenv.config();
const Stud=require('./model/Stud');

//const studRoute=require('./students');

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

//app.use('',studRoute);

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
app.get('/',async(req,res)=>{
  const liststuds=await Stud.find({});
  try {
      res.send(liststuds);
    } catch (error) {
      res.status(500).send(error);
    } 
});

app.post('/',async(req,res)=>{   
 const std={
     name:req.body.name,
     rollno:req.body.rollno,
     dob:req.body.dob,
     email:req.body.email,
 };
 const createstud=new Stud(req.body);
 try {
  await createstud.save();
  res.send(createstud);
} catch (error) {
  res.status(500).send(error);
}
});

app.delete("/:id", async(req,res) => {
try {
const del = await Stud.findOneAndDelete(req.params.id);

if (!del) res.status(404).send("No item found");
res.status(200).send('deleted');
} catch (error) {
res.status(500).send(error);
}
});


app.put("/:id", async(req,res) => {
try {
await Stud.findByIdAndUpdate(req.params.id, req.body);
await Stud.save();
res.send('updated');
console.log(req.params.id);
} catch (error) {
res.status(500).send(error);
}
});
/*
app.get('/:_id', (req, res) => {
User.findById(req.params.id)
.then((result) => {
  res.json(result);
})
.catch((err) => {
  res.status(404).json({ success: false, msg: `No such student.` });
});
});
*/