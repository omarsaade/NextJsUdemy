import React from 'react'
import MeetUpDetail from '../../components/meetups/MeetUpDetail';
import { MongoClient, ObjectId } from 'mongodb';

function MeetupDetails(props) {
    return (
        <MeetUpDetail
            img={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />

    )
}




//we export only in a dynamic page and you using getStaticProps(){}

export async function getStaticPaths() {

    //generating our array of path dynamically

    const client = await MongoClient.connect('mongodb+srv://omar:111fifantore@cluster0.l9nezt7.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    //find gives me access to all the meetup
    //we only fetch the id
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    // console.log(meetups);[{}, {}, {}]
    client.close();

    return {
        // which you need to add in this returned object
        // next to your paths key, the fallback key.
        // This key tells NextJS whether your paths array
        // contains all supported parameter values or just some of them.
        //false : yaane super all meetupId values
        fallback: false,
        paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } }))
        // paths: [
        //     { params: { meetupId: 'm1' } },
        //     { params: { meetupId: 'm2' } },
        // ]
    }
}



//fetch data dynamically
export async function getStaticProps(context) {
    // fetch data for a single meetup
    //get id
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://omar:111fifantore@cluster0.l9nezt7.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    //get access to a single meetup not all meetup
    const selectedMeetup = await meetupsCollection.findOne({
        // we need to convert it from string
        // to such a object ID thing
        // and for this, from MongoDB,
        // you should import ObjectId
        _id: ObjectId(meetupId),
    });
    // console.log(selectedMeetup); { id:ss, title:"dd"...}
    client.close();

    return {
        props: {
            meetupData: {
                //convert the id to string
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}






export default MeetupDetails;
