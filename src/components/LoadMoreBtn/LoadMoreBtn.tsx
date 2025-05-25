type Props = {
  page: number;
  setPage: (newPage: number) => void;
};

const LoadMoreBtn = ({ page, setPage }: Props) => {
  return <button onClick={() => setPage(page + 1)}>Load more</button>;
};

export default LoadMoreBtn;
