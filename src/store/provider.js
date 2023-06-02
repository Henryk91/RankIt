import React from "react";

import useUser from "./user";
import useFolder from "./folder";
import useItem from "./item";
import useSelectedFolder from "./selectedFolder";
import useRankItem from "./rankItem";

const Provider = (props) => {
	return (
		<useFolder.Provider>
			<useItem.Provider> 
				<useUser.Provider>
                    <useSelectedFolder.Provider>
                    <useRankItem.Provider>
                        {props.children}
                    </useRankItem.Provider>
                    </useSelectedFolder.Provider>
                </useUser.Provider>
			</useItem.Provider>
		</useFolder.Provider>
	);
};

export default Provider;
