const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const { endPrice } = require("./models/endPrice");

app.use(bodyParser.urlencoded({extended :true}));

app.use(bodyParser.json());

const mongoURI = "mongodb+srv://swoo:swookeem@learndb.atvgo9b.mongodb.net/"



const mongoose = require('mongoose')

mongoose
    .connect(mongoURI, {})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
    
app.get('/', (req, res) => {
  res.send('Hello World! happynew')
})

app.post('/register',async (req,res)=>{

  const end = new endPrice(req.body)

  await end.save()
  .then(()=>{
    res.status(200).json({
      success:true,
    });
  })
  .catch((err)=>{
    console.error(err);
    res.json({
      success : false,
      err: err
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})