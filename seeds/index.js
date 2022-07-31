const mongoose = require('mongoose');
const cities = require('./cities');
const{ places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
// we are in index.js in seeds directory, and we need to go to models directory to campgrounds.js, so wee need to go out from seeds and to models

mongoose.connect('mongodb://localhost:27017/yelp-camp',
 {useNewUrlParser: true,  useUnifiedTopology: true});

//code added to connect database
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",() => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10 ;
        const camp = new Campground({
            author:'62db8a1f5ce9b140c565eabe',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            image:'https://source.unsplash.com/collection/483251',
            description:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates quas debitis ex incidunt, impedit quam quo tenetur inventore odio at corrupti officia magnam dolor velit ipsam cumque deleniti',
            price
        })
    await camp.save();
   }
}
// seedDB(); 
seedDB().then(() => {
    mongoose.connection.close();
})