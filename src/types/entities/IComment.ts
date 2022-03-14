interface IComment {
  id: number;
  time: string;
  type: string;
  text: string;
  by: string;
  parent: number; // The comment's parent: either another comment or the relevant story.
}

export default
