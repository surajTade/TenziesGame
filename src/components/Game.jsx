import React, { useEffect, useState } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const Game = () => {
	const [die, setDie] = useState(generateNumbers());

	const [tenzies, setTenzies] = useState(false);

	useEffect(() => {
		const allHeld = die.every((ele) => ele.isHeld);
		const value = die[0].value;
		const allSameValues = die.every((ele) => ele.value === value);
		if (allHeld && allSameValues) {
			setTenzies(true);
		}
	}, [die]);

	function generateNewDie() {
		return {
			id: nanoid(),
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
		};
	}

	function generateNumbers() {
		const numbers = [];

		for (let i = 0; i < 10; i++) {
			numbers.push(generateNewDie());
		}

		return numbers;
	}

	function holdDie(id) {
		setDie((prevState) =>
			prevState.map((ele) => {
				return ele.id === id ? { ...ele, isHeld: !ele.isHeld } : ele;
			})
		);
	}

	function rollDice() {
		setDie((prevState) =>
			prevState.map((ele) => (ele.isHeld ? ele : generateNewDie()))
		);
	}

	function resetGame() {
		setDie(generateNumbers());
		setTenzies(false);
	}

	const dieElement = die.map((ele) => (
		<Dice
			key={ele.id}
			value={ele.value}
			isHeld={ele.isHeld}
			handleClick={() => holdDie(ele.id)}
		/>
	));

	return (
		<div className="main-div">
			{tenzies && <Confetti />}
			<div className="outer-board">
				<div className="inner-board">
					<div className="info">
						<h2>Tenzies</h2>
						<p>
							Roll until all dice are the same. Click each die to freeze it at
							its current value between rolls.
						</p>
					</div>
					<div className="dices">{dieElement}</div>
					<button className="roll-btn" onClick={tenzies ? resetGame : rollDice}>
						{tenzies ? "New Game" : "Roll"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Game;
