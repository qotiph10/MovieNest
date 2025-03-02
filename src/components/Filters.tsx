import { useState /* , useEffect  */ } from "react";
import { LiaFilterSolid } from "react-icons/lia";
import { FaRegCircleXmark } from "react-icons/fa6";
import "./Filters-style.css";
import { genreMap } from "./Card";
export const Filters = ({
  item,
  setItem,
}: {
  item: string[];
  setItem: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [show, setShow] = useState<string>("none");
  /* const [item, setItem] = useState<string[]>([]); */
  const addItem = (y: string) => {
    if (y === "Least viewed" || y === "Most viewed") {
      setItem((prevItems) => {
        if (y === "Most viewed") {
          return prevItems.includes("Least viewed")
            ? prevItems.filter((item) => item !== "Least viewed").concat(y)
            : prevItems.includes(y)
            ? prevItems.filter((item) => item !== y)
            : [...prevItems, y];
        } else if (y === "Least viewed") {
          return prevItems.includes("Most viewed")
            ? prevItems.filter((item) => item !== "Most viewed").concat(y)
            : prevItems.includes(y)
            ? prevItems.filter((item) => item !== y)
            : [...prevItems, y];
        }
        return prevItems;
      });
    } else if (Object.values(genreMap).includes(y)) {
      // Handle genre filter
      setItem((prevItems) => {
        if (prevItems.includes(y)) {
          return prevItems.filter((item) => item !== y);
        } else {
          return [...prevItems, y];
        }
      });
    } else {
      if (y && !isNaN(Number(y))) {
        setItem((prevItems) => {
          const yearItems = prevItems.filter((item) => isNaN(Number(item)));
          if (prevItems.includes(y)) {
            return yearItems;
          } else {
            return [...yearItems, y];
          }
        });
      }
    }
  };
  return (
    <div className="FilterBar">
      <div className="FilterDisplay">
        {item.map((i) => {
          return (
            <div key={i} className="FilterItem">
              <span>{i}</span>
              <div
                className="xMark"
                onClick={() => {
                  setItem((prevItems) =>
                    prevItems.filter((item) => item !== i)
                  );
                }}
              >
                <FaRegCircleXmark />
              </div>
            </div>
          );
        })}
      </div>
      <div className="Filters">
        <LiaFilterSolid
          size={30}
          onClick={() => {
            setShow(show === "none" ? "block" : "none");
          }}
        />
        <div className="filterDropDown" style={{ display: `${show}` }}>
          <ul>
            <li>
              <p className="Option">Popularity</p>
              <div className="optionContiner">
                <button
                  className="optionButton"
                  onClick={() => {
                    addItem("Most viewed");
                  }}
                >
                  Most
                </button>
                <button
                  className="optionButton"
                  onClick={() => {
                    addItem("Least viewed");
                  }}
                >
                  Least
                </button>
              </div>
            </li>
            <li>
              <p className="Option">Release Date</p>
              <div className="optionContiner">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const year = formData.get("year") as string;
                    addItem(year);
                  }}
                >
                  <input type="number" name="year" className="optionInput" />
                  <button type="submit" style={{ display: "none" }}>
                    submit
                  </button>
                </form>
              </div>
            </li>
            <li>
              <p className="Option">Genre</p>
              <div className="optonGeners">
                {Object.entries(genreMap).map(([key, g]) => (
                  <p
                    className="generItem"
                    onClick={() => {
                      addItem(`${g}`);
                    }}
                    key={key}
                  >
                    {g}
                  </p>
                ))}
              </div>
            </li>
            {/*  <li>
              <p className="Option">Rating</p>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};
