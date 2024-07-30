const express = require('express')
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const port = 3000;




require("dotenv").config();


const accountSid=process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client =require("twilio")(accountSid, authToken);


app.post('/senddata', (req, res) => {
    const { number, message } = req.body;
    console.log(`Received number: ${number} and message: ${message}`);
    console.log(`${number}+"****"${process.env.TO_NUMBER}`)

    const sendSMS = async(body)=>{

        let msgOptions ={
    
            from:process.env.TWILIO_FROM_NUMBER,
            to:process.env.TO_NUMBER,
            
            body,
        };
    
        try{
    
            const message = await client.messages.create(msgOptions);
            console.log(message);
        }catch (err){
            console.log(err);
        }

        
    };
    
    sendSMS(message);
    // Respond back to the client
    res.send(`Number received: ${number}, Message received: ${message}`);
});






app.listen(port,()=>{

    console.log('app listing at port 3000')
})