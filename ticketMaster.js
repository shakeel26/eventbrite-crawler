const axios = require('axios');
const express = require('express')
const app = express()
const fs = require('fs');
const port = 3000


const getEvents = async (URL, pageSize, pageNo, eventsArry) => {
    let res = await axios.get(`${URL}&size=${pageSize}&page=${pageNo}`)
    let eventsChunk = res.data._embedded.events;
    console.log('chunk ', eventsChunk.length)

    for (const event of eventsChunk) {
        eventsArry.push(JSON.stringify(event))
    }

}



const start = async () => {
    let eventsArry = []
    const URL = 'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=DE&apikey=aEEStBeBVbJxAEG1B0eN8iZBfOIk8EBJ'
    let res = await axios.get(URL);

    let data = res.data;
    let totalEvents = data.page.totalElements;
    console.log('totalEvents ', totalEvents)
    totalEvents = 999
    const per_page = 111;
    let noOfPages = totalEvents / per_page;
      noOfPages = 9
    for (let i = 1; i <= noOfPages; i++) {
        console.log('page ', i)
        await getEvents(URL, per_page, i, eventsArry)
    }

    console.log('out of for loop ')
    fs.appendFile('ticket_master_events.json', eventsArry.toString(), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

start()


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})