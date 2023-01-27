import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
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

export default mongoose.models.Group || mongoose.model('Group', groupSchema)
