import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/21/db/89/f0/view.jpg',
        address: 'some address 5 , 12345 Some City',
        description: 'This is a First meetup',
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://www.visasturkey.com/wp-content/uploads/sites/43/2019/12/antalya-turkey-travel-guide-2-1280x720.jpg',
        address: 'some address 10 , 12345 Some City',
        description: 'This is a Second meetup',
    },

]

function HomePage() {
    return <MeetupList meetups={DUMMY_MEETUPS} />
}

export default HomePage
