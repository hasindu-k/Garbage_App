import { Link } from "react-router-dom";

export default function Button(props) {
    return (
        <div className="flex justify-between w-full"> {/* Flex container for buttons */}
            <Link to="/CollectedWasteDashboard">
                <button className="bg-green-600 text-white rounded-lg px-8 py-3 hover:bg-green-700 transition duration-300 w-full text-left">{props?.Button1}</button>
            </Link>
            <Link to="/collectedWaste">
                <button className="bg-green-600 text-white rounded-lg px-8 py-3 hover:bg-green-700 transition duration-300 w-full text-right">{props?.Button2}</button>
            </Link>
        </div>
    );
}
