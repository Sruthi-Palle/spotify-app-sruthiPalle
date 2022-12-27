import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
//import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
const ArtistDetails = () => {
  //const dispatch = useDispatch();
  const { id: artistId } = useParams();
  console.log(artistId);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);
  console.log(artistData);
  const artistsTopSongs = artistData?.data[0]?.views["top-songs"]?.data;
  console.log(artistData?.data[0]?.views["top-songs"]?.data);
  console.log(artistData);
  console.log(artistsTopSongs);
  //console.log(Object.values(artistData?.data[0]?.views?.top - songs));
  if (isFetchingArtistDetails) {
    return <Loader title="Loading artist details ..." />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />
      <RelatedSongs
        data={artistsTopSongs}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
