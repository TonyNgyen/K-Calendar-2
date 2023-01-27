import mongoose from "mongoose"

const releaseSchema = new mongoose.Schema({
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

export default mongoose.models.Release || mongoose.model('Release', releaseSchema)