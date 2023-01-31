import ReleaseCard from "../../Components/ReleaseCard";
import dbConnect from "../../lib/dbConnect"
import Release from "../../models/Release"
import { motion } from "framer-motion"

export default function ReleasesPage({releases}) {

  let upcomingReleases = [];
  let pastReleases = [];
  let currentDate = new Date();

  for (let i = 0; i < releases.length; i++) {
    let releaseDate = new Date(releases[i].date)
    if (releaseDate.getDate() >= currentDate.getDate()) {
      upcomingReleases.push(releases[i])
    } else {
      pastReleases.push(releases[i])
    }
  }

  return(
    <>
      <motion.h1 className="text-center text-7xl mt-24 font-poppins"
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
        Upcoming Releases
      </motion.h1>
      <div className="px-16 mx-auto mt-24 grid lg:grid-cols-3 md:grid-cols-2 gap-x-10 gap-y-14 sm:grid-cols-1 2xl:px-64">
      {upcomingReleases.map((release) => (
        <ReleaseCard artist={release.artist} name={release.name} date={release.date} key={release["_id"]} image={release["artist image"]}></ReleaseCard>
      ))}
      </div>

      <motion.h1 className="text-center text-7xl mt-32 font-poppins"
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
        Past Releases
      </motion.h1>
      <div className="px-16 mx-auto mt-24 grid lg:grid-cols-3 md:grid-cols-2 gap-x-10 gap-y-14 sm:grid-cols-1 2xl:px-64">
      {pastReleases.map((release) => (
        <ReleaseCard artist={release.artist} name={release.name} date={release.date} key={release["_id"]} image={release["artist image"]}></ReleaseCard>
      ))}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const releaseData = await Release.find({})
  const releases = releaseData.map((doc) => {
    const release = doc.toObject()
    release._id = release._id.toString()
    return release
  })

  return { props: {releases: releases }}
} 
