import React, { useState } from "react";
import "./item.css";
import useItem from "../store/item";
import useSelectedFolder from "../store/selectedFolder";

function Picker({ toggleHide }: { toggleHide: () => void }) {
  const { items: allItems, promoteItem } = useItem.useContainer();
  let { selectedFolder } = useSelectedFolder.useContainer();
  const [pickIndex, setPickIndex] = useState(0);
  const [pickRightCount, setPickRightCount] = useState(0);
  const [showShowRankComplete, setShowRankComplete] = useState(false);
  const items = allItems.filter((item) => item.parentId === selectedFolder.id);

  const leftItem = items[pickIndex];
  const rightItem = items[pickIndex + 1];
  const leftClick = () => {
    promoteItem(leftItem);
    const next = pickIndex >= items.length - 2 ? 0 : pickIndex + 1;
    setPickIndex(next);
    setPickRightCount(0);
  };
  const rightClick = () => {
    const next = pickIndex >= items.length - 2 ? 0 : pickIndex + 1;
    setPickIndex(next);
    setPickRightCount(pickRightCount + 1);
    if (pickRightCount >= items.length -2) {
      setPickRightCount(0);
      setShowRankComplete(true);
    }
  };
  

  return (
    <>
      <div className="page-wrapper">
        <section className="section">
          <div id="add-folder-input-wrapper">
            <div className="folder-nav">
              <input
                type="button"
                id="cancel-button"
                value="Cancel"
                onClick={() => {
                  toggleHide();
                }}
              />
              <p>Pick One</p>
              <input
                type="button"
                id="done-button"
                value="Done"
                onClick={() => {
                  toggleHide();
                }}
              />
            </div>
            <div className="options-wrapper">
              <div className="picker-option" onClick={() => leftClick()}>
                <h1 className="picker-text">{leftItem?.content}</h1>
              </div>
              <div className="picker-option" onClick={() => rightClick()}>
                <h1 className="picker-text">{rightItem?.content}</h1>
              </div>
            </div>
          </div>
        </section>
        {showShowRankComplete ? (
          <div className="rank-complete-notice">
            <h1>Ranking Complete!</h1>
            <div className="complete-notice-button-wrapper">
                <div className="complete-button">
              <input
                type="button"
                className="yellow-button"
                id="cancel-button"
                value="Close"
                onClick={() => {
                  toggleHide();
                }}
              />
              </div>
              <div className="complete-button">
              <input
                type="button"
                className="yellow-button"
                id="cancel-button"
                value="Continue"
                onClick={() => {
                  setShowRankComplete(false);
                }}
              />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Picker;
