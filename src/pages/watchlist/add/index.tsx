import React from 'react'
import { env } from "~/env.mjs";
import { type SearchResponse } from "~/types/omdb";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AddWatchList = () => {
    const { data } = useQuery({
        queryKey: ["searchMovies"],
        queryFn: () =>
          axios
            .get<SearchResponse>(
              `http://www.omdbapi.com/?i=tt3896198&apikey=${env.NEXT_PUBLIC_OMDB_KEY}&s=avatar`,
            )
            .then((res) => res.data.Search)
            .catch((error) => console.log(error)),
      });
    
  return (
    <>
        {data?.map((movie) => <div key={movie.imdbID}>{movie.Title}</div>)}
    </>
  )
}

export default AddWatchList