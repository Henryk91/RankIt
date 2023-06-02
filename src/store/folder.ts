import { useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import { Folder } from "../types/folder";

const insert = (arr: Folder[], index: number, newItem: Folder) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];
const randomId = () => Math.floor(Math.random() * Date.now()).toString(16)

const saved = localStorage.getItem('folders')
function useFolder(initialState = saved? JSON.parse(saved): []) {
  let [items, setItems] = useState<Folder[]>(initialState);
  let addItem = (_item: string) => {
    if (_item === "") return;
    let newItem: Folder = { id: randomId(), name: _item };
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

  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(items));
}, [items])

  return { items, addItem, deleteItem, promoteItem, getNextItem };
}

export default createContainer(useFolder);
