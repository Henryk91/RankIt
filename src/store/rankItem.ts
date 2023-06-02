import { useState } from "react";
import { createContainer } from "unstated-next";
import { Folder } from "../types/folder";
  
function useRankItem(initialState: any) {
    let [selectedFolder, setSelectedFolder] = useState<Folder>(initialState);
    let selectFolder = (_selectedFolder: Folder) => {
        setSelectedFolder(_selectedFolder);
    };
    let deSelectFolder = () => {
        setSelectedFolder(initialState);
    };

    return { selectedFolder, selectFolder, deSelectFolder };
}
  
export default createContainer(useRankItem);