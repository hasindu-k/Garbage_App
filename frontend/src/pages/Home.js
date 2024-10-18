import { Link } from "react-router-dom";
import Logo from "../assets/logo-icon.png";
import SmartBinImage from "../assets/smart-bin.jpg";
import RecycleImage from "../assets/recycle.svg";
import RealTimeMoniotorImage from "../assets/real_time_monitoring.jpg";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-green-600 text-white py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <img className="h-8 w-8 mr-2" src={Logo} alt="Smart Waste Logo" />
            <h1 className="text-2xl sm:text-3xl font-bold">
              Smart Waste Management
            </h1>
          </div>
          <nav className="flex flex-col sm:flex-row">
            <Link
              to={"/login"}
              className="text-white border border-white py-2 px-4 rounded-md hover:bg-gray-100 hover:text-green-600 mx-1 mb-2 sm:mb-0"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="bg-white text-green-600 border border-white py-2 px-4 rounded-md hover:bg-inherit hover:text-white mx-1"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            Efficient Waste Management for Cleaner Cities
          </h2>
          <p className="text-md sm:text-lg mb-6 text-gray-600">
            Optimize waste collection and management with our smart solutions.
          </p>
          <Link
            to={"/login"}
            className="bg-green-600 text-white py-3 px-6 rounded-md text-lg hover:bg-green-500 transition duration-200"
          >
            Get Started
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-6 mt-6">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src={SmartBinImage}
              alt="Smart Bins"
              className="mx-auto mb-1 w-40 h-40"
            />
            <h3 className="text-xl font-bold text-gray-800">Smart Bins</h3>
            <p className="text-gray-600">
              Automate waste collection with sensor-equipped bins.
            </p>
          </div>
          <div className="text-center">
            <img
              src={RecycleImage}
              alt="Recycling Management"
              className="mx-auto mb-1 w-40 h-40"
            />
            <h3 className="text-xl font-bold text-gray-800">
              Recycling Management
            </h3>
            <p className="text-gray-600">
              Monitor and improve recycling efficiency in urban areas.
            </p>
          </div>
          <div className="text-center">
            <img
              src={RealTimeMoniotorImage}
              alt="Real-time Monitoring"
              className="mx-auto mb-1 w-40 h-40"
            />
            <h3 className="text-xl font-bold text-gray-800">
              Real-time Monitoring
            </h3>
            <p className="text-gray-600">
              Track waste levels and optimize collection routes in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Smart Waste Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
