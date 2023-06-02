import { useState } from "react";
import { createContainer } from "unstated-next";
import { NoteItem } from "../types/item";

const insert = (arr: NoteItem[], index: number, newItem: NoteItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];

const randomId = () => Math.floor(Math.random() * Date.now()).toString(16)

function useItem(initialState = []) {
  let [items, setItem] = useState<NoteItem[]>(initialState);
  let addItem = (_item: string, _parentId: string) => {
    if (_item === "") return;
    let newItem: NoteItem = { id: randomId(), content: _item, parentId: _parentId };
    setItem([...items, newItem]);
  };
  let updateNoteItem = (_item: NoteItem) => {
    const itemIndex: number = items.findIndex((item) => item.id === _item.id);
    let newItems: NoteItem[] = [...items];
    newItems[itemIndex] = _item;
    setItem(newItems);
  };
  let deleteItem = (_item: NoteItem) => {
    let newItems: NoteItem[] = items.filter((item) => item.id !== _item.id);
    setItem(newItems);
  };
  let promoteItem = (_item: NoteItem) => {
    const itemIndex = items.findIndex((i) => i === _item);
    let newItem: NoteItem[] = items.filter((item) => item !== _item);
    const result = insert(newItem, itemIndex + 1, _item);
    setItem(result);
  };
  let getNextItem = (_item: NoteItem) => {
    const itemIndex = items.findIndex((i) => i === _item);
    let newItem: NoteItem[] = items.filter((item) => item !== _item);
    const result = insert(newItem, itemIndex - 1, _item);
    setItem(result);
  };
  return { items, addItem, updateNoteItem, deleteItem, promoteItem, getNextItem };
}

export default createContainer(useItem);
