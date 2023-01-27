import { useRouter } from "next/router"
import dbConnect from "../../../../lib/dbConnect"
import Group from "../../../../models/Group"
import Image from "next/image"

export default function release({releaseData, artistName, artistImage}) {
  return (
    <>
      <main className="bg-red-200 m-20 grid md:grid-cols-2 grid-cols-1 p-8 rounded-2xl shadow-md shadow-gray-500 md:h-[40rem] lg:h-[54rem] lg:p-10">
        <div>
          <h1 className="text-5xl mb-7">{releaseData["release name"]}</h1>
          <Image src={releaseData["release image"]} alt="Image of Release" width={640} height={640} className="aspect-square object-cover object-center rounded-2xl shadow-md shadow-gray-600"/>
          <div className="flex items-center mt-7">
            <Image src={artistImage} alt="Image of Release" width={50} height={50} className="aspect-square object-cover object-center rounded-full"/>
            <h1 className="text-2xl ml-2"> {artistName} </h1>
          </div>
        </div>
        <div className="pr-20 md:ml-10 overflow-y-auto">
          {releaseData["release tracks"].map((track) => (
            <h1 className="text-3xl mt-9">{track["track name"]}</h1>
          ))}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  let artistName = context.query.artist
  let type = context.query.type
  let index = parseInt(context.query.index)
  await dbConnect()

  /* find all the data in our database */
  const groupData = await Group.find({name: artistName})
  const groups = groupData.map((doc) => {
    const group = doc.toObject()
    group._id = group._id.toString()
    return group
  })

  return { props: { releaseData: groups[0]["releases"][type][index], artistName: artistName, artistImage: groups[0]["artist image"]}}
} 