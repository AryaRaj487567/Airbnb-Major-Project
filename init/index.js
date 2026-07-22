const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();
const initData = require("./data.js");
const Listing = require("../Models/listing.js");

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(process.env.ATLASDB_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    for (let listing of initData.data) {
        try {
            const response = await axios.get(
                "https://nominatim.openstreetmap.org/search",
                {
                    params: {
                        q: `${listing.location}, ${listing.country}`,
                        format: "json",
                        limit: 1,
                    },
                    headers: {
                        "User-Agent": "wanderlust-app",
                    },
                }
            );

            if (response.data.length > 0) {
                listing.geometry = {
                    type: "Point",
                    coordinates: [
                        parseFloat(response.data[0].lon),
                        parseFloat(response.data[0].lat),
                    ],
                };
            }

            listing.owner = "6a547ff7daa80ed56823d663";

            await Listing.create(listing);
        } catch (err) {
            console.log(`Error for ${listing.title}:`, err.message);
        }
    }

    console.log("Database initialized");
};

initDB();