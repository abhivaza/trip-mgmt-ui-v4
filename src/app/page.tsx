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
              Highlights.AI
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
