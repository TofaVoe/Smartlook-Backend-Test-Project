interface IStory {
  id: number;
  time: string;
  type: string;
  title: string;
  score: number;
  by: string;
  descendants: number;
  kids: Array<number>; // The ids of the item's comments, in ranked display order.
  url: string;
}

interface IStoryAdd  {
  storyId: number;
  collectionId: number;
}

interface IStoryRemove {
  storyId: number;
  collectionId: number
}

export {IStory, IStoryAdd, IStoryRemove}
