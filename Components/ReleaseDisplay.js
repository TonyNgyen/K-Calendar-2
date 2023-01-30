import Image from "next/image"
import Link from "next/link"

export default function ReleaseDisplay(props) {
  return (
    <span className="rounded-lg overflow-hidden shadow-xl relative text-center group">
      <Link href={{
        pathname: [props.artistName] + "/releases/" + [props.name],
        query: {
            artist: props.artistName,
            type: props.type,
            index: props.index,
          }
      }}>
        <Image src={props.image} alt="Image of Artist" width={640} height={640} className="aspect-square group-hover:opacity-30" loading="lazy"/>
        <h1 className="transition absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:scale-110 duration-[400ms] text-xl font-poppins w-10/12">{props.name}</h1>
      </Link>
    </span>
  )
}