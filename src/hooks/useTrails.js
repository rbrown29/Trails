import { useState, useEffect } from "react";

/**
 * Custom hook to fetch and manage trails data.
 *
 * @returns {{
 *   trailsData: Array,
 *   selectedTrail: Object | null,
 *   setSelectedTrailIndex: Function
 * }}
 */
export function useTrails() {
  const [trailsData, setTrailsData] = useState([]);
  const [selectedTrailIndex, setSelectedTrailIndex] = useState(null);

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const response = await fetch("/trails.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTrailsData(data);
      } catch (error) {
        console.error("Error fetching trails:", error);
      }
    };

    fetchTrails();
  }, []);

  const selectedTrail =
    selectedTrailIndex != null && selectedTrailIndex >= 0
      ? trailsData[selectedTrailIndex]
      : null;

  return { trailsData, selectedTrail, setSelectedTrailIndex };
}
