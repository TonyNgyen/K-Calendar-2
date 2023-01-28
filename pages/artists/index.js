import { useRouter } from "next/router";
import dbConnect from "../../lib/dbConnect";
import Group from "../../models/Group";
import ArtistCard from "../../Components/ArtistCard";
import { motion } from "framer-motion";

export default function artistIndex({groups}) {
  return(
    <>
      <motion.h1 className="text-center text-7xl mt-20 font-poppins"
        initial = {{
          opacity: 0,
          scale: 0.5
        }}
        animate = {{
          opacity: 1,
          scale: 1,
        }}
        transition = {{
          duration: 1.5,
      }}>
        All Artists
      </motion.h1>
      <div className="px-16 mt-20 grid lg:grid-cols-3 md:grid-cols-2 gap-x-10 gap-y-14 sm:grid-cols-1 2xl:px-64">
      {groups.map((group) => (
        <ArtistCard name={group.name} image={group["artist image"]} data={group} key={group["_id"]}></ArtistCard>
      ))}
      </div>
    </>
  )
}

export async function getStaticProps() {
    await dbConnect()
  
    /* find all the data in our database */
    const result = await Group.find({})
    const groups = result.map((doc) => {
      const group = doc.toObject()
      group._id = group._id.toString()
      return group
    })
  
    return { props: { groups: groups } }
}