import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';



// const DUMMY_MEETUPS = [
//     { id: 'm1', title: 'A First Meetup', image: 'https://media-cdn.tripadvisor.com/media/photo-s/21/db/89/f0/view.jpg', address: 'some address 5 , 12345 Some City', description: 'This is a First meetup' },
//     { id: 'm2', title: 'A Second Meetup', image: 'https://www.visasturkey.com/wp-content/uploads/sites/43/2019/12/antalya-turkey-travel-guide-2-1280x720.jpg', address: 'some address 10 , 12345 Some City', description: 'This is a Second meetup' },
// ]


function HomePage(props) {


    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name='description'
                    content='Browse a huge list of highly active React meetups!'
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}



//cached and used
//data fetching for pre rendering
//this will works only in Pages Folder and not in component!!!!
//this will execute first heree before this component function is executed and before everything
export async function getStaticProps() {
    //fetch data from api
    //connect
    const client = await MongoClient.connect('mongodb+srv://omar:111fifantore@cluster0.l9nezt7.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    // console.log(meetups);

    client.close();


    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        // increment static generation , fik t2ul he hallet mahal el useffect bel update[x]
        revalidate: 1 //s
    };
}





//             const meetups = await meetupsCollection.find().toArray();
// we can use the meetupsCollection

// to call the find method there

// and find() will by default find

// all the documents in that collection.

//     It's an async task, returning a promise

// which we can await here

// because I'm using the async keyword here.

// And then ultimately we'll therefore get our meetups here.

// To be precise we, 


/*
//run for every request 
//regenerated every time
export async function getServerSideProps(context) {
    //u can run server side code here and operation that used credentials that should not
    //be exposed to the user because this code onlu runs in the server
    //fetch data from api
    const req = context.req;
    const res = context.res;
    //fetch data from an API
    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    }
}

*/


export default HomePage
