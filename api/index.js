const express = require('express')
const fetch= require('node-fetch')
const cors=require('cors')
require('dotenv').config();

const app=express();

app.use(cors({
    origin: 'https://weather-app-zeta-nine-29.vercel.app'
}))
app.use(express.json())

app.get('/api/weather', async(req, res)=>{
    const {city}=req.query

    try{
        const response= await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=7`
        )

        if(!response.ok){
            console.error('Weather API responded with status', response.status)

            return res.status(response.status).json({error: 'Failed to fetch from server'});
        }

        const data = await response.json();
        res.json(data);

    }catch(e){
        console.error("weather API error: ", e);
        res.status(500).json({error: "Error fetching weather data"})
    }
})

module.exports= app