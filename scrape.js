const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

class Releases {

    // Connect to mongoDB
    async connect() {
        try {
            let connection = await mongoose.connect("mongodb+srv://tony:STARwolf774@cluster0.kljmqtn.mongodb.net/KCalendar?retryWrites=true&w=majority");
            mongoose.set('strictQuery', false);
        } catch(err) {
            console.log(err)
        }
    }

    // Disconnect from mongoDB
    async disconnect() {
        mongoose.disconnect()
    }

    constructor() {
        this.connect();
        this.upcomingReleases;
        this.pastReleases;
        this.releaseSchema = new mongoose.Schema({
            "date": {
                type: String,
                required: [true, "N/A"]
            },
            "time": {
                type: String,
                required: [true, "N/A"]
            },
            "artist": {
                type: String,
                required: [true, "N/A"]
            },
            "artist image": {
                type: String,
                required: [true, "N/A"]
            },
            "name": {
                type: String,
                required: [true, "N/A"]
            },
            "album type": {
                type: String,
                required: [true, "N/A"]
            },
            "title track": {
                type: String,
                required: [true, "N/A"]
            }
        })
        this.groupSchema = new mongoose.Schema({
            "name": {
                type: String,
                required: [true, "No name specified"]
            },
            "followers": {
                type: Number,
                min: 0,
            },
            "artist image": {
                type: String,
                required: [true, "https://i.scdn.co/image/ab6761610000e5ebb1a15fd3e7c1b375dea2637a"]
            },
            "releases": {},
            "related artists":{},
        })
    }

    async groupData() {
        const Group = mongoose.model("Group", this.groupSchema);
        const dataBase = await Group.find({name:"TOMORROW X TOGETHER"});
        let test = dataBase["artist image"]
        console.log(dataBase)
        this.disconnect()
    }

    async scrapeAndSave() {
        // Scrape releases table
        const response = await axios("https://www.reddit.com/r/kpop/wiki/upcoming-releases/2023/january/");
        const html = await response.data;
        const $ = cheerio.load(html);
        let allRows = $("table").first().find("tr").toArray();
        allRows.shift()

        // Format and save data to mongoDB
        const Release = mongoose.model("Release", this.releaseSchema);
        const Group = mongoose.model("Group", this.groupSchema);
        let trackList = [];
        let previousDate;
        let previousTime;
        let titleTrack;
        let date;
        let time;
        let albumType;
        let albumName;
        let artistImage;
        let artistInfo;
        let stringDate = new Date();
        let promise = new Promise(async (resolve, reject) => {
            for(let i = 0; i < allRows.length; i++) {
                const element = allRows[i];
                const tds = $(element).find("td");
                if ($(tds[0]).text() === "") {
                    date = await previousDate;
                } else {
                    previousDate = stringDate.getMonth()+1 + "/" + $(tds[0]).text().slice(0,-2) + "/" + stringDate.getFullYear();
                    date = stringDate.getMonth()+1 + "/" + $(tds[0]).text().slice(0,-2) + "/" + stringDate.getFullYear();
                }
                
                if ($(tds[1]).text() === "") {
                    time = await previousTime;
                } else {
                    previousTime = $(tds[1]).text();
                    time = $(tds[1]).text();
                }
    
                if ($(tds[3]).text() === "") {
                    albumName = "N/A";
                } else {
                    albumName = $(tds[3]).text();
                }
    
                if ($(tds[4]).text() === "") {
                    albumType = "N/A";
                } else {
                    albumType = $(tds[4]).text();
                }                
    
                if ($(tds[5]).text() === "") {
                    titleTrack = "N/A";
                } else {
                    titleTrack = $(tds[5]).text();
                }

                try {
                    artistInfo = await Group.find({"lower case": $(tds[2]).text().replace(/ *\([^)]*\) */g, "").split(", ")[0].toLowerCase()});
                    artistImage = artistInfo[0]["artist image"]
                    if (artistImage === undefined) {
                        artistImage = "https://i.scdn.co/image/ab6761610000e5ebb1a15fd3e7c1b375dea2637a"
                    }
                } catch(err) {
                    artistImage = "https://i.scdn.co/image/ab6761610000e5ebb1a15fd3e7c1b375dea2637a"
                }
    
                let dataDict = new Release({
                    "date": await date,
                    "time": await time,
                    "artist": $(tds[2]).text().replace(/ *\([^)]*\) */g, "").split(", ")[0],
                    "artist image": artistImage,
                    "name": albumName,
                    "album type": albumType,
                    "title track": titleTrack,
                });
                await dataDict.save();
                trackList.push(dataDict);
                if (trackList.length === allRows.length) resolve();
            }
        })
        promise.then(() => this.disconnect())
        return true;
    }

    async totalAmount() {
        const Release = mongoose.model("Release", this.releaseSchema);
        const dataBase = await Release.find({});
        let nameList = []
        dataBase.forEach(release => {
            nameList.push(release.date)
        })
        console.log(nameList.length)
        this.disconnect()
        return nameList.length
    }
}

let date1 = new Date();
let date2 = new Date("1/19/2023");

console.log(date1.getDate() === date2.getDate())

