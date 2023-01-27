import dbConnect from "../../lib/dbConnect"
import Group from "../../models/Group"

const apiIndex = async (req, res) => {
    try {
        dbConnect()
        const groupData = await Group.find({})
        res.status(200).json(groupData)
    } catch (e) {
        console.error(e)
    }
}

export default apiIndex