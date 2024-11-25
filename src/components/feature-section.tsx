import { Zap, MessageCircle, Map } from "lucide-react";
import Image from "next/image";

export default function FeatureSection() {
  return (
    <section className="mb-20">
      <h3 className="text-3xl font-bold text-center mb-4">
        Get an itinerary, instantly.
      </h3>
      <p className="text-center text-lg mb-8 max-w-2xl mx-auto">
        Must-visit destinations and dream experiences, all based on your own
        preferences. All that, taking into account hotels and travel.
      </p>
      <div className="flex justify-center mb-12">
        <div className="flex space-x-8">
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground rounded-full p-3 mb-2">
              <Zap className="h-6 w-6" />
            </div>
            <span className="font-semibold">Itinerary</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground rounded-full p-3 mb-2">
              <MessageCircle className="h-6 w-6" />
            </div>
            <span className="font-semibold">AI Chat</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground rounded-full p-3 mb-2">
              <Map className="h-6 w-6" />
            </div>
            <span className="font-semibold">On the go</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
        <div className="p-3 bg-gray-100 border-b flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-gray-500">TripMinder</div>
          <div className="w-4"></div>
        </div>
        <Image
          src="/images/site-promo.png?height=600&width=800"
          alt="TripMinder App Interface"
          width={800}
          height={600}
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
