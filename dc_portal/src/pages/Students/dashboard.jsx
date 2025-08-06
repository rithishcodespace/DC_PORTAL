import React from 'react';

const complaints = [
  {
    date: "02 APR 2025 - 02:00 PM",
    code: "N/A",
    venue: "IT lab-1",
    details: "Using mobile phone inside the lab",
    timer: "00:00:00"
  },
  {
    date: "30 MAR 2025 - 11:00 AM",
    code: "N/A",
    venue: "CT lab",
    details: "Not wearing ID card during PS assessment",
    timer: "00:00:00"
  },
  {
    date: "21 MAR 2025 - 10:00 AM",
    code: "N/A",
    venue: "Cyber security lab",
    details: "Dress code not followed",
    timer: "04:22:18"
  },
  {
    date: "07 APR 2025 - 03:00 PM",
    code: "N/A",
    venue: "AI&DS lab-3",
    details: "No proper haircut",
    timer: "03:40:58"
  },
  {
    date: "21 MAY 2025 - 10:15 AM",
    code: "117",
    venue: "CSE lab-II",
    details: "Critical check!",
    timer: "00:00:00"
  },
  {
    date: "19 MAY 2025 - 07:57 PM",
    code: "112",
    venue: "EW 101",
    details: "Coming late after the break",
    timer: "00:00:00"
  }
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800">DC Portal</h2>
      <h3 className="text-lg mt-1 mb-4 text-gray-700">Hello Rahul ✨</h3>

      <div className="flex flex-wrap gap-6">
        {complaints.map((c, i) => (
          <div key={i} className="w-72 bg-white rounded-xl shadow-md p-5">
            <p className="font-semibold text-gray-500 mb-1">{c.date}</p>
            <p className="text-black"><span className="font-medium">Complaint Code:</span> <span className={`${c.code === 'N/A' ? 'text-red-500' : 'text-black'}`}>{c.code}</span></p>
            <p className="text-black"><span className="font-medium">Venue:</span> {c.venue}</p>
            <p className="text-black"><span className="font-medium">Complaint Details:</span> {c.details}</p>
            <p className="text-black"><span className="font-medium">Timer:</span> <span className="text-red-600">{c.timer}</span></p>
            <div className="mt-3 flex gap-3">
              <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">ACCEPT</button>
              <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">REVOKE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
