import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useState } from "react";

const Discover = () => {
  const [genreTitle, setGenreTitle] = useState(genres[0].title);

  console.log(genres);
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h1 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h1>
        <select
          onChange={(e) => setGenreTitle(e.target.value)}
          value=""
          className="bg-black text-gray-300 text-sm p-3 rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.title}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Discover;
