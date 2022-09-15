
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';



// const DUMMY_MEETUPS = [
//     { id: 'm1', title: 'A First Meetup', image: 'https://media-cdn.tripadvisor.com/media/photo-s/21/db/89/f0/view.jpg', address: 'some address 5 , 12345 Some City', description: 'This is a First meetup' },
//     { id: 'm2', title: 'A Second Meetup', image: 'https://www.visasturkey.com/wp-content/uploads/sites/43/2019/12/antalya-turkey-travel-guide-2-1280x720.jpg', address: 'some address 10 , 12345 Some City', description: 'This is a Second meetup' },
// ]


function HomePage(props) {


    return <MeetupList meetups={props.meetups} />
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
    console.log(meetups);

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
