import Image from "next/image"
import Link from "next/link";

export default function ReleaseCard(props) {

  const day = props.date.split("/")[1];
  
  return (
    <div className="rounded-2xl mx-auto overflow-hidden max-w-sm bg-white shadow-lg shadow-gray-300 font-poppins pb-5 dark:bg-darkmodeReleaseCard dark:shadow-none">
      <Image src={props.image} alt="Image of Artist" width={640} height={640} className="aspect-square object-cover object-center" loading="lazy"/>
      <div className="flex items-center pl-5 pt-3">
        <Link className='group text-black transition-all duration-300 ease-in-out mr-3' href={{
            pathname: "artists/" + [props.artist]
          }}>
            <span className='text-3xl bg-left-bottom bg-gradient-to-r from-lightmodeRed to-lightmodeRed dark:from-darkmodeRed dark:to-darkmodeRed bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-lightmodeRed dark:text-darkmodeRed'>
              {props.artist}
            </span>
        </Link>
        <h4 className="bg-lightmodeRed px-2 inline rounded-lg text-white text-md dark:bg-darkmodeRed dark:text-black">{day + (day>10 && day<20 ? 'th' : {1:'st', 2:'nd', 3:'rd'}[day % 10] || 'th')}</h4>
      </div>
      <h3 className="pl-5 mb-2 mt-2 text-xl">{props.name}</h3>
    </div>
  )
}