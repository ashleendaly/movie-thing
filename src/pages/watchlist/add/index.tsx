import React, { useState } from "react";
import { env } from "~/env.mjs";
import { type MovieResponse, type SearchResponse } from "~/types/omdb";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type SearchForm = {
  search: string;
};

const AddWatchList = () => {
  const [movies, setMovies] = useState<MovieResponse[]>([]);

  const { mutateAsync } = useMutation({
    mutationFn: async (search: string) => {
      const res = await axios.get<SearchResponse>(
        `http://www.omdbapi.com/?i=tt3896198&apikey=${env.NEXT_PUBLIC_OMDB_KEY}&s=${search}`,
      );
      return res.data.Search;
    },
  });

  const { register, handleSubmit } = useForm<SearchForm>();
  const onSubmit: SubmitHandler<SearchForm> = async (data) => {
    const response = await toast.promise(mutateAsync(data.search), {
      loading: "loading...",
      error: "error",
      success: "Success!",
    });
    setMovies(response);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("search")} placeholder="Search..." />
        <input type="submit" />
      </form>
      {movies
        .filter((movie) => movie.Type === "movie")
        .map((movie) => (
          <div key={movie.imdbID}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        ))}
    </>
  );
};

export default AddWatchList;
