const axios = require('axios');
const express = require('express')
const app = express()
const fs = require('fs');
const port = 3000


const getEvents = async (URL, pageSize, pageNo, eventsArry) => {
  let res = await axios.get(`${URL}&per_page=${pageSize}&page=${pageNo}`)

  let eventsChunk = res.data.events;

  console.log('chunk ',eventsChunk.length)

  for (const event of eventsChunk) {
    eventsArry.push(JSON.stringify(event))
  }

}


const start = async () => {
  const URL = 'https://api.seatgeek.com/2/events?client_id=MjY4NDI5NjF8MTY1MTc0MzAxOC4xMzA5NTg'
  let res = await axios.get(URL);

  let data = res.data;
  const totalEvents = data.meta.total;
  const per_page = 100;
  let noOfPages = totalEvents / per_page;
  // noOfPages = 1
  let eventsArry = [];
  for (let i = 1; i <= noOfPages; i++) {
    console.log('page ', i)
    await getEvents(URL, per_page, i, eventsArry)
  }

  console.log('final ', eventsArry.length)
  eventsArry.toString();

  fs.appendFile('seatGeek.json', eventsArry.toString(), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

}


start()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})