const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');
const Campground = require('../models/campground');
const maptilerApiKey = '<%- process.env.MAPTILER_API_KEY %>';

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error : "));
db.once("open", () => {
     console.log("Database connected")
});

const sample = (array) => array[Math.floor(Math.random()*18)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++){
        let random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '67ab10a9a5b6fad69fdb703c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(places)} ${sample(descriptors)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude 
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dvybnjeu2/image/upload/v1739711829/dominik-jirovsky-re2LZOB2XvY-unsplash_hfwqyr.jpg',
                  filename: 'YelpCamp/tkkvdqr5xf1omlqqa8gq',
                }
              ],
            description: 'This is a default text used for description as lorem ipsum does not work here :(',
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});