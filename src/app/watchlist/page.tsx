import { MovieListing } from "~/components/movie-listing";
import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/lib/trpc/server";

const WatchList = async () => {
  const movies = await api.watchList.getForUser.query();
  return (
    <div>
      <ScrollArea className="h-[80dvh]">
        <ul className="grid grid-cols-2 gap-10  p-5">
          {movies.map((movie) => (
            <MovieListing key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default WatchList;
