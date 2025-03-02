import { useLocation } from "react-router-dom";
import "./CardDetails-style.css";
import { genreMap } from "./Card";
const CardDetails = () => {
  const location = useLocation();
  const { movie } = location.state;

  return (
    <div
      className="card-details"
      style={{
        background: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
      }}
    >
      <div className="card-details-poster">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="card-details-info">
        <h1>{movie.title}</h1>
        <p className="overview" style={{ fontSize: "23px" }}>
          {movie.overview}
        </p>
        <div className="details-grid">
          <div>
            <strong>Release Date:</strong>
            <p>{movie.release_date}</p>
          </div>
          <div>
            <strong>Rating:</strong>
            <p>{movie.vote_average}/10</p>
          </div>
          <div>
            <strong>Original Language:</strong>
            <p>{movie.original_language.toUpperCase()}</p>
          </div>
          <div className="genre-section">
            <strong>Genre:</strong>
            {movie.genre_ids.map((genre: any) => (
              <span key={genre} className="genre">
                {genreMap[genre]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
