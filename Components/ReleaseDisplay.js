import Image from "next/image"
import Link from "next/link"

export default function ReleaseDisplay(props) {
  return (
    <span className="rounded-lg overflow-hidden shadow-xl relative text-center">
      <Link href={{
        pathname: [props.artistName] + "/releases/" + [props.name],
        query: {
            artist: props.artistName,
            type: props.type,
            index: props.index,
          }
      }}>
        <Image src={props.image} alt="Image of Artist" width={640} height={640} className="aspect-square" loading="lazy"/>
        <h1 className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Test</h1>
      </Link>
    </span>
  )
}