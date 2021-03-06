const axios = require('axios');
const cheerio = require ('cheerio');
const pool = require('./pool');






const url = 'https://www.meetup.com/find/?source=EVENTS&eventType=online&keywords=software%20engineer'
function fetchEvents() { 
    axios(url)
    .then(response => {
      const html = response.data
      const $ = cheerio.load(html)
      const events = [];


      $('#event-card-in-search-results', html).each(function() {
        const title = $(this).find('#event-card-in-search-results > div > div.flex.flex-row-reverse.md\\:flex-row.flex-1.overflow-hidden > div.overflow-hidden.w-full > p').text()
        const date = $(this).find('#event-card-in-search-results > div > div.flex.flex-row-reverse.md\\:flex-row.flex-1.overflow-hidden > div.overflow-hidden.w-full > div.flex.justify-between.md\\:items-center.flex-col-reverse.md\\:flex-row > div > time').text()
        const url = $(this).attr('href')
        const hostExtra = $(this).find('#event-card-in-search-results > div > div.flex.flex-row-reverse.md\\:flex-row.flex-1.overflow-hidden > div.overflow-hidden.w-full > div.w-full.text-sm.mx-auto.mb-2.md\\:mb-4 > p.hidden.md\\:line-clamp-1.text-gray6').text()
        const host = hostExtra.substring(11)
        
        
        events.push({
            title,
            date,
            url,
            host
           
        })
       
    })



    events.forEach(async (event) => {
        return pool.query(
            `INSERT INTO events(
                title, url, date, host
            )
            VALUES ($1, $2, $3, $4) 
            RETURNING *
            `,
            [event.title, event.url, event.date, event.host]
        )
    })
})
}


const designerUrl = ('https://www.meetup.com/find/?keywords=designer&source=EVENTS&eventType=online')

function fetchDesigner() {
    axios(designerUrl)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const designerEvents = [];

    $('#event-card-in-search-results', html).each(function() {
        const title = $(this).find('#event-card-in-search-results > div > div.flex.flex-row-reverse.md\\:flex-row.flex-1.overflow-hidden > div.overflow-hidden.w-full > p').text()
        const date = $(this).find('#event-card-in-search-results > div > div.flex.flex-row-reverse.md\\:flex-row.flex-1.overflow-hidden > div.overflow-hidden.w-full > div.flex.justify-between.md\\:items-center.flex-col-reverse.md\\:flex-row > div > time').text()
        const url = $(this).attr('href')
        const hostExtra = $(this).find('#event-card-in-search-results > div > div.flex.flex-row-reverse.md\\:flex-row.flex-1.overflow-hidden > div.overflow-hidden.w-full > div.w-full.text-sm.mx-auto.mb-2.md\\:mb-4 > p.hidden.md\\:line-clamp-1.text-gray6').text()
        const host = hostExtra.substring(11)

        designerEvents.push({
            title,
            date,
            url,
            host
           
        })
    })    

    designerEvents.forEach(async (des) => {
        return pool.query(
            `INSERT INTO events(
                title, url, date, host
            )
            VALUES ($1, $2, $3, $4) 
            RETURNING *
            `,
            [des.title, des.url, des.date, des.host]
        )
    })

    })    

    
}

const managerUrl = ('https://www.meetup.com/find/?keywords=project%20manager&source=EVENTS&eventType=online')

function fetchManager() {
    axios(managerUrl)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const managerEvents = [];

    $('#event-card-in-search-results', html).each(function() {
        const title = $(this).find('#event-card-in-search-results > div > div.flex.flex-row-reverse.md\\:flex-row.flex-1.overflow-hidden > div.overflow-hidden.w-full > p').text()
        const date = $(this).find('#event-card-in-search-results > div > div.flex.flex-row-reverse.md\\:flex-row.flex-1.overflow-hidden > div.overflow-hidden.w-full > div.flex.justify-between.md\\:items-center.flex-col-reverse.md\\:flex-row > div > time').text()
        const url = $(this).attr('href')
        const hostExtra = $(this).find('#event-card-in-search-results > div > div.flex.flex-row-reverse.md\\:flex-row.flex-1.overflow-hidden > div.overflow-hidden.w-full > div.w-full.text-sm.mx-auto.mb-2.md\\:mb-4 > p.hidden.md\\:line-clamp-1.text-gray6').text()
        const host = hostExtra.substring(11)

        managerEvents.push({
            title,
            date,
            url,
            host
           
        })
    })    

    managerEvents.forEach(async (man) => {
        return pool.query(
            `INSERT INTO events(
                title, url, date, host
            )
            VALUES ($1, $2, $3, $4) 
            RETURNING *
            `,
            [man.title, man.url, man.date, man.host]
        )
    })

    })    

    
}




module.exports = {
    fetchEvents,
    fetchDesigner,
    fetchManager
}
