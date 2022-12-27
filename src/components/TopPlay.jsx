import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import "swiper/css";
import "swiper/css/free-mode";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="text-white text-base font-bold mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          src={song?.images?.coverart}
          alt={song?.title}
          className="rounded-lg h-20 w-20"
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white hover:bg-[#342e4e] rounded-lg pl-4">
              {song?.title}{" "}
            </p>
          </Link>

          <p className="text-base  text-gray-300 mt-1 rounded-lg pl-4">
            {song?.subtitle.slice(0, 20)}
            {"......"}
          </p>
        </div>
      </div>
      <PlayPause
        song={song}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behaviour: "smooth" });
  });

  const topPlays = data?.slice(0, 5);
  console.log(topPlays);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, i, data }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="flex-1 flex flex-col xl:max-w-[500px] max-w-full  xl:ml-6 ml-0 xl:mb-0 mb-6  "
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              song={song}
              i={i}
              key={song.key}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      {/*<div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        
          {topPlays?.map((song, i) => {
            console.log(song[0]);
            return (
              
                <Link to={`/artists/${song[0]?.artists[0].adamid}`}>
                  <img
                    src={song[0]?.images.background}
                    alt="name"
                    className="rounded-full w-full object-cover"
                  />
                </Link>
              
            );
          })}
        
      </div>*/}
    </div>
  );
};

export default TopPlay;
