import "./Card-style.css";
/* import { generatePath } from "react-router-dom"; */
import { CardProps } from "./Home";
export const genreMap: { [key: number]: string } = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
export const Card = ({ genre_ids, title, poster_path }: CardProps) => {
  return (
    <div className="card">
      <img
        src={"https://image.tmdb.org/t/p/original/" + poster_path}
        alt={title}
      />
      <h3>{title}</h3>
      <div className="genre">
        <div className="genre-container">
          {genre_ids.slice(0, 2).map((genre) => (
            <span key={genre} className="genre">
              {genreMap[genre]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
