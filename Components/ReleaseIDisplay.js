import Image from "next/image"
import Link from "next/link"

export default function ReleaseIDisplay(props) {
  return (
    <span className="rounded-lg overflow-hidden shadow-xl">
      <Link href={{
        pathname: "releases/" + [props.name],
        query: {
            artist: props.artistName,
            type: props.type,
            index: props.index,
          }
      }}>
        <Image src={props.image} alt="Image of Artist" width={640} height={640} className="aspect-square" loading="lazy"/>
      </Link>
    </span>
  )
}