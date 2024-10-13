import axios from 'axios';


const KEY = "5Dsc2CogKNZ2ORdfckm4KhHDR5GDRWph64PDUZu36TE";
axios.defaults.baseURL = "https://api.unsplash.com/";
const config = {
  headers: {
    "Accept-Version": "v1",
    Authorization: `Client-ID ${KEY}`,
  },
  params: {
    orientation: "landscape",
    content_filter: "low",
    per_page: 20,
  },
};


async function GetImages(query, page) {
  config.params.query = query;
  config.params.page = page;

  const response = await axios.get("search/photos", config);

  return response.data;
}
export default GetImages;