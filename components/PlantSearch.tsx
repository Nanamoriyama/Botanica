"use client";
import { useEffect, useRef, useState } from "react";
import { extractCareInstructions } from "@/utils/careInstructions";

export default function PlantSearch() {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [wikiExtract, setWikiExtract] = useState("");
  const [wikiImage, setWikiImage] = useState("");
  const [searchedName, setSearchedName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [care, setCare] = useState({
    watering: "",
    sunlight: "",
    beginnerFriendly: "",
  });

  useEffect(() => {
    if (wikiExtract) {
      const newCare = extractCareInstructions(wikiExtract);
      setCare(newCare);
    }
  }, [wikiExtract]);

  const searchWikipedia = async (plantName: string) => {
    console.log("🔍 Wikipedia検索:", plantName);

    const summaryRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        plantName
      )}`
    );
    const summaryData = await summaryRes.json();
    console.log("📘 Wikipedia Summary:", summaryData);

    if (summaryData.extract) {
      setWikiExtract(summaryData.extract);
      setWikiImage(summaryData.thumbnail?.source || "");
    } else {
      alert("We couldn't find the name 🥲");
    }
  };

  const handleSearch = async () => {
    if (file) {
      await identifyPlant(file);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // 👈 ファイル名もクリアする
      }
      setCaption("");
    } else if (caption) {
      await searchWikipedia(caption);
      setSearchedName(caption);
      setCaption("");
    } else {
      alert("Please enter a name or upload a photo 🌿");
    }
  };

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
      setSearchedName(bestMatch);
      await searchWikipedia(bestMatch);
    } else {
      alert("We couldn't find the plant 🥲");
    }
    setFile(null); //  忘れずここでもクリア
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto p-10 bg-stone-200 shadow-md mb-10">
      <h1 className="text-3xl font-extralight text-center mb-6 tracking-wider text-stone-900">
        Search Plants
      </h1>
      <section className="font-extralight mb-4">
        Check about plants by a photo or a name.
      </section>

      <input
        type="text"
        placeholder="Enter plant name (e.g., monstera)"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="border border-gray-300 p-3 w-full md:w-72 mb-4 focus:outline-none focus:ring-2 focus:ring-green-300"
      />
      <p className="mb-4 font-extralight">or</p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-8 w-full md:w-72 text-center"
      />

      <div className="flex gap-4 items-center">
        <button
          onClick={handleSearch}
          className="border rounded-full tracking-wider font-light border-stone-950 shadow-md hover:pointer py-3 px-6 transition"
        >
          Search
        </button>
      </div>

      {wikiExtract && (
        <div className="flex justify-center flex-col items-center w-full mt-6 p-5 bg-green-50 shadow-sm">
          <h2 className="text-xl font-light text-green-800 tracking-wider">
            🪴 Wikipedia Info
          </h2>

          {wikiImage && (
            <img
              src={wikiImage}
              alt="Plant"
              className="w-full h-64 object-contain rounded mt-2"
            />
          )}

          {searchedName && (
            <h3 className="mt-4 text-green-700 text-2xl font-semibold tracking-wider">
              {searchedName}
            </h3>
          )}

          <p className="text-sm mt-2 text-gray-800 whitespace-pre-line md:w-1/2">
            {wikiExtract}
          </p>
        </div>
      )}
    </div>
  );
}
