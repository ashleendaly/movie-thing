import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CircleDashed, Search } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "~/components/ui/input";
import { env } from "~/env.mjs";
import { type SearchResponse } from "~/types/omdb";

type SearchForm = {
  search: string;
};

const AddWatchList = () => {
  const {
    mutate,
    data: movies,
    status,
  } = useMutation({
    mutationFn: async (search: string) => {
      const res = await axios.get<SearchResponse>(
        `http://www.omdbapi.com/?i=tt3896198&apikey=${env.NEXT_PUBLIC_OMDB_KEY}&s=${search}`,
      );

      return res.data.Search ?? [];
    },
    onSuccess: (d) => {
      if (d.length === 0) toast.error("no movies found");
    },
    onError: () => toast.error("something went wrong"),
  });

  const { register, handleSubmit } = useForm<SearchForm>();
  const onSubmit = handleSubmit((data) => mutate(data.search));

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-row px-2">
        <Input {...register("search")} placeholder="Search..." />
        {/* TODO @pkitazos IDK how to get this search button to fit right with shadcn please advise */}
        <button type="submit">
          <Search />
        </button>
      </form>
      <ul className="grid grid-cols-2 gap-10 p-5">
        {status === "loading" && (
          <CircleDashed className="h-10 w-10 animate-spin-slow stroke-foreground" />
        )}
        {status === "success" &&
          movies
            .filter((movie) => movie.Type === "movie")
            .map(({ Poster, imdbID, Title }) => {
              if (Poster === "N/A") {
                return (
                  <li key={imdbID}>
                    <h1>{Title}</h1>
                    <div className="text-slate-400">poster not found</div>
                  </li>
                );
              }

              return (
                <li key={imdbID}>
                  <Image src={Poster} alt={Title} height={445} width={300} />
                </li>
              );
            })}
      </ul>
    </>
  );
};

export default AddWatchList;
