import Image from "next/image"
import Link from "next/link";

export default function ReleaseCard(props) {

  const day = props.date.split("/")[1];
  
  return (
    <div className="text-center rounded-2xl mx-auto overflow-hidden max-w-sm bg-white shadow-lg shadow-gray-300 font-poppins pb-5">
      <div className="m-4">
        <Link className='group text-black transition-all duration-300 ease-in-out' href={{
          pathname: "artists/" + [props.artist]
        }}>
          <span className='text-2xl bg-left-bottom bg-gradient-to-r from-lightmodeRed to-lightmodeRed bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-lightmodeRed'>
            {props.artist}
          </span>
        </Link>
      </div>
      <Image src={props.image} alt="Image of Artist" width={640} height={640} className="aspect-square object-cover object-center" loading="lazy"/>
      <h3 className="mt-3 mb-2 text-xl">{props.name}</h3>
      <h4 className="my-3 bg-lightmodeRed px-2 inline rounded-lg text-white">{day + (day>10 && day<20 ? 'th' : {1:'st', 2:'nd', 3:'rd'}[day % 10] || 'th')}</h4>
    </div>
  )
}