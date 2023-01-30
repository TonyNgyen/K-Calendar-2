import Image from "next/image"
import Link from "next/link"

export default function ArtistCard(props) {
  return (
    <div className="text-center rounded-2xl mx-auto overflow-hidden max-w-sm bg-white shadow-lg shadow-gray-300 hover:scale-105 duration-[400ms]">
      <Link href={{
        pathname: "artists/" + [props.name]
      }}>
        <Image src={props.image} alt="Image of Artist" width={640} height={640} className="aspect-square object-cover object-center" loading="lazy"/>
        <h4 className="my-2 text-xl text-lightmodeRed font-poppins">{props.name}</h4>
      </Link>
    </div>
  )
}