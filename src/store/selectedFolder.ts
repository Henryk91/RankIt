import { useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import { Folder } from "../types/folder";
  
const saved = localStorage.getItem('selectedFolder')
function useSelectedFolder(initialState = saved? JSON.parse(saved): undefined) {
    let [selectedFolder, setSelectedFolder] = useState<Folder | undefined>(initialState);
    let selectFolder = (_selectedFolder: Folder) => {
        setSelectedFolder(_selectedFolder);
    };
    let deSelectFolder = () => {
        setSelectedFolder(undefined);
    };

    useEffect(() => {
        if(selectedFolder){
            localStorage.setItem('selectedFolder', JSON.stringify(selectedFolder));
        } else{
            localStorage.removeItem('selectedFolder');
        }
        
    },[selectedFolder])

    return { selectedFolder, selectFolder, deSelectFolder };
}
  
export default createContainer(useSelectedFolder);