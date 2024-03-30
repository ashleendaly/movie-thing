import { api } from "~/lib/trpc/server";
import { SortableMovieList } from "./sortable-movie-list";

const WatchList = async () => {
  const movies = await api.watchList.getForUser.query();
  return (
    <div className="m-7">
      <SortableMovieList initialMovies={movies}/>
    </div>
  );
};

export default WatchList;
