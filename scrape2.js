const axios = require("axios");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

class Releases {
    // Connect to mongoDB
    async connect() {
        try {
            let connection = await mongoose.connect(
                "mongodb+srv://tony:mHRUNHNCWtVKLRbC@cluster0.kljmqtn.mongodb.net/KCalendar?retryWrites=true&w=majority"
            );
            mongoose.set("strictQuery", false);
            console.log("THIS WORKS")
        } catch (err) {
            console.log(err);
        }
    }

    // Disconnect from mongoDB
    async disconnect() {
        mongoose.disconnect();
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
            "related artists": {},
        })
    }

    async scrape() {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        });
        const page = await browser.newPage();
        await page.goto("http://quotes.toscrape.com/", {
            waitUntil: "domcontentloaded",
        });
    }
}

let releases = new Releases();
releases.scrape();