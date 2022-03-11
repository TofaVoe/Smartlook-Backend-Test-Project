// HackerNews service
import axios from "axios";
import {config} from "../../types/IConfig";

// Get Story
async function getStory(id: number) {
  try {
    const res = await axios.get(config.hackernews.url.item + id +'.json');
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e.response.body)
  }
}



// Fetch comments to story
