// /api/new-meetup
// POST  /api/new-meetup 

//a function which contain server side code   
function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const { title, image, address, description } = data;
    }

}

export default handler;