const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log('Database Connected')
});

const sample  = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i= 0; i <= 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price=Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6688c2471f199727a36f1b86',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe praesentium mollitia ipsa? Reiciendis deserunt ea, nobis harum minima nam repellendus cum repudiandae quidem inventore ex omnis sequi vitae iste molestiae!',
            price,
            geometry : {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dgdl8mqde/image/upload/v1720487048/YelpCamp/r81fh90vgly8z4ocgzcv.jpg',
                  filename: 'YelpCamp/r81fh90vgly8z4ocgzcv',
                
            }
        ]
    })
        await camp.save();
    }
}

seedDB().then( () => {
    mongoose.connection.close();
})