import { api } from "~/lib/trpc/server";
import { SortableMovieList } from "./sortable-movie-list";

const WatchList = async () => {
  const movies = await api.watchList.getForUser.query();
  return (
    <div className="m-7" suppressHydrationWarning>
      <SortableMovieList initialMovies={movies}></SortableMovieList>
    </div>
  );
};

export default WatchList;
