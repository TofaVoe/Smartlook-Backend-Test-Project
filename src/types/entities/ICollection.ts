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

interface ICollectionRemove {
  id: number;
}

export {ICollection, ICollectionAdd, ICollectionRename, ICollectionRemove}
