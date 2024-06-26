const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!");
        console.log(err);
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '66062b45fbbd3bfd392f4c09',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero veritatis neque tenetur cumque enim, consequatur, ipsam fuga aliquam voluptas possimus reiciendis cum? Dolorem perspiciatis eveniet temporibus nobis? Nam, libero sit?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/didqpqgug/image/upload/v1711764854/YelpCamp/vuf6wvaxzctbwsndxkqo.jpg',
                    filename: 'YelpCamp/vuf6wvaxzctbwsndxkqo',
                },
                {
                    url: 'https://res.cloudinary.com/didqpqgug/image/upload/v1711764854/YelpCamp/vvzobqumvycdjn0cvthv.jpg',
                    filename: 'YelpCamp/vvzobqumvycdjn0cvthv',
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})