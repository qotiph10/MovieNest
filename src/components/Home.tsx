import { useState, useEffect } from "react";
import { Card } from "./Card";
import "./HomePage-style.css";
/* import useFetch from "../hooks/useFetch";
import { FaRegHeart } from "react-icons/fa6"; */
import { useNavigate } from "react-router-dom";
import { Filters } from "./Filters";
import { genreMap } from "./Card";
export interface CardProps {
  id: string;
  genre_ids: number[];
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  original_language: string;
}
/* interface ApiResponse {
  page: number;
  results: CardProps[];
  total_pages: number;
  total_results: number;
} */
export const Home = ({ input, page }: { input: string; page: number }) => {
  const [movies, setMovies] = useState<CardProps[]>([]);
  const [item, setItem] = useState<string[]>([]);
  /* let data: ApiResponse | null = null; */
  const navigate = useNavigate();
  const handleCardClick = (movie: CardProps) => {
    navigate(`/card/${movie.id}`, { state: { movie } });
  };
  const baseUrl = "https://api.themoviedb.org/3";
  const api_key = "INSERT YOUR API KEY ";
  let fetchUrl = input
    ? `${baseUrl}/search/movie?api_key=${api_key}&query=${input}&page=${page}`
    : `${baseUrl}/discover/movie?api_key=${api_key}&page=${page}`;
  useEffect(() => {
    item.forEach((i: string) => {
      if (i === "Most viewed" || i === "Least viewed") {
        // Handle specific cases
        if (i === "Most viewed") {
          fetchUrl += "&sort_by=popularity.desc";
        } else {
          fetchUrl += "&sort_by=popularity.asc";
        }
      } else if (!isNaN(Number(i))) {
        // i is a number
        fetchUrl += `&primary_release_year=${i}`;
      } else {
        // i is a genre name
        Object.keys(genreMap).forEach((key) => {
          const genreName = genreMap[Number(key)];
          if (genreName === i) {
            if (fetchUrl.includes("with_genres=")) {
              fetchUrl = fetchUrl.replace(
                "with_genres=",
                `with_genres=${key},`
              );
            } else {
              fetchUrl += `&with_genres=${key}`;
            }
          }
        });
      }
    });
  }, [item]);
  useEffect(() => {
    // Call useFetch at the top level of the component, not inside useEffect
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl); // Use fetch directly or your custom hook
        const data = await response.json();
        if (data) {
          setMovies(data.results);
          /*  console.log(fetchUrl); */
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fetchUrl, item]);
  /* data = useFetch<ApiResponse>(fetchUrl);
  useEffect(() => {
    if (data) {
      setMovies(data.results);
      console.log(fetchUrl);
    }
  }, [data, item]); */
  /* useEffect(() => {
    console.log(movies);
  }, [movies]); */
  return (
    <div className="HomeMain">
      <Filters item={item} setItem={setItem} />
      <div className="HomePage">
        {movies.length ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="cardBoard"
              onClick={() => handleCardClick(movie)}
            >
              {/* <div className="Love"> 
              <FaRegHeart size={25} />
            </div> */}
              <Card {...movie} />
            </div>
          ))
        ) : (
          <h1 className="error-message">
            No results found. Double-check your spelling or try a broader search
            term.
          </h1>
        )}
      </div>
    </div>
  );
};
