import { Zap, Map, ArrowRight, Sparkles } from "lucide-react";

export default function FeatureSection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-4">
          Get an itinerary, instantly.
        </h3>
        <p className="text-center text-lg mb-8 max-w-2xl mx-auto">
          Must-visit destinations and dream experiences, all based on your own
          preferences and interests.
        </p>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground rounded-full p-4 mb-6 shadow-lg shadow-primary/20">
                  <Zap className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-center">
                  Plan Your Trip
                </h4>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 w-full flex-1 flex flex-col min-h-[200px]">
                  <ul className="space-y-3 flex-1">
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span>Tell us your travel preferences and dates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span>Get a personalized itinerary in seconds</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span>Optimized for your interests and activities</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground rounded-full p-4 mb-6 shadow-lg shadow-primary/20">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-center">
                  Recommendations with AI
                </h4>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 w-full flex-1 flex flex-col min-h-[200px]">
                  <div className="space-y-3 flex-1">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">More outdoor activities</p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3 max-w-[80%] ml-auto">
                      <p className="text-sm">
                        I&apos;ve updated your itinerary with hiking at Sunset
                        Peak and kayaking at Crystal Bay.
                      </p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        Perfect! Now add restaurant recommendations
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground rounded-full p-4 mb-6 shadow-lg shadow-primary/20">
                  <Map className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-center">
                  Travel with Confidence
                </h4>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 w-full flex-1 flex flex-col min-h-[200px]">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 text-green-600 p-1.5 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                      <p className="text-sm">
                        Use as your personal diary to track trip on the go
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 text-green-600 p-1.5 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                      <p className="text-sm">
                        Share with your friends and family to keep everyone
                        organized
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 text-green-600 p-1.5 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                      <p className="text-sm">
                        Streamlined user experience for mobile devices
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
