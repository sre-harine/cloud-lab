const router=require('express').Router();
const Stud=require('./model/Stud');

router.get('/',(req,res)=>{
    res.send('student management');
});

router.get('/newstudents',async(req,res)=>{
        const liststuds=await Stud.find({});
        try {
            res.send(liststuds);
          } catch (error) {
            res.status(500).send(error);
          } 
});

router.post('/newstudents',async(req,res)=>{   
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

router.delete("/student", async(req,res) => {
    try {
      const del = await Stud.findOneAndDelete({"name":"nive"});
  
      if (!del) res.status(404).send("No item found");
      res.status(200).send('deleted');
    } catch (error) {
      res.status(500).send(error);
    }
});


router.put("/:id", async(req,res) => {
    try {
      await Stud.findByIdAndUpdate(req.params.id, req.body);
      await Stud.save();
      res.send('updated');
      console.log(req.params.id);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get('/:_id', (req, res) => {
    User.findById(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(404).json({ success: false, msg: `No such student.` });
      });
  });  

module.exports=router;
