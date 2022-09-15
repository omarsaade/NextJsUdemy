
// /api/new-meetup
// POST  /api/new-meetup 

//a function which contain server side code   



/*With that, however, we have a basic API route,
    which will insert meetups into our database
and therefore, in the next step,
    we can now send a request to this API route
from the front end when this form here is submitted
so that we actually do trigger this API route
and we use that code here. */

import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        //try catch if u want
        const client = await MongoClient.connect('mongodb+srv://omar:111fifantore@cluster0.l9nezt7.mongodb.net/meetups?retryWrites=true&w=majority');

        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        // console.log(result);
        //close database connection
        client.close();

        res.status(201).json({ message: 'Meetup inserted!' });
    }
}

export default handler;