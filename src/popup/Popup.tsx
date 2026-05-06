const Popup = () => {
  return (
    <div className="w-[320px] min-h-[400px] bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">
        Productivity Tracker
      </h1>

      <div className="bg-gray-800 rounded-xl p-4">
        <p className="text-sm text-gray-400">
          Current Session
        </p>

        <h2 className="text-xl font-semibold mt-2">
          No Active Session
        </h2>

        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg">
          Start Session
        </button>
      </div>
    </div>
  );
};

export default Popup;
