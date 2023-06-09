import React, { useState } from "react";
import "./folder.css";
import useFolder from "../store/folder";
import useSelectedFolder from "../store/selectedFolder";
import { Folder as FolderItem } from "../types/folder";
import useItem from "../store/item";

function Folder() {
  let { items, addItem, deleteItem } = useFolder.useContainer();
  const { deleteItemsByParentId } = useItem.useContainer();
  let { selectedFolder, selectFolder } = useSelectedFolder.useContainer();
  const [localItem, setLocalItem] = useState("");
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showAddRankPage, setShowAddRankPage] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);

  if (selectedFolder && selectedFolder.id !== undefined) {
    return <></>;
  }

  const deleteButtonClick = (item: FolderItem) => {
    deleteItemsByParentId(item.id)
    deleteItem(item)
  }
  return (
    <div className="page-wrapper">
      <div className="folder-nav">
        <input
          className="text-black"
          type="button"
          id="edit-nav-button"
          value={!showEditButton ? "Edit" : "Done"}
          onClick={() => {
            console.log("Set edit");
          }}
        />
        <h1>RankIt!</h1>
        <input
          type="button"
          id="edit-nav-button"
          value={!showEditButton ? "Edit" : "Done"}
          onClick={() => {
            setShowEditButton(!showEditButton);
          }}
        />
      </div>
      <section className="section">
        <h1 className="title">Groups</h1>
        <div className="items-wrap">
          <ol className="items">
            {items.length > 0 ? (
              items.map((item) => (
                <div className="item-set padding-set" key={item.id + item.name}>
                  <div className="item-name-box" onClick={() => selectFolder(item)}>
                    <i className="far fa-folder folder-icon" aria-hidden="true"></i>
                    <li className="item">{item.name} </li>
                  </div>
                  {showEditButton && (
                    <>
                      <button className="deleteButton" onClick={() => deleteButtonClick(item)}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>Folder is Empty</p>
            )}
          </ol>
        </div>
        {showAddFolder && (
          <div id="add-folder-input-wrapper">
            <div className="folder-nav">
              <input
                type="button"
                id="cancel-button"
                value="Cancel"
                onClick={() => {
                  setShowAddFolder(!showAddFolder);
                }}
              />
              <p>New Folder</p>
              <input
                type="button"
                id="done-button"
                value="Done"
                onClick={() => {
                  addItem(localItem);
                  setLocalItem("");
                  setShowAddFolder(!showAddFolder);
                }}
              />
            </div>
            <input
              autoFocus
              type="text"
              id="newItem"
              placeholder="New Folder Name"
              value={localItem}
              onChange={(e) => setLocalItem(e.target.value)}
            />
          </div>
        )}
        {showAddRankPage && (
          <div id="add-folder-input-wrapper">
            <div className="folder-nav">
              <input
                type="button"
                id="cancel-button"
                value="Cancel"
                onClick={() => {
                  setShowAddRankPage(!showAddRankPage);
                }}
              />
              <p>Which Do You prefer</p>
              <input
                type="button"
                id="done-button"
                value="Done"
                onClick={() => {
                  setLocalItem("");
                  setShowAddRankPage(!showAddRankPage);
                }}
              />
            </div>
            <input
              autoFocus
              type="text"
              id="newItem"
              placeholder="New Folder Name"
              value={localItem}
              onChange={(e) => setLocalItem(e.target.value)}
            />
          </div>
        )}
      </section>
      <footer className="folder-nav">
        <div className="nav-button" onClick={() => setShowAddFolder(!showAddFolder)}>
          <i className="far fa-folder" aria-hidden="true"></i>
          <span>+</span>
        </div>
        {/* <div className="nav-button" onClick={() => setShowAddRankPage(!showAddRankPage)}>
          <span>RankIt</span>
        </div> */}
      </footer>
    </div>
  );
}

export default Folder;
