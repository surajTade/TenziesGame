import React from "react";

const Dice = (prop) => {
	return (
		<div className={`box ${prop.isHeld && "held"}`} onClick={prop.handleClick}>
			<h3>{prop.value}</h3>
		</div>
	);
};

export default Dice;
