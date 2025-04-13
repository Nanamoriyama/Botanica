"use client";
import { useState } from "react";

export default function PlantSearch() {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [watering, setWatering] = useState("");
  const [sunlight, setSunlight] = useState("");
  const [care_level, setCareLevel] = useState("");
  const [plantImageUrl, setPlantImageUrl] = useState("");
  const [perenualList, setPerenualList] = useState<any[]>([]);

  const isUpgraded = (text: string) =>
    text?.toLowerCase().includes("upgrade plans to");

  const identifyPlant = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("images", imageFile);
    formData.append("organs", JSON.stringify(["leaf", "flower"]));

    const res = await fetch("https://api.plant.id/v2/identify", {
      method: "POST",
      headers: {
        "Api-Key": process.env.NEXT_PUBLIC_PLANT_ID_API_KEY!,
      },
      body: formData,
    });

    const result = await res.json();
    console.log("🪴 Plant.id Result:", result);
    const bestMatch = result?.suggestions?.[0]?.plant_name;
    if (bestMatch) {
      setCaption(bestMatch);
      handleSearch(bestMatch);
    } else {
      alert("画像から植物名を特定できませんでした🥲");
    }
  };

  const handleSearch = async (plantName?: string) => {
    const searchTerm = plantName || caption;
    console.log("🔍 Searching for:", searchTerm);

    const res = await fetch(
      `https://perenual.com/api/species-list?key=${
        process.env.NEXT_PUBLIC_PERENUAL_API_KEY
      }&q=${encodeURIComponent(searchTerm)}`
    );
    const data = await res.json();
    console.log("📦 API Response:", data);

    setPerenualList(data.data || []);

    const matchedPlant = data.data?.[0];

    if (!matchedPlant) {
      alert("No matching plant found 🥲");
      return;
    }

    const watering = matchedPlant?.watering ?? "";
    const sunlight = Array.isArray(matchedPlant?.sunlight)
      ? matchedPlant.sunlight.join(", ")
      : matchedPlant?.sunlight ?? "";
    const care_level = matchedPlant?.care_level ?? "";
    const plant_image_url = matchedPlant?.default_image?.original_url ?? "";

    setWatering(watering);
    setSunlight(sunlight);
    setCareLevel(care_level);
    setPlantImageUrl(plant_image_url);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-2xl font-bold text-center mb-6 text-green-700">
        🌱 Plant Care Finder
      </h1>

      <input
        type="text"
        placeholder="Enter plant name (e.g., monstera)"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-300"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <div className="flex gap-4">
        <button
          onClick={() => handleSearch()}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
        >
          Search by Name
        </button>

        <button
          onClick={() => file && identifyPlant(file)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
        >
          Search by Image
        </button>
      </div>

      {(watering || sunlight || care_level) && (
        <div className="mt-6 p-5 border rounded-xl bg-green-50 shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-green-800">
            🌿 Care Instructions
          </h2>

          {plantImageUrl && (
            <img
              src={plantImageUrl}
              alt="Plant"
              className="w-full h-64 object-contain rounded mb-4"
            />
          )}

          <p className="text-sm mb-1">
            💧 <span className="font-semibold">Watering:</span>{" "}
            {isUpgraded(watering)
              ? "Not available on free plan 💦"
              : watering || "No data"}
          </p>

          <p className="text-sm mb-1">
            ☀️ <span className="font-semibold">Sunlight:</span>{" "}
            {isUpgraded(sunlight)
              ? "Not available on free plan 🌥️"
              : sunlight || "No data"}
          </p>

          <p className="text-sm">
            🧰 <span className="font-semibold">Care Level:</span>{" "}
            {isUpgraded(care_level)
              ? "Not available on free plan 🧩"
              : care_level || "Average"}
          </p>
        </div>
      )}

      {perenualList.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold text-green-700 mb-2">
            🌱 Search Results
          </h2>
          <ul className="space-y-3">
            {perenualList.map((plant, index) => (
              <li key={index} className="flex items-center gap-4">
                {plant.default_image?.thumbnail && (
                  <img
                    src={plant.default_image.thumbnail}
                    alt={plant.common_name || "Plant"}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <span className="font-semibold">
                    {plant.common_name || "No common name"}
                  </span>{" "}
                  <span className="text-gray-600 italic">
                    ({plant.scientific_name || "No scientific name"})
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
