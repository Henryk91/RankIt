import { useState } from "react";
import { createContainer } from "unstated-next";
import { Folder } from "../types/folder";

const insert = (arr: Folder[], index: number, newItem: Folder) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];

function useFolder(initialState = []) {
  let [items, setItems] = useState<Folder[]>(initialState);
  let addItem = (_item: string) => {
    if (_item === "") return;
    let newItem: Folder = { id: items.length.toString(), name: _item };
    setItems([...items, newItem]);
  };
  let deleteItem = (_item: Folder) => {
    let newItem: Folder[] = items.filter((item) => item !== _item);
    setItems(newItem);
  };
  let promoteItem = (_item: Folder) => {
    const itemIndex = items.findIndex((i) => i === _item);
    let newItem: Folder[] = items.filter((item) => item !== _item);
    const result = insert(newItem, itemIndex - 1, _item);
    setItems(result);
  };
  let getNextItem = (_item: Folder) => {
    const itemIndex = items.findIndex((i) => i === _item);
    let newItem: Folder[] = items.filter((item) => item !== _item);
    const result = insert(newItem, itemIndex - 1, _item);
    setItems(result);
  };
  return { items, addItem, deleteItem, promoteItem, getNextItem };
}

export default createContainer(useFolder);
