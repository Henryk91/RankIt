import React, { useState } from "react";
import "./item.css";
import useItem from "../store/item";
import useSelectedFolder from "../store/selectedFolder";
import useFolder from "../store/folder";
import { NoteItem } from "../types/item";
import Picker from "./Picker";

function Item() {
  const { items, addItem, updateNoteItem, deleteItem } = useItem.useContainer();
  let { selectedFolder, deSelectFolder } = useSelectedFolder.useContainer();
  const [showAddRankPage, setShowAddRankPage] = useState(false);
  const [localItem, setLocalItem] = useState("");
  const [showAddNote, setShowAddNote] = useState(false);
  const [updatingNote, setUpdatingNote] = useState<NoteItem>();
  let { promoteItem } = useFolder.useContainer();
  if (!selectedFolder || !selectedFolder.id) {
    return <></>;
  }
  const folderItems = items.filter((item) => item.parentId === selectedFolder?.id);

  const addNewItem = (localItem: string, parentId: string) => {
    if (updatingNote && updatingNote.id !== undefined) {
      let item: NoteItem = { ...updatingNote } as NoteItem;
      if (localItem === "") {
        deleteItem(item);
      } else {
        item.content = localItem;
        updateNoteItem(item);
      }
      setUpdatingNote(undefined);
    } else {
      addItem(localItem, parentId);
    }

    setLocalItem("");
  };

  const updateItem = (item: NoteItem) => {
    setLocalItem(item.content);
    setShowAddNote(!showAddNote);
    setUpdatingNote(item);
  };
  const itemCount = folderItems?.length
  const showRankItButton = itemCount > 1

  const rankCounter = (rank: number) => {
    const className = ('ranking-number ') + (rank === 1 ? 'ranking-leader': '')
    return (<p className={className}>{rank}</p>)
  }
  return (
    <div className="page-wrapper">
      <div className="folder-nav">
        <input
          type="button"
          id="edit-nav-button"
          value="< Groups"
          onClick={() => {
            deSelectFolder();
          }}
        />
      </div>
      <section className="section">
        <h1 className="title" onClick={() => {if(selectedFolder) promoteItem(selectedFolder)}}>
          {selectedFolder.name}
        </h1>

        {showAddNote && (
          <div id="add-folder-input-wrapper">
            <div className="folder-nav">
              <input
                type="button"
                id="cancel-button"
                value={"< " + selectedFolder.name}
                onClick={() => {
                  setShowAddNote(!showAddNote);
                }}
              />
              <input
                type="button"
                id="done-button"
                value="Done"
                onClick={() => {
                    if(selectedFolder)addNewItem(localItem, selectedFolder.id)
                    setLocalItem("");
                    setShowAddNote(!showAddNote);
                }}
              />
            </div>
            <textarea
              autoFocus
              id="new-note-item"
              placeholder="New Item"
              value={localItem}
              onChange={(e) => setLocalItem(e.target.value)}
            />
          </div>
        )}
        {showAddRankPage && <Picker toggleHide={() => setShowAddRankPage(!showAddRankPage)} />}

        <div className="note-list">
          {folderItems.length > 0 &&
            [...folderItems].map((item, index) => (
              <div className="item-set" key={item.id + item.parentId} onClick={() => updateItem(item)}>
                {rankCounter(itemCount - index)}
                <p className="note-item" style={{ marginRight: 12 }}>
                  {item.content}
                </p>
              </div>
            )).reverse()}
        </div>
      </section>
      <footer className="folder-nav">
        <div className="nav-button" id="add-note-button1" onClick={() => setShowAddNote(!showAddNote)}>
          <i className="far fa-sticky-note" aria-hidden="true"></i>
          <span>+</span>
        </div>
        {showRankItButton ? (
          <div className="nav-button" onClick={() => setShowAddRankPage(!showAddRankPage)}>
            <span>RankIt</span>
          </div>
        ) : null}
      </footer>
    </div>
  );
}

export default Item;
