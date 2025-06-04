import React, { useState, useContext, createContext } from "react";
import { FiSun, FiMoon, FiPlus, FiMap, FiDollarSign, FiUsers, FiCalendar } from "react-icons/fi";


const dummyTrips = [
  {
    id: 1,
    name: "European Adventure 2024",
    destination: "Paris, Rome, Barcelona",
    startDate: "2024-06-01",
    endDate: "2024-06-15",
    status: "planning",
    participants: 6,
    budget: 12000,
    type: "Leisure",
    image: "https://images.unsplash.com/photo-1499856871958-5b9088d4687f"
  },
  {
    id: 2,
    name: "Business Summit Tokyo",
    destination: "Tokyo, Japan",
    startDate: "2024-07-10",
    endDate: "2024-07-15",
    status: "confirmed",
    participants: 4,
    budget: 8000,
    type: "Business",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf"
  }
];

// Added: New Modal Components
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Added: New Trip Form Component
const TripForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    destination: initialData.destination || "",
    startDate: initialData.startDate || "",
    endDate: initialData.endDate || "",
    participants: initialData.participants || "",
    budget: initialData.budget || "",
    type: initialData.type || "Leisure",
    image: initialData.image || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Trip Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      {/* Similar input fields for other trip details */}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        {initialData.id ? "Update Trip" : "Create Trip"}
      </button>
    </form>
  );
};

// Added: Trip Details Component
const TripDetails = ({ trip }) => {
  return (
    <div className="space-y-4">
      <img src={trip.image} alt={trip.name} className="w-full h-64 object-cover rounded-lg" />
      <h2 className="text-2xl font-bold">{trip.name}</h2>
      <div className="space-y-2">
        <p><strong>Destination:</strong> {trip.destination}</p>
        <p><strong>Dates:</strong> {trip.startDate} to {trip.endDate}</p>
        <p><strong>Participants:</strong> {trip.participants}</p>
        <p><strong>Budget:</strong> ${trip.budget}</p>
        <p><strong>Type:</strong> {trip.type}</p>
        <p><strong>Status:</strong> {trip.status}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [trips, setTrips] = useState(dummyTrips);
  const [isNewTripModalOpen, setIsNewTripModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const handleCreateTrip = (tripData) => {
    const newTrip = {
      ...tripData,
      id: trips.length + 1,
      status: "planning"
    };
    setTrips([...trips, newTrip]);
    setIsNewTripModalOpen(false);
  };

  const handleEditTrip = (tripData) => {
    const updatedTrips = trips.map(trip =>
      trip.id === selectedTrip.id ? { ...trip, ...tripData } : trip
    );
    setTrips(updatedTrips);
    setIsEditModalOpen(false);
  };

  return (
    <div className={"min-h-screen bg-gray-50 text-gray-900"}>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Trips</h2>
          <button 
            onClick={() => setIsNewTripModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <FiPlus /> Create New Trip
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <img
                src={trip.image}
                alt={trip.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{trip.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${trip.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {trip.status}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FiMap className="text-gray-500" />
                    <span>{trip.destination}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-gray-500" />
                    <span>{trip.startDate} - {trip.endDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUsers className="text-gray-500" />
                    <span>{trip.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="text-gray-500" />
                    <span>${trip.budget}</span>
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    Edit Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Added: Modals */}
        <Modal isOpen={isNewTripModalOpen} onClose={() => setIsNewTripModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-4">Create New Trip</h2>
          <TripForm onSubmit={handleCreateTrip} />
        </Modal>

        <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
          {selectedTrip && <TripDetails trip={selectedTrip} />}
        </Modal>

        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-4">Edit Trip</h2>
          {selectedTrip && <TripForm onSubmit={handleEditTrip} initialData={selectedTrip} />}
        </Modal>
      </div>
    </div>
  );
};
export default Dashboard;

