import dbConnect from "../../../lib/dbConnect"
import Group from "../../../models/Group"


const apiGroup =  async (req, res) => {
    try {
        dbConnect()
        const { groupId } = req.query
        const groupData = await Group.find({name: groupId})
        res.status(200).json(groupData)
    } catch (e) {
        console.error(e)
    }
}

export default dynamicApiGroup