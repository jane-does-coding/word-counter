import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [text, setText] = useState("");
	const [wordCount, setWordCount] = useState([]);

	const onSubmit = () => {
		// Split the text into words and filter out empty strings
		const wordsArray = text.split(" ").filter((word) => word.trim() !== "");

		// Create an object to hold word counts
		const count = {};

		// Count each word
		wordsArray.forEach((word) => {
			const lowerWord = word.toLowerCase();
			if (count[lowerWord]) {
				count[lowerWord] += 1;
			} else {
				count[lowerWord] = 1;
			}
		});

		// Convert the count object to an array of entries, sort by count, and update state
		const sortedCountArray = Object.entries(count).sort((a, b) => b[1] - a[1]);
		setWordCount(sortedCountArray);

		console.log(sortedCountArray);
	};

	return (
		<>
			<div className="">
				<textarea
					cols="50"
					rows="10"
					value={text}
					onChange={(e) => setText(e.target.value)}
				></textarea>
				<button onClick={onSubmit}>Submit</button>
			</div>
			<div>
				<h2>Word Count:</h2>
				<ul>
					{wordCount.map(([word, count]) => (
						<li key={word}>
							{word} - {count}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default App;
