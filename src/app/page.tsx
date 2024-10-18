"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Calendar,
  ArrowRight,
  LogIn,
  ChevronLeft,
  ChevronRight,
  Menu,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Zap,
  MessageCircle,
  Map,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

export default function Home() {
  const [destination, setDestination] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const popularDestinations = [
    {
      name: "Kiwi Paradise in New Zealand",
      location: "New Zealand",
      duration: "8 days",
      image: "/images/paris.png?height=200&width=300",
    },
    {
      name: "Renaissance Expedition in Italy",
      location: "Italy",
      duration: "5 days",
      image: "/images/paris.png?height=200&width=300",
    },
    {
      name: "Cherry Blossoms and Temples in Japan",
      location: "Japan",
      duration: "6 days",
      image: "/images/paris.png?height=200&width=300",
    },
    {
      name: "Canadian Northern Lights Adventure",
      location: "Canada",
      duration: "12 days",
      image: "/images/paris.png?height=200&width=300",
    },
    {
      name: "Sahara Desert Expedition",
      location: "Morocco",
      duration: "7 days",
      image: "/images/paris.png?height=200&width=300",
    },
    {
      name: "Amazon Rainforest Adventure",
      location: "Brazil",
      duration: "10 days",
      image: "/images/paris.png?height=200&width=300",
    },
  ];

  const handleGenerateItinerary = async () => {
    if (!destination) {
      toast({
        title: "Destination required",
        description: "Please enter a destination for your trip.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ destination }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate itinerary");
      }

      const data = await response.json();
      router.push(`/itinerary/${data.id}`);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#ffe4e6] to-[#dbeafe]">
      <header className="py-4 px-4 md:px-8 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-3xl md:text-4xl font-bold">
              <svg
                height="50"
                viewBox="0 0 369.65517241379314 71.3211525244027"
              >
                <g
                  id="SvgjsG4090"
                  transform="matrix(0.7132115252440271,0,0,0.7132115252440271,-5.488162469097904,1.700428784475391e-7)"
                  fill="#fda4af"
                >
                  <g xmlns="http://www.w3.org/2000/svg">
                    <path d="M62.549,48.452l-0.898,0.659c1.846,2.5,2.822,5.469,2.822,8.584h0.557h0.557H76.45l-11.323-3.76   C64.644,51.968,63.774,50.112,62.549,48.452z"></path>
                    <path d="M37.451,66.943l0.898-0.659c-1.846-2.505-2.822-5.474-2.822-8.589h-0.557h-0.557H23.55l11.323,3.765   C35.356,63.423,36.226,65.278,37.451,66.943z"></path>
                    <path d="M60.625,47.07l0.396-0.396l7.681-7.681l-10.664,5.347c-1.733-1.05-3.657-1.748-5.703-2.056l-0.166,1.104   c3.071,0.459,5.859,1.87,8.066,4.072L60.625,47.07z"></path>
                    <path d="M39.375,68.325l-0.396,0.391l-7.681,7.681l10.664-5.342c1.733,1.045,3.657,1.743,5.703,2.051l0.166-1.099   c-3.071-0.464-5.859-1.875-8.066-4.077L39.375,68.325z"></path>
                    <path d="M35.688,55.527c0.156-1.011,0.42-1.992,0.771-2.93l-0.718-1.196c-0.552,1.25-0.942,2.578-1.152,3.96L35.688,55.527z"></path>
                    <path d="M50,43.223v-0.557v-0.557V31.25l-3.76,11.318c-0.869,0.215-1.719,0.508-2.534,0.869l1.196,0.718   C46.514,43.55,48.232,43.223,50,43.223z"></path>
                    <path d="M64.312,59.863c-0.156,1.016-0.42,1.992-0.771,2.935l0.718,1.191c0.552-1.25,0.942-2.578,1.152-3.96L64.312,59.863z"></path>
                    <path d="M50,72.168v0.557v0.557v10.864l3.76-11.323c0.869-0.215,1.719-0.508,2.534-0.869l-1.196-0.718   C53.486,71.846,51.768,72.168,50,72.168z"></path>
                    <path d="M52.368,56.245c0.654,1.074,0.527,2.49-0.4,3.418s-2.344,1.06-3.418,0.4l-3.291,3.291l26.172,15.771L55.659,52.954   L52.368,56.245z"></path>
                    <path d="M47.632,59.146c-0.654-1.069-0.527-2.49,0.4-3.418s2.344-1.055,3.418-0.4l3.291-3.291L28.569,36.265l15.771,26.172   L47.632,59.146z"></path>
                    <path d="M54.258,15.605c-0.156-2.217-2.002-3.965-4.258-3.965s-4.102,1.748-4.258,3.965c-21.333,2.144-38.047,20.2-38.047,42.09   C7.695,81.021,26.675,100,50,100s42.305-18.979,42.305-42.305C92.305,35.806,75.591,17.749,54.258,15.605z M75.762,82.285   c-0.327-0.313-0.84-0.313-1.162,0.01s-0.322,0.84-0.01,1.167c-3.047,2.905-6.602,5.278-10.522,6.968   c-0.176-0.425-0.659-0.63-1.084-0.459s-0.63,0.654-0.464,1.079c-3.647,1.372-7.583,2.153-11.685,2.251   c-0.015-0.454-0.381-0.815-0.835-0.815s-0.82,0.361-0.835,0.815c-4.36-0.103-8.525-0.986-12.363-2.515   c0.176-0.425-0.024-0.908-0.444-1.089c-0.42-0.176-0.903,0.015-1.089,0.435c-3.657-1.665-6.987-3.931-9.858-6.67   c0.313-0.327,0.313-0.845-0.01-1.167s-0.835-0.322-1.162-0.01c-2.91-3.047-5.283-6.602-6.973-10.522   c0.425-0.171,0.63-0.659,0.459-1.084s-0.654-0.63-1.079-0.464c-1.372-3.647-2.153-7.583-2.246-11.685   c0.449-0.015,0.811-0.381,0.811-0.835s-0.361-0.82-0.811-0.83c0.098-4.365,0.981-8.53,2.51-12.368   c0.425,0.176,0.908-0.02,1.089-0.444c0.176-0.42-0.015-0.903-0.43-1.089c1.665-3.657,3.926-6.987,6.67-9.858   c0.327,0.313,0.84,0.313,1.162-0.01s0.322-0.835,0.01-1.162c3.047-2.905,6.602-5.283,10.522-6.973   c0.176,0.425,0.659,0.63,1.084,0.459s0.63-0.654,0.464-1.079c3.403-1.279,7.051-2.051,10.854-2.227L50,25.571l1.665-3.457   c4.058,0.186,7.939,1.06,11.533,2.495c-0.176,0.42,0.024,0.903,0.444,1.084s0.903-0.015,1.089-0.43   c3.662,1.665,6.987,3.926,9.858,6.67c-0.313,0.327-0.313,0.84,0.01,1.162s0.84,0.322,1.162,0.015   c2.91,3.042,5.283,6.597,6.973,10.518c-0.425,0.176-0.63,0.659-0.459,1.084s0.654,0.635,1.079,0.464   c1.372,3.652,2.153,7.583,2.246,11.689c-0.449,0.01-0.811,0.376-0.811,0.83s0.361,0.82,0.811,0.835   c-0.098,4.36-0.981,8.525-2.51,12.363c-0.425-0.176-0.908,0.024-1.089,0.444c-0.176,0.42,0.015,0.908,0.43,1.089   C80.767,76.089,78.506,79.414,75.762,82.285z"></path>
                    <path d="M44.561,14.39c0.156-0.547,0.396-1.064,0.708-1.528c-1.255-0.391-2.354-1.045-2.612-2.148   c-0.439-1.885,0.156-4.028,1.626-5.879C45.83,2.881,48.022,1.67,50,1.67s4.17,1.211,5.718,3.164   c1.47,1.851,2.065,3.994,1.626,5.879c-0.259,1.104-1.357,1.758-2.612,2.148c0.308,0.464,0.552,0.981,0.708,1.528   c1.66-0.562,3.12-1.548,3.53-3.301c0.552-2.383-0.156-5.039-1.943-7.295C55.166,1.455,52.476,0,50,0s-5.166,1.455-7.026,3.794   c-1.787,2.256-2.495,4.912-1.943,7.295C41.44,12.842,42.9,13.828,44.561,14.39z"></path>
                  </g>
                </g>
                <g
                  id="SvgjsG4091"
                  transform="matrix(0.615163280317642,0,0,0.615163280317642,76.97216696318189,23.23092152653373)"
                  fill="#48466d"
                >
                  <path d="M23.281 7.5 l11.797 0 l0 -6.0938 l-30.156 0 l0 6.0938 l18.359 0 z M16.719 13.594000000000001 l6.5625 0 l0 25 l-6.5625 0 l0 -25 z M75.781 38.5937 l-10.078 -14.063 c1.3541 -0.41664 2.552 -0.91141 3.5937 -1.4843 c1.1459 -0.72914 2.0834 -1.5364 2.8125 -2.4218 c0.83336 -0.98961 1.4323 -2.0573 1.797 -3.2032 c0.46875 -1.25 0.70313 -2.6563 0.70313 -4.2188 c0 -1.8229 -0.3125 -3.4635 -0.9375 -4.9219 c-0.625 -1.4063 -1.5365 -2.6302 -2.7344 -3.6719 c-1.1459 -0.98961 -2.6042 -1.7709 -4.3751 -2.3438 c-1.8229 -0.57289 -3.75 -0.85938 -5.7813 -0.85938 l-16.563 0 l0 5.9375 l16.016 0 c2.4479 0 4.3489 0.52086 5.703 1.5625 s2.0313 2.6041 2.0313 4.6875 c0 1.9271 -0.67711 3.4375 -2.0313 4.5313 c-1.3541 1.1459 -3.2291 1.7188 -5.625 1.7188 l-16.094 0 l0 18.75 l6.4844 0 l0 -12.969 l8.2031 0 l9.1406 12.969 l7.7344 0 l0 0 z M110.703 38.5937 l7.0313 0 l-13.594 -37.266 l-7.1094 0 l7.8906 22.266 z M81.9531 38.5937 l6.875 0 l8.125 -19.844 l-3.3594 -8.9063 z M128.9844 1.328000000000003 l-7.0313 0 l13.594 37.266 l7.1094 0 l-7.8906 -22.344 z M157.734 1.328000000000003 l-6.875 0 l-8.125 19.844 l3.3594 8.9063 z M166.0938 1.4059999999999988 l27.813 0 l0 5.9375 l-27.813 0 l0 -5.9375 z M166.0938 32.6562 l27.734 0 l0 5.9375 l-27.734 0 l0 -5.9375 z M166.0938 16.875 l25.078 0 l0 5.8594 l-25.078 0 l0 -5.8594 z M207.0313 1.4059999999999988 l6.4063 0 l0 31.25 l19.531 0 l0 5.9375 l-25.938 0 l0 -37.188 z M271.953 38.5937 l6.5625 0 l0 -27.422 l-6.5625 9.6094 l0 17.813 z M278.516 1.4059999999999988 l-7.0313 0 l-11.484 17.813 l-11.406 -17.813 l-7.0313 0 l0 37.188 l6.5625 0 l0 -26.406 l11.719 17.578 l0.23438 0 l10.234 -15.156 c0.052109 -0.20836 2.7865 -4.6094 8.2031 -13.203 z M303.281 16.875 l0 -15.547 l-6.5625 0 l0 37.344 l6.5625 0 l0 -21.797 z M323.8281 38.5937 l6.4844 0 l0 -19.922 l-6.4844 -9.1406 l0 29.063 z M349.766 1.4059999999999988 l0 25.703 l-18.359 -25.703 l-7.0313 0 l26.406 37.188 l5.3906 0 l0 -37.188 l-6.4063 0 z M392.813 27.344 c-0.98961 2.3959 -2.3438 4.375 -4.0625 5.9375 c-1.7709 1.6666 -3.8542 2.9688 -6.2501 3.9063 s-5.0781 1.4063 -8.0469 1.4063 l-8.6719 0 l0 -5.9375 l8.5938 0 c1.9791 0 3.776 -0.3125 5.3906 -0.9375 c1.5625 -0.625 2.9166 -1.5104 4.0625 -2.6563 s2.0313 -2.5 2.6563 -4.0625 s0.9375 -3.2813 0.9375 -5.1563 c0 -1.8229 -0.3125 -3.5156 -0.9375 -5.0781 c-0.625 -1.6146 -1.5104 -2.9427 -2.6563 -3.9844 c-1.0416 -1.0938 -2.3958 -1.9791 -4.0624 -2.6563 c-1.6666 -0.625 -3.4635 -0.9375 -5.3906 -0.9375 l-8.5938 0 l0 -5.9375 l8.6719 0 c2.7604 0 5.4166 0.49477 7.9688 1.4844 c2.3959 0.88539 4.5052 2.2135 6.3281 3.9844 c1.7709 1.6146 3.125 3.5938 4.0625 5.9375 c0.98961 2.3959 1.4844 4.8438 1.4844 7.3438 c0 2.7084 -0.49477 5.1563 -1.4844 7.3438 z M406.0938 1.4059999999999988 l27.813 0 l0 5.9375 l-27.813 0 l0 -5.9375 z M406.0938 32.6562 l27.734 0 l0 5.9375 l-27.734 0 l0 -5.9375 z M406.0938 16.875 l25.078 0 l0 5.8594 l-25.078 0 l0 -5.8594 z M475.781 38.5937 l-10.078 -14.063 c1.3541 -0.41664 2.552 -0.91141 3.5937 -1.4843 c1.1459 -0.72914 2.0834 -1.5364 2.8125 -2.4218 c0.83336 -0.98961 1.4323 -2.0573 1.797 -3.2032 c0.46875 -1.25 0.70313 -2.6563 0.70313 -4.2188 c0 -1.8229 -0.3125 -3.4635 -0.9375 -4.9219 c-0.625 -1.4063 -1.5365 -2.6302 -2.7344 -3.6719 c-1.1459 -0.98961 -2.6042 -1.7709 -4.3751 -2.3438 c-1.8229 -0.57289 -3.75 -0.85938 -5.7813 -0.85938 l-16.563 0 l0 5.9375 l16.016 0 c2.4479 0 4.3489 0.52086 5.703 1.5625 s2.0313 2.6041 2.0313 4.6875 c0 1.9271 -0.67711 3.4375 -2.0313 4.5313 c-1.3541 1.1459 -3.2291 1.7188 -5.625 1.7188 l-16.094 0 l0 18.75 l6.4844 0 l0 -12.969 l8.2031 0 l9.1406 12.969 l7.7344 0 l0 0 z"></path>
                </g>
              </svg>{" "}
            </Link>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-4">
                <Link
                  href="#features"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="#explore"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Explore trips
                </Link>
                <Link
                  href="#beta"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Try out the beta
                </Link>
              </nav>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center"
              >
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
          {isMenuOpen && (
            <nav className="mt-4 flex flex-col space-y-2 md:hidden">
              <Link
                href="#features"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                href="#explore"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Explore trips
              </Link>
              <Link
                href="#beta"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Try out the beta
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center w-full justify-center"
              >
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Plan travel with AI
        </h2>
        <p className="text-xl mb-8 text-center">
          Making memories, without the planning headaches.
        </p>

        <div className="max-w-xl mx-auto mb-12">
          <div className="flex items-center bg-white rounded-lg shadow-md">
            <Input
              type="text"
              placeholder="Vineyard tour in South of France"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="flex-grow border-none focus:ring-0"
            />
            <Button
              onClick={handleGenerateItinerary}
              disabled={isLoading}
              className="ml-2"
            >
              {isLoading ? "Generating..." : "Let's go"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">Popular Destinations</h3>
            <div className="flex space-x-2">
              <Button onClick={scrollPrev} variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button onClick={scrollNext} variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {popularDestinations.map((dest, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4 first:pl-0"
                >
                  <Card className="overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{dest.name}</h4>
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <MapPin className="mr-1 h-4 w-4" /> {dest.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-1 h-4 w-4" /> {dest.duration}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
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
            <div className="p-4 bg-gray-100 border-b flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-sm text-gray-500">highlights.ai</div>
              <div className="w-4"></div>
            </div>
            <Image
              src="/images/paris.png?height=600&width=800"
              alt="Highlights.AI App Interface"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">About Us</h4>
              <p className="text-sm text-gray-600">
                Highlights.AI is revolutionizing travel planning with AI-powered
                itineraries tailored to your preferences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    Explore Trips
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8  border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Highlights.AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
