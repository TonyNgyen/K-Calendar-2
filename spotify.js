// your application requests authorization
const mongoose = require("mongoose")
var client_id = 'e4b41073368b4e2f91fc56369768b51d'; // Your client id
var client_secret = '1c61ae9fc4e94a2ca5e07197b59a9db6'; // Your secret

class Spotify {

    // Connect to mongoDB
    async connect() {
        try {
            let connection = await mongoose.connect("mongodb+srv://tony:ZBEC37QV1yTe8VIk@cluster0.kljmqtn.mongodb.net/KCalendar?retryWrites=true&w=majority");
            mongoose.set('strictQuery', false);
        } catch(err) {
            console.log(err)
        }
    }

    // Disconnect from mongoDB
    async disconnect() {
        mongoose.disconnect()
    }

    // Sets client ID and secret ID to connect to Spotify API
    // Sets up connection to mongoDB and mongoose schema
    constructor(client_id, client_secret) {
        this.connect();
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.groupSchema = new mongoose.Schema({
            "name": {
                type: String,
                required: [true, "No name specified"]
            },
            "lower_case": {
                type: String,
                required: [true, "No lowercase specified"]
            },
            "artist id": {
                type: String,
                required: [true, "No id"]
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
    }

    // Gets authentication token for Spotify API
    async getToken() {
        var authOptions = {
            method: "POST",
            headers: {
              'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
              "Content-Type" : "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials"
          };

        const result = await fetch("https://accounts.spotify.com/api/token", authOptions)

        const data = await result.json();
        return data.access_token;
    }

    // Get headers used in API calls
    async getResourceHeaders() {
        let access_token = await this.getToken();
        let headers = {
            "Authorization": "Bearer " + await access_token
        }
        return headers
    }

    // Get basic artist information by artist name
    async getArtistByName(name) {
        let headers = await this.getResourceHeaders();
        const result = await fetch("https://api.spotify.com/v1/search?q=" + name + "&type=artist&market=US", {
            method: "GET",
            headers: headers
        })
        try {
            const data = await result.json();
            return data.artists.items[0]
        } catch (err) {
            console.log(name)
        }
        return data.artists.items[0];
    }

    // Get basic artist information by artist ID
    async getArtistById(id) {
        let headers = await this.getResourceHeaders();
        const result = await fetch("https://api.spotify.com/v1/artists/" + id, {
            method: "GET",
            headers: headers
        })
        const data = await result.json();
        return data;
    }

    // Similar to getArtistById() but works with multiple artists
    async getArtistByIdList(idList) {
        let headers = await this.getResourceHeaders();
        let ids = idList.join(",")
        const result = await fetch("https://api.spotify.com/v1/artists?ids=" + ids, {
            method: "GET",
            headers: headers
        });
        const data = await result.json();
        return data.artists;
    }

    // Get related artists of artist using artist ID
    async getRelatedArtists(id) {
        let headers = await this.getResourceHeaders();
        const result = await fetch("https://api.spotify.com/v1/artists/" + id + "/related-artists", {
            method: "GET",
            headers: headers
        })
        const data = await result.json();
        let relatedList = []
        try {
            // Only want top 6 related artists
            let relatedArtists = data.artists.slice(0,6);
            // Create dictionary to store relevant data for related artists
            relatedArtists.forEach(artist => {
                try {
                    relatedList.push({
                        "name": artist.name,
                        "id": artist.id,
                        "image": artist.images[0].url,
                    })
                // Error usually occurs when artist has no image, so set image as stock image
                } catch(err) {
                    relatedList.push({
                        "name": artist.name,
                        "id": artist.id,
                        "image": "https://i.scdn.co/image/ab6761610000e5ebb1a15fd3e7c1b375dea2637a",
                    })
                }
            })   
        } catch (e) {
            relatedList = []
        }
        return relatedList;
    }

    // Get list of release IDs for an artist using artist ID
    async getIdsOfReleases(artistId) {
        let headers = await this.getResourceHeaders();
        let result = await fetch("https://api.spotify.com/v1/artists/" + artistId + "/albums?limit=50&include_groups=album,single", {
            method: "GET",
            headers: headers
        })
        let data = await result.json();
        let albumData = data.items;
        let idList = [];
        let limitTracker = 0;

        if (albumData != null) {
            // API only allows maximum of 50 releases
            try {
                while (albumData.length === 50) {
                    albumData.forEach(element => {
                        // Make sure to only get one copy of a release
                        if (element.available_markets.length > 5) {
                            idList.push(element.id);
                        }
                    })
                    // Updates offset to go through next releases after 50
                    limitTracker += 50;
                    result = await fetch("https://api.spotify.com/v1/artists/" + artistId + "/albums?limit=50&include_groups=album,single&offset=" + limitTracker, {
                        method: "GET",
                        headers: headers
                    })
                    data = await result.json();
                    albumData = data.items;
                }
                // Adds last remaining release IDs
                albumData.forEach(element => {
                    if (element.available_markets.length > 5) {
                        idList.push(element.id);
                    }
                })   
            } catch(err) {
                console.log(artistId)
                return idList;
            }
        }
        return idList;
    }

    // Get information about all releases for an artist using their artist ID
    async getReleases(artistId) {
        let headers = await this.getResourceHeaders();
        // Retrieve a list of IDs for the artist's releases
        // This greatly reduces the amount of calls to the API
        let idList = await this.getIdsOfReleases(artistId);
        // Initialize dictionaries that will hold the data depending on the type of release
        let albumsList = [];
        let epsList = [];
        let singlesList = [];
        // Spotify API only returns maximum of 20 releases per call
        while (idList.length > 0) {
            // Call API every 20 release IDs
            let currentList = idList.splice(0,20)
            let query = currentList.join(",")
            let result = await fetch("https://api.spotify.com/v1/albums?ids=" + query, {
                method: "GET",
                headers: headers
            })
            let data = await result.json()
            let allReleases = await data.albums
            // Track if Spotify considers the release a single
            let isSingle = true;
            if (allReleases != null) {
                allReleases.forEach(release => {
                    let releaseTracks = release.tracks.items;
                    let tracks = [];
                    let albumLengthMS = 0;
                    releaseTracks.forEach(track => {
                        albumLengthMS += track.duration_ms;
                        // Check if there is a track over 10 mins long since that can be an EP
                        if (track.duration_ms/60000 > 10) {
                            isSingle = false;
                        }
                        let addedTrack = {
                            "track name": track.name,
                            "track id": track.id,
                            "track link": track.external_urls.spotify,
                            "track preview": track.preview_url
                        }
                        tracks.push(addedTrack)
                    })
                    // Create dictionary that will hold all data about the release
                    let releaseDict = {}
                    try {
                        releaseDict = {
                            "release name": release.name,
                            "release date": release.release_date,
                            "release link": release.external_urls.spotify,
                            "release type": release.album_type,
                            "release length tracks": release.total_tracks,
                            "release image": release.images[0].url,
                            "release tracks": tracks,
                        }
                    // If there is an error, return this for manual work
                    } catch(err) {
                        releaseDict = {
                            "release name": "NOT FOUND",
                            "release date": "NOT FOUND",
                            "release link": "NOT FOUND",
                            "release type": "NOT FOUND",
                            "release length tracks": 0,
                            "release image": "NOT FOUND",
                            "release tracks": "NOT FOUND",
                        }
                    }
                    // Differentiate between single and EP
                    if (releaseDict["release type"] === "single") {
                        if (albumLengthMS/60000 < 30 && releaseDict["release length tracks"] <= 3 && isSingle) {
                            singlesList.push(releaseDict)
                        } else {
                            epsList.push(releaseDict)
                        }
                    } else {
                        albumsList.push(releaseDict)
                    }
                })
            }
        }
        return {"albums": albumsList, "eps": epsList, "singles": singlesList}
    }

    // Retreives and saves all information about artists to mongoDB
    async getAllDataById(idList) {
        // Initialize mongoDB document to save information in
        const Group = mongoose.model("Group", this.groupSchema);
        // List that will hold all information from Spotify API calls
        let dataList = [];
        let result;
        let artistImage;
        let trackList = [];
        let initialLength = idList.length;
        while (idList.length > 0) {
            // Spotify API only allows 50 artists to be called
            let currentList = idList.splice(0,50);
            result = await this.getArtistByIdList(currentList);
            dataList.push.apply(dataList, await result)
        }
        let promise = new Promise((resolve, reject) => {
            dataList.forEach(async artist => {
                // Only edge-case is when artist has no image
                // In that case, use a stock photo
                try {
                    artistImage = artist.images[0].url
                } catch(err) {
                    artistImage = "https://i.scdn.co/image/ab6761610000e5ebb1a15fd3e7c1b375dea2637a"
                }
                // Use group's information to set up mongoDB document
                // Dictionary used to save information to mongoDB document
                let dataDict = new Group({
                    "name": artist.name,
                    "lower_case": artist.name.toLowerCase(),
                    "artist id": artist.id,
                    "followers": artist.followers.total,
                    "artist image": artistImage,
                    "releases": await this.getReleases(artist.id),
                    "related artists": await this.getRelatedArtists(artist.id)
                });
                await dataDict.save();
                trackList.push(artist.id);
                if (trackList.length === initialLength) resolve();
            })

        })
        promise.then(() => this.disconnect())
        return true;
    }

    async listAllArtists() {
        const Group = mongoose.model("Group", this.groupSchema);
        const dataBase = await Group.find({});
        let nameList = []
        dataBase.forEach(group => {
            nameList.push(group.name)
        })
        return nameList
    }

    // Retreives and saves all information of related artists that aren't in database
    async addRelatedArtists() {
        const Group = mongoose.model("Group", this.groupSchema);
        const dataBase = await Group.find({})
        let addList = []
        let nameList = await this.listAllArtists()
        dataBase.forEach(group => {
            for (var key in group["related artists"]) {
                if (!(nameList.includes(key)) && !addList.includes(group["related artists"][key]["id"])) {
                    addList.push(group["related artists"][key]["id"])
                }
            }
        })
        await this.getAllDataById(addList);
    }

    async getReleasesData() {
        const Release = mongoose.model("Release", this.releaseSchema)
        const Group = mongoose.model("Group", this.groupSchema)
        const releaseDataBase = await Release.find({})
        const amountOfReleases = releaseDataBase.length
        let idList = []
        let artistTracker = []
        let promise = new Promise(async (resolve, reject) => {
            releaseDataBase.forEach(async release => {
                let artistName = release.artist
                let artistData = await this.getArtistByName(artistName)
                const findArtist = await Group.find({"artist id": artistData.id})
                if (findArtist.length === 0) {
                    idList.push(artistData.id)
                }
                artistTracker.push(artistData)
                if (artistTracker.length === amountOfReleases) resolve();
            })
        })
        promise.then(() => this.getAllDataById(idList))
        return true
    }
}

let spotify = new Spotify(client_id, client_secret)
spotify.getReleasesData()

// run scrape.js
// run spotify.js
// delete releases on mongoDB
// run scrape.js

// errorList is in lower_case