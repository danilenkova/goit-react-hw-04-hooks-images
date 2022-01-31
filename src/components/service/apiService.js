import axios from "axios";

const api_key = "24282409-c51302311d18786c8ef637bd6";
axios.defaults.baseURL = "https://pixabay.com/api/";
const params = "image_type=photo&orientation=horizontal&per_page=12";

export const apiService = async (query, page = 1) => {
  const url = `?key=${api_key}&q=${query}&page=${page}&${params}`;
  const { data } = await axios.get(url);
  return data;
};
