import React, { Fragment } from 'react'
import MeetUpDetail from '../../components/meetups/MeetUpDetail';

function MeetupDetails() {
    return (
        <MeetUpDetail
            img='https://media-cdn.tripadvisor.com/media/photo-s/21/db/89/f0/view.jpg'
            title='A First Meetup'
            address='Some Street 5 , Some city'
            description='This is a first meetup'
        />

    )
}




//we export only in a dynamic page and you using getStaticProps(){}

export async function getStaticPaths() {
    return {
        // which you need to add in this returned object
        // next to your paths key, the fallback key.
        // This key tells NextJS whether your paths array
        // contains all supported parameter values or just some of them.
        //false : yaane super all meetupId values
        fallback: false,
        paths: [
            { params: { meetupId: 'm1' } },
            { params: { meetupId: 'm2' } },
        ]
    }
}



export async function getStaticProps(context) {
    // fetch data for a single meetup
    //get id
    const meetupId = context.params.meetupId;
    console.log(meetupId);
    return {
        props: {
            meetupData: {
                img: 'https://media-cdn.tripadvisor.com/media/photo-s/21/db/89/f0/view.jpg',
                id: meetupId,
                title: 'A First Meetup',
                address: 'Some Street 5 , Some city',
                description: 'This is a first meetup',

            }
        }
    }
}






export default MeetupDetails;
