import Image from "next/image"
import { ShareTrip } from "@/components/share-trip"

interface TripImageProps {
  imageURL: string
  highlight: string
  tripId: string
}

export const TripImage = ({ imageURL, highlight, tripId }: TripImageProps) => {
  return (
    <div className="relative w-full h-[300px] mb-8 rounded-lg overflow-hidden">
      <Image
        src={imageURL || "/placeholder.svg"}
        alt={`${highlight}`}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between p-6">
        <h2 className="text-white text-3xl font-bold drop-shadow-lg">{highlight}</h2>
        <ShareTrip tripId={tripId} className="absolute top-4 right-4" />
      </div>
    </div>
  )
}
