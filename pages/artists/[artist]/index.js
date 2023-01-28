import dbConnect from "../../../lib/dbConnect"
import Group from "../../../models/Group"
import Image from "next/image"
import ReleaseDisplay from "../../../Components/ReleaseDisplay"
import ArtistDisplay from "../../../Components/ArtistDisplay"

export default function artist({groupData}) {

  return (
    <>
      <div className="mt-20 mb-20 px-10">
        <h1 className="text-center text-7xl m-10 font-medium font-poppins">{groupData.name}</h1>
        <Image src={groupData["artist image"]} alt="Image of Artist" width={640} height={640} className="aspect-square object-cover object-center mx-auto rounded-lg shadow-xl"/>
      </div>

      <h1 className="text-5xl text-center mb-10 font-poppins">Albums</h1>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 justify-items-center grid-cols-2 gap-5 lg:px-20 md:px-15 px-10 mb-20">
        {groupData.releases.albums.map((album) => (
          <ReleaseDisplay image={album["release image"]} name={album["release name"]} artistName={groupData.name} type={"albums"} index={groupData.releases.albums.indexOf(album)} key={groupData.releases.albums.indexOf(album)}></ReleaseDisplay>
        ))}
      </div>

      <h1 className="text-5xl text-center mb-10 font-poppins">Eps</h1>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 justify-items-center grid-cols-2 gap-5 lg:px-20 md:px-15 px-10 mb-20">
        {groupData.releases.eps.map((ep) => (
          <ReleaseDisplay image={ep["release image"]} name={ep["release name"]} artistName={groupData.name} type={"eps"} index={groupData.releases.eps.indexOf(ep)} key={groupData.releases.eps.indexOf(ep)}></ReleaseDisplay>
        ))}
      </div>

      <h1 className="text-5xl text-center mb-10 font-poppins">Singles</h1>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 justify-items-center grid-cols-2 gap-5 lg:px-20 md:px-15 px-10 mb-20">
        {groupData.releases.singles.map((single) => (
          <ReleaseDisplay image={single["release image"]} name={single["release name"]} artistName={groupData.name} type={"singles"} index={groupData.releases.singles.indexOf(single)} key={groupData.releases.singles.indexOf(single)}></ReleaseDisplay>
        ))}
      </div>

      <h1 className="text-5xl text-center mb-10 font-poppins">Related Artists</h1>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 justify-items-center grid-cols-2 gap-5 lg:px-20 md:px-15 px-10 mb-20">
        {groupData["related artists"].map((artist) => (
          <ArtistDisplay image={artist.image} name={artist.name} key={artist.id}></ArtistDisplay>
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