import axios from "axios";

export const fetchImages = async <T extends { results: unknown }>(
  query: string,
  page: number,
  signal: AbortSignal
): Promise<T["results"]> => {
  const response = await axios.get<T>(
    `https://api.unsplash.com/search/photos?client_id=2GFk4d0ZaotLby7WLy2tWmmk4g-7OLck-BWzc2I4VJs&query=${query}&page=${page}`,
    { signal }
  );
  return response.data.results;
};
