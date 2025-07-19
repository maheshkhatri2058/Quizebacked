require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3008;
const BASE_URL = process.env.URL;
const cors = require('cors');
app.use(cors(
    {
  origin: 'https://sigmaquizehost.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
    }
));
mongoose.connect(BASE_URL).then(()=>console.log("connected")).catch((err)=>console.log("errors r there",err));
const users=mongoose.Schema({
    Username:String,
    AUID:String,
    Score:Number

});
const user=mongoose.model('users',users);

app.post('/sendinfo', async(req, res) => {
    const data=req.body;
    const usr = new user(data);
    try {
        await usr.save();
        res.send("data saved");
        console.log(usr);
        } catch (err) {
            res.send("error");
            }
 
});
app.get('/getinfo',async(req,res)=>
{
    const data=await user.find();
    res.send(data);
    console.log(data);


});
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
