import "./LoadMore-style.css";
export const LoadMore = ({ setPage, page }: { setPage: any; page: number }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const add = () => {
    setPage(page + 1);
    scrollToTop();
  };
  const dec = () => {
    setPage(page - 1);
    scrollToTop();
  };
  return (
    <div className="container">
      {page > 1 ? (
        <button className="button" onClick={dec}>
          Back
        </button>
      ) : (
        <button className="button2"></button>
      )}
      <div className="pageNumber">
        <h1>{page}</h1>
      </div>
      <button className="button" onClick={add}>
        Next
      </button>
    </div>
  );
};
