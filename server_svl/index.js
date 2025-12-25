// require(`dotenv`).config();
// const http = require("http");

// const { MongoClient, Collection } = require("mongodb");
// const mongoUrl = process.env.MONGO_URL;
// const client = new MongoClient(mongoUrl);

// async function startServer() {
//   const data = {
//     name: "Anand",
//     age: "25",
//     email: "anand22981@gmail.com",
//     phoneNo: "7644004226",
//     dob: "12/09/2000",
//     gender: "Male"
//   };


//   const services = [
//       {
//         title: "💼 Career & Purpose Reading",
//         description:
//           "For career confusion, direction, decisions, and growth blocks.",
//         ideal: "Job change, purpose, stagnation",
//         duration: "30–45 minutes",
//         mode: "Chat / Audio",
//         price: "₹1000",
//         image: 'https://res.cloudinary.com/dhvimkor3/image/upload/v1766646097/energy_yftsp7.jpg',
//       },
//       {
//         title: "💖 Love & Relationship Reading",
//         description:
//           "For confusion, emotional blocks, partner intentions, or healing.",
//         ideal: "Love future, connection clarity, emotional energy",
//         duration: "30–45 minutes",
//         mode: "Chat / Audio",
//         price: "₹1500",
//         image: 'https://res.cloudinary.com/dhvimkor3/image/upload/v1766646097/energy_yftsp7.jpg',
//       },
//       {
//         title: "🔥 Energy Check / No-Contact Reading",
//         description: "To understand emotional distance and unspoken feelings.",
//         ideal: "Current energy, emotional status",
//         duration: "30–45 minutes",
//         mode: "Chat / Audio",
//         price: "₹555",
//         image: 'https://res.cloudinary.com/dhvimkor3/image/upload/v1766646097/energy_yftsp7.jpg',
//       },
//       {
//         title: "🌿 Life Path & Confusion Reading",
//         description: "When nothing feels clear and you need grounding.",
//         ideal: "Life direction, inner blockages",
//         duration: "30–45 minutes",
//         mode: "Chat / Audio",
//         price: "₹400",
//         image: 'https://res.cloudinary.com/dhvimkor3/image/upload/v1766646097/energy_yftsp7.jpg',
//       },
//     ];

//   try {
//     await client.connect();
//     console.log("✅ MongoDB connected");
//     const db = client.db('SeekviaLove');
//     const collection = db.collection('services')
//     const server = http.createServer((req, res) => {
//       res.end("hello ");
//     });

//     server.listen(7777, () => {
//       console.log("hello from server");
//     });

//    const result = await collection.insertMany(services)
//    console.log("data inserted", result);

//   } catch (error) {
//     console.error("MongoDB connection failed:", error);
//   }
// }
// startServer();

// const { MongoClient, Collection } = require("mongodb");
// const mongoUrl = process.env.MONGO_URL;
// const client = new MongoClient(mongoUrl);
const express = require('express')

const app = express();

app.get(("/v1/:user"),(req,res)=>{
    console.log(req.params)
    res.send({name:"Anand"})
})

app.post(("/v1/user"),(req,res)=>{
    res.send("saveData to database")
})



app.listen(7778,()=>{
    console.log("hello")
})
