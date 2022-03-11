interface ICollection {
  id: number;
  name: string;
  owner_id: number;
}

interface ICollectionAdd {
  name: string;
}

interface ICollectionRename {
  id: number;
  name: string;
}

export {ICollection, ICollectionAdd, ICollectionRename}
