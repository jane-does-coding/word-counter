import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css"; // Ensure Tailwind CSS is properly configured

function App() {
	const [text, setText] = useState("");
	const [wordCount, setWordCount] = useState([]);

	const onSubmit = () => {
		const wordsArray = text.split(" ").filter((word) => word.trim() !== "");

		const count = {};

		wordsArray.forEach((word) => {
			const lowerWord = word.toLowerCase();
			if (count[lowerWord]) {
				count[lowerWord] += 1;
			} else {
				count[lowerWord] = 1;
			}
		});

		const sortedCountArray = Object.entries(count).sort((a, b) => b[1] - a[1]);
		setWordCount(sortedCountArray);
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
			<div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
				<h1 className="text-2xl font-bold mb-4 text-center">Word Counter</h1>
				<textarea
					className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
					cols="50"
					rows="5"
					placeholder="Enter your text here..."
					value={text}
					onChange={(e) => setText(e.target.value)}
				></textarea>
				<button
					className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
					onClick={onSubmit}
				>
					Submit
				</button>
				<div className="mt-6">
					<h2 className="text-xl font-semibold mb-4">Word Count:</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						<AnimatePresence>
							{wordCount.map(([word, count]) => (
								<motion.div
									key={word}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									className="bg-gray-100 shadow-md border border-gray-200 rounded-md p-3 text-center"
								>
									<strong className="text-lg">{word}</strong>
									<p className="text-gray-600">Count: {count}</p>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
