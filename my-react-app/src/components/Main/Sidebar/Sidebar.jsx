import React from "react";
import Friend from "./Friend/Friend";

function SideBar(props) {
	return (
		<div>
			<Friend allFriends={props.allFriends} add={props.add} delete={props.delete}/>
		</div>
	);
}

export default SideBar;
