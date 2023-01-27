import Link from "next/link"
import Image from "next/image"

export default function ArtistDisplay(props) {
  return (
    <span className="rounded-lg overflow-hidden shadow-xl">
      <Link href={{
        pathname: "/artists/" + [props.name]
      }}>
        <Image src={props.image} alt="Image of Artist" width={640} height={640} className="aspect-square" loading="lazy"/>
      </Link>
    </span>
  )
}