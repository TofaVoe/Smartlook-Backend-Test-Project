import {IStory} from "../entities/IStory";
import IComment from "../entities/IComment";

interface IHackernews {
  response: {
    story: IStory,
    comment: IComment,
  }
}

export default
