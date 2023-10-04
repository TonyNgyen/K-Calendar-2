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
        await page.goto("https://www.reddit.com/r/kpop/wiki/upcoming-releases/2023/october/", {
            waitUntil: "domcontentloaded",
        });
        const table = await page.evaluate(() => {
            // Fetch the first element with class "quote"
            // Get the displayed text and returns it
            const tableData = document.getElementsByTagName("table");
            console.log(tableData);
            return tableData;

            // // Convert the quoteList to an iterable array
            // // For each quote fetch the text and author
            // return Array.from(quoteList).map((quote) => {
            //   // Fetch the sub-elements from the previously fetched quote element
            //   // Get the displayed text and return it (`.innerText`)
            //   const text = quote.querySelector(".text").innerText;
            //   const author = quote.querySelector(".author").innerText;

            //   return { text, author };
            // });
        });
        table;
    }

    async getQuotes() {
        // Start a Puppeteer session with:
        // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
        // - no default viewport (`defaultViewport: null` - website page will be in full width and height)
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        });

        // Open a new page
        const page = await browser.newPage();

        // On this new page:
        // - opens to reddit
        // - wait until the dom content is loaded (HTML is ready)
        await page.goto("https://www.reddit.com/r/kpop/wiki/upcoming-releases/2023/october/", {
            waitUntil: "domcontentloaded",
        });

        // Get page data
        const tableData = await page.evaluate(() => {
            // Fetch the first element with class "quote"
            // Get the displayed text and returns it
            const rows = document.querySelectorAll('table tr');
                return Array.from(rows, row => {
                  const columns = row.querySelectorAll('td');
                  return Array.from(columns, column => column.innerText);
            });
            // const tds = Array.from(document.querySelectorAll('table tr td'))
            // return tds.map(td => td.innerText)
        });

        // Display the tableData
        console.log(tableData[1]);

        // Close the browser
        await browser.close();
    };
}

let releases = new Releases();
releases.getQuotes();