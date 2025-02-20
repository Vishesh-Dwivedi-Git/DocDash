import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SocialMediaCard from "./SocialMediaCard";
import CardPreview from "./CardPreview";


const SharableDashboard = () => {
  const { hash } = useParams();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/${hash}`)
      .then((res) => res.json())
      .then((data) => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching shared dashboard:", err);
        setError("Failed to load dashboard");
        setLoading(false);
      });
  }, [hash]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error
  }</p>;
  if (!dashboardData) return <p className="text-gray-400">No data available</p>;

  return (
    <div className="flex-1 p-4 md:p-6 bg-black dark:bg-neutral-900 relative overflow-auto">
      <h1 className="text-white text-2xl font-bold mb-4">Shared Dashboard</h1>
      <div className="flex flex-wrap justify-start gap-4 mt-4">
        {dashboardData.items.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
            <SocialMediaCard type={item.type} link={item.link} title={item.title} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-start gap-4 mt-4 overflow-auto">
        {dashboardData.uploads.map((upload, index) => (
          <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
            <CardPreview upload={upload} />
          </div>
        ))}
      </div>
      <button onClick={() => window.location.href = "/dashboard"} className="mt-6 text-white bg-purple-600 px-4 py-2 rounded-lg">
        Go to My Dashboard
      </button>
    </div>
  );
};

export default SharableDashboard;
