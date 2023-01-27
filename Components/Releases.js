import ReleaseCard from "./ReleaseCard"

export default function Releases({groups, releases}) {
  return (
    <>
      <div className="md:flex justify-evenly px-4 mx-auto">
      {releases.map((release) => (
        <div key={release["_id"]}>
          <h1>{release.name}</h1>
        </div>
      ))}
      </div>
      <div className="md:flex justify-evenly px-4">
      {releases.map((release) => (
        <ReleaseCard key={release["_id"]}></ReleaseCard>
      ))}
      </div>
      <div className="md:flex justify-center px-4 mx-auto">
        <ReleaseCard></ReleaseCard>
        <ReleaseCard></ReleaseCard>
        <ReleaseCard></ReleaseCard>
      </div>
    </>
  )
}
