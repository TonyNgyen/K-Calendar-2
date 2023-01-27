import dbConnect from "../../../../lib/dbConnect"
import Group from "../../../../models/Group"
import ReleaseIDisplay from "../../../../Components/ReleaseIDisplay"

export default function releasesIndex({groupData}) {
  return (
    <>
      <h1 className="text-2xl text-center">Albums</h1>
      <div className="grid grid-cols-6 justify-items-center">
        {groupData.releases.albums.map((album) => (
          <ReleaseIDisplay image={album["release image"]} name={album["release name"]} artistName={groupData.name} type={"albums"} index={groupData.releases.albums.indexOf(album)}></ReleaseIDisplay>
        ))}
      </div>
      <h1 className="text-2xl text-center">Eps</h1>
      <div className="grid grid-cols-6 justify-items-center">
        {groupData.releases.eps.map((ep) => (
          <>
            {/* <h2>{ep["release name"]}</h2> */}
            <ReleaseIDisplay image={ep["release image"]} name={ep["release name"]} artistName={groupData.name} type={"eps"}></ReleaseIDisplay>
          </>
        ))}
      </div>
      <h1 className="text-2xl text-center">Singles</h1>
      <div className="grid grid-cols-6 mx-auto">
        {groupData.releases.singles.map((single) => (
          <>
            {/* <h2>{single["release name"]}</h2> */}
            <ReleaseIDisplay image={single["release image"]} name={single["release name"]} artistName={groupData.name} type={"singles"}></ReleaseIDisplay>
          </>
        ))}
      </div>
    </>
  )
}

export async function getStaticProps({params}) {
  await dbConnect()

  /* find all the data in our database */
  const groupData = await Group.find({name: params.artist})
  const group = groupData.map((doc) => {
    const group = doc.toObject()
    group._id = group._id.toString()
    return group
  })
  return { props: { groupData: group[0] }}
}

export async function getStaticPaths() {
  await dbConnect()

  const groupData = await Group.find({})
  const groups = groupData.map((doc) => {
    const group = doc.toObject()
    group._id = group._id.toString()
    return group
  })

  const paths = groups.map(group => {
    return {
      params: { artist: group.name }
    }
  })

  return {
    paths,
    fallback: false
  }
}