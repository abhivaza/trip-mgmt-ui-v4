import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { ItineraryResponse } from "@/types/itinerary";

interface TripCardProps {
  trip: ItineraryResponse;
  onEdit: (tripId: string) => void;
  onDelete: (tripId: string) => void;
}

export function TripCard({ trip, onEdit, onDelete }: TripCardProps) {
  return (
    <Link href={`/app/trip/${trip.id}`} className="block">
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <Image
          src={trip.imageURL}
          alt={trip.city}
          width={300}
          height={200}
          className="w-full h-40 object-cover"
        />
        <CardHeader>
          <CardTitle className="text-xl">
            {trip.city}, {trip.country}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="mr-2 h-4 w-4" /> {trip.city}, {trip.country}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />{" "}
            {new Date(trip.startDate).toLocaleDateString()} -{" "}
            {new Date(trip.endDate).toLocaleDateString()}
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={(e) => {
                e.preventDefault();
                onEdit(trip.id);
              }}
              variant="outline"
              className="flex-1"
            >
              Edit <Edit className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                onDelete(trip.id);
              }}
              variant="destructive"
              className="flex-1"
            >
              Delete <Trash2 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
