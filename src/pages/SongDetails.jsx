import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  console.log(songid);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery(songid);
  console.log(songData);
  const {
    data: relatedSongsData,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongRelatedQuery(songid);
  console.log(relatedSongsData);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return <Loader title="Searching song details" />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((Line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">
                {Line}
              </p>
            ))
          ) : (
            <p>Sorry,no lyrics found!</p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={relatedSongsData}
        artistId=""
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
