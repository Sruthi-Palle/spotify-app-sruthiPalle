import SongBar from "./SongBar";

const RelatedSongs = ({
  data,

  artistId,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
    <div className="mt-6 w-full flex flex-col">
      {data?.map((song, i) => (
        <SongBar
          key={`${song.key}-${artistId}`}
          data={data}
          song={song}
          i={i}
          artistId={artistId}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
