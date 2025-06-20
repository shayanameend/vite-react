import "./demo.css";

import {
  ArrowLeft,
  Calendar,
  Check,
  Filter,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";

interface Artisan {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  hourlyRate: number;
  avatar: string;
  verified: boolean;
  services: string[];
  portfolio: number;
  description: string;
}

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showSearch?: boolean;
}

interface ArtisanCardProps {
  artisan: Artisan;
}

const ArtisanApp = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [bookingStep, setBookingStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const artisans = [
    {
      id: 1,
      name: "Marco Grey",
      specialty: "Electrical & Solar",
      rating: 4.9,
      reviews: 127,
      location: "Sandton, Johannesburg",
      hourlyRate: 350,
      avatar: "👨🏻‍🔧",
      verified: true,
      services: ["Electrical wiring", "Solar installations", "Home automation"],
      portfolio: 3,
      description:
        "Certified electrician with 8+ years experience. Specializing in solar power and smart home systems.",
    },
    {
      id: 2,
      name: "Lyle Witbooi",
      specialty: "Carpentry & Furniture",
      rating: 4.8,
      reviews: 89,
      location: "Cape Town, Western Cape",
      hourlyRate: 320,
      avatar: "👨🏽‍🔧",
      verified: true,
      services: ["Custom furniture", "Kitchen cabinets", "Wood flooring"],
      portfolio: 5,
      description:
        "Master carpenter specializing in custom furniture and cabinetry. Known for quality craftsmanship and reliable service.",
    },
    {
      id: 3,
      name: "James Ndlovu",
      specialty: "Carpentry & Furniture",
      rating: 4.9,
      reviews: 156,
      location: "Durban, KwaZulu-Natal",
      hourlyRate: 280,
      avatar: "👨🏿‍🔧",
      verified: true,
      services: ["Custom furniture", "Kitchen cabinets", "Wood flooring"],
      portfolio: 8,
      description:
        "Skilled carpenter creating custom furniture and cabinetry. 12 years of experience in fine woodworking.",
    },
  ];

  const services = [
    { id: "electrical", name: "Electrical", icon: "⚡" },
    { id: "plumbing", name: "Plumbing", icon: "🔧" },
    { id: "carpentry", name: "Carpentry", icon: "🔨" },
    { id: "painting", name: "Painting", icon: "🎨" },
    { id: "tiling", name: "Tiling", icon: "🏠" },
    { id: "solar", name: "Solar", icon: "☀️" },
  ];

  const Header = ({
    title,
    showBack = false,
    showSearch = false,
  }: HeaderProps) => (
    <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        {showBack && (
          <ArrowLeft
            className="w-6 h-6 mr-3 cursor-pointer"
            onClick={() => {
              if (currentScreen === "artisan-detail") setCurrentScreen("home");
              if (currentScreen === "booking")
                setCurrentScreen("artisan-detail");
            }}
          />
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      {showSearch && (
        <div className="flex items-center">
          <Search className="w-6 h-6 mr-2" />
          <Filter className="w-6 h-6" />
        </div>
      )}
    </div>
  );

  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex">
      {[
        { id: "home", icon: Home, label: "Home" },
        { id: "bookings", icon: Calendar, label: "Bookings" },
        { id: "messages", icon: MessageCircle, label: "Messages" },
        { id: "profile", icon: User, label: "Profile" },
      ].map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setCurrentScreen(item.id)}
          className={`flex-1 py-3 flex flex-col items-center ${
            currentScreen === item.id ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <item.icon className="w-5 h-5 mb-1" />
          <span className="text-xs">{item.label}</span>
        </button>
      ))}
    </div>
  );

  const ArtisanCard = ({ artisan }: ArtisanCardProps) => (
    <button
      type="button"
      className="w-full bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer hover:shadow-lg transition-shadow text-left"
      onClick={() => {
        setSelectedArtisan(artisan);
        setCurrentScreen("artisan-detail");
      }}
    >
      <div className="flex items-start">
        <div className="text-4xl mr-4">{artisan.avatar}</div>
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <h3 className="font-bold text-lg">{artisan.name}</h3>
            {artisan.verified && (
              <div className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                ✓ Verified
              </div>
            )}
          </div>
          <p className="text-gray-600 mb-2">{artisan.specialty}</p>
          <div className="flex items-center mb-2">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium">{artisan.rating}</span>
            <span className="ml-1 text-sm text-gray-500">
              ({artisan.reviews} reviews)
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            {artisan.location}
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-blue-600">
              R{artisan.hourlyRate}/hour
            </span>
            <span className="text-sm text-gray-500">
              {artisan.portfolio} portfolio items
            </span>
          </div>
        </div>
      </div>
    </button>
  );

  const HomeScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">CraftConnect</h1>
          <div className="flex items-center">
            <Search className="w-6 h-6 mr-2" />
            <Filter className="w-6 h-6" />
          </div>
        </div>
        <p className="text-blue-100 text-lg">
          Find skilled, verified artisans for your home and business projects
        </p>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by service or location..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Service Categories */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-3">Popular Services</h2>
        <div className="grid grid-cols-3 gap-3">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">{service.icon}</div>
              <span className="text-sm font-medium">{service.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Artisans */}
      <div className="px-4">
        <h2 className="text-lg font-bold mb-3">Top Rated Artisans</h2>
        {artisans.map((artisan) => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))}
      </div>
    </div>
  );

  const ArtisanDetailScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <ArrowLeft
          className="w-6 h-6 mr-3 cursor-pointer"
          onClick={() => setCurrentScreen("home")}
        />
        <h1 className="text-xl font-bold">CraftConnect</h1>
      </div>

      {selectedArtisan && (
        <div className="p-4">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex items-center mb-4">
              <div className="text-6xl mr-4">{selectedArtisan.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h1 className="text-2xl font-bold">{selectedArtisan.name}</h1>
                  {selectedArtisan.verified && (
                    <div className="ml-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      ✓ Verified
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-lg">
                  {selectedArtisan.specialty}
                </p>
                <div className="flex items-center mt-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="ml-1 text-lg font-medium">
                    {selectedArtisan.rating}
                  </span>
                  <span className="ml-2 text-gray-500">
                    ({selectedArtisan.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{selectedArtisan.description}</p>

            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              {selectedArtisan.location}
            </div>

            <div className="text-2xl font-bold text-blue-600 mb-4">
              R{selectedArtisan.hourlyRate}/hour
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                onClick={() => setCurrentScreen("booking")}
              >
                Book Now
              </button>
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 rounded-lg"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 rounded-lg"
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-xl font-bold mb-3">Services Offered</h2>
            <div className="space-y-2">
              {selectedArtisan.services.map((service: string) => (
                <div key={service} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-3">
              Portfolio ({selectedArtisan.portfolio} items)
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-gray-200 rounded-lg h-32 flex items-center justify-center"
                >
                  <span className="text-gray-500">Project {item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const BookingScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <ArrowLeft
          className="w-6 h-6 mr-3 cursor-pointer"
          onClick={() => setCurrentScreen("artisan-detail")}
        />
        <h1 className="text-xl font-bold">CraftConnect</h1>
      </div>

      <div className="p-4">
        {/* Progress Bar */}
        <div className="flex items-center mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= bookingStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-8 h-1 ${
                    step < bookingStep ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {bookingStep === 1 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Select Service</h2>
            <div className="space-y-3">
              {selectedArtisan?.services.map((service: string) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className={`w-full p-4 text-left border rounded-lg ${
                    selectedService === service
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <label
                htmlFor="project-description"
                className="block text-sm font-medium mb-2"
              >
                Describe your project
              </label>
              <textarea
                id="project-description"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Tell us about your project requirements..."
              />
            </div>

            <button
              type="button"
              onClick={() => setBookingStep(2)}
              disabled={!selectedService}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-300"
            >
              Continue
            </button>
          </div>
        )}

        {bookingStep === 2 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Schedule & Location</h2>

            <div className="mb-4">
              <label
                htmlFor="preferred-date"
                className="block text-sm font-medium mb-2"
              >
                Preferred Date
              </label>
              <input
                id="preferred-date"
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="preferred-time"
                className="block text-sm font-medium mb-2"
              >
                Preferred Time
              </label>
              <select
                id="preferred-time"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Morning (8AM - 12PM)</option>
                <option>Afternoon (12PM - 5PM)</option>
                <option>Evening (5PM - 8PM)</option>
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="service-location"
                className="block text-sm font-medium mb-2"
              >
                Service Location
              </label>
              <input
                id="service-location"
                type="text"
                placeholder="Enter your address..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              onClick={() => setBookingStep(3)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
            >
              Continue
            </button>
          </div>
        )}

        {bookingStep === 3 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Artisan:</span>
                <span className="font-medium">{selectedArtisan?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium">{selectedService}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Rate:</span>
                <span className="font-medium">
                  R{selectedArtisan?.hourlyRate}/hour
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Booking Fee:</span>
                <span className="font-medium">R25</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Total (booking fee):</span>
                <span>R25</span>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-6">
              You'll only pay the booking fee now. Final project cost will be
              agreed with the artisan.
            </div>

            <button
              type="button"
              onClick={() => {
                alert(
                  "Booking confirmed! The artisan will contact you shortly."
                );
                setCurrentScreen("bookings");
                setBookingStep(1);
              }}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
            >
              Confirm & Pay R25
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const BookingsScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">CraftConnect</h1>
      </div>
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">Electrical Installation</h3>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              Pending
            </span>
          </div>
          <p className="text-gray-600 mb-2">Marco Grey • Today at 2:00 PM</p>
          <p className="text-sm text-gray-500">
            Solar panel installation for home office
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">Custom Kitchen Cabinets</h3>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Completed
            </span>
          </div>
          <p className="text-gray-600 mb-2">Lyle Witbooi • June 15</p>
          <p className="text-sm text-gray-500">
            Custom kitchen cabinet design and installation
          </p>
        </div>
      </div>
    </div>
  );

  const MessagesScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Messages" />
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center">
          <div className="text-3xl mr-4">👨🏻‍🔧</div>
          <div className="flex-1">
            <h3 className="font-bold">Marco Grey</h3>
            <p className="text-gray-500 text-sm">
              I'll be there at 2 PM as scheduled
            </p>
          </div>
          <div className="text-xs text-gray-400">10:30 AM</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
          <div className="text-3xl mr-4">👨🏽‍🔧</div>
          <div className="flex-1">
            <h3 className="font-bold">Lyle Witbooi</h3>
            <p className="text-gray-500 text-sm">
              Thank you for the great review!
            </p>
          </div>
          <div className="text-xs text-gray-400">Yesterday</div>
        </div>
      </div>
    </div>
  );

  const ProfileScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Profile" />
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">John Smith</h2>
              <p className="text-gray-600">Cape Town, Western Cape</p>
            </div>
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
          >
            Edit Profile
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-lg mb-4">Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Notifications</span>
              <div className="w-12 h-6 bg-blue-600 rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <span>Location Services</span>
              <div className="w-12 h-6 bg-gray-300 rounded-full" />
            </div>
            <button
              type="button"
              className="w-full text-left text-gray-600 py-2"
            >
              Payment Methods
            </button>
            <button
              type="button"
              className="w-full text-left text-gray-600 py-2"
            >
              Help & Support
            </button>
            <button
              type="button"
              className="w-full text-left text-red-600 py-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen />;
      case "artisan-detail":
        return <ArtisanDetailScreen />;
      case "booking":
        return <BookingScreen />;
      case "bookings":
        return <BookingsScreen />;
      case "messages":
        return <MessagesScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg min-h-screen relative">
      {renderScreen()}
      <BottomNav />
    </div>
  );
};

export default function Demo() {
  return (
    <>
      <ArtisanApp />
    </>
  );
}
