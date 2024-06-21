import { api } from "~/lib/trpc/server";
import { SortableMovieList } from "./sortable-movie-list";

const WatchList = async () => {
  const movies = await api.watchList.getForUser.query();
  return (
    <div className="mx-auto lg:w-1/3">
      <SortableMovieList initialMovies={movies} />
    </div>
  );
};

export default WatchList;
