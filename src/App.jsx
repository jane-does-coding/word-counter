import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMoon, IoSunnyOutline } from "react-icons/io5";
import "./App.css";

function App() {
	const [text, setText] = useState("");
	const [wordCount, setWordCount] = useState([]);
	const [charCount, setCharCount] = useState(0);
	const [totalWords, setTotalWords] = useState(0);
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
	const [caseSensitive, setCaseSensitive] = useState(false);
	const [longestWord, setLongestWord] = useState("");
	const [shortestWord, setShortestWord] = useState(""); // New state for shortest word

	useEffect(() => {
		document.body.className = theme;
		localStorage.setItem("theme", theme);
	}, [theme]);

	const onSubmit = () => {
		const wordsArray = text.split(/\s+/).filter((word) => word.trim() !== "");
		const count = {};

		wordsArray.forEach((word) => {
			const processedWord = caseSensitive ? word : word.toLowerCase();
			if (count[processedWord]) {
				count[processedWord] += 1;
			} else {
				count[processedWord] = 1;
			}
		});

		const sortedCountArray = Object.entries(count).sort((a, b) => b[1] - a[1]);
		setWordCount(sortedCountArray);
		setCharCount(text.length);
		setTotalWords(wordsArray.length);

		const longest = wordsArray.reduce(
			(longest, current) =>
				current.length > longest.length ? current : longest,
			""
		);
		setLongestWord(longest);

		// Find shortest word
		const shortest = wordsArray.reduce(
			(shortest, current) =>
				current.length < shortest.length && current.length > 0
					? current
					: shortest,
			wordsArray[0] || ""
		);
		setShortestWord(shortest || "N/A");
	};

	const clearText = () => {
		setText("");
		setWordCount([]);
		setCharCount(0);
		setTotalWords(0);
		setLongestWord("");
		setShortestWord("");
	};

	const copyText = () => {
		navigator.clipboard.writeText(text);
		alert("Text copied to clipboard!");
	};

	const copyWordCount = () => {
		const countText = wordCount
			.map(([word, count]) => `${word}: ${count}`)
			.join(", ");
		navigator.clipboard.writeText(countText);
		alert("Word count copied to clipboard!");
	};

	const copyMostFrequentWord = () => {
		if (wordCount.length > 0) {
			const [mostFrequentWord] = wordCount[0];
			navigator.clipboard.writeText(mostFrequentWord);
			alert("Most frequent word copied to clipboard!");
		} else {
			alert("No words to copy!");
		}
	};

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	const toggleCaseSensitivity = () => {
		setCaseSensitive(!caseSensitive);
	};

	return (
		<div
			className={`min-h-screen w-full ${
				theme === "light" ? "bg-neutral-50" : "bg-neutral-900"
			} flex items-center justify-center p-5`}
		>
			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className={`w-fit mt-2 py-2 px-2 text-white font-semibold rounded-full focus:outline-none focus:ring-2 fixed top-8 right-10 ${
					theme === "light"
						? "bg-neutral-400 focus:ring-neutral-500"
						: "bg-neutral-800 focus:ring-neutral-600"
				}`}
				onClick={toggleTheme}
			>
				{theme === "light" ? (
					<IoMoon size={28} />
				) : (
					<IoSunnyOutline size={28} />
				)}
			</motion.button>
			<div
				className={`max-w-2xl w-full ${
					theme === "light" ? "bg-white" : "bg-neutral-800"
				} shadow-lg rounded-lg p-6`}
			>
				<motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className={`text-2xl font-bold mb-4 text-center ${
						theme === "light" ? "text-neutral-900" : "text-white"
					}`}
				>
					Word Counter
				</motion.h1>
				<motion.textarea
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className={`w-full p-3 bg-neutral-10 ${
						theme === "light" ? "border-neutral-300" : "border-neutral-600"
					} border rounded-md mb-4 focus:outline-none focus:ring-2 ${
						theme === "light" ? "focus:ring-blue-400" : "focus:ring-blue-300"
					} ${totalWords > 100 ? "border-red-500" : "border-neutral-300"}`} // Dynamic class
					cols="50"
					rows="5"
					placeholder="Enter your text here..."
					value={text}
					onChange={(e) => {
						setText(e.target.value);
						const wordsArray = e.target.value
							.split(/\s+/)
							.filter((word) => word.trim() !== "");
						setTotalWords(wordsArray.length);
						setCharCount(e.target.value.length);

						const longest = wordsArray.reduce(
							(longest, current) =>
								current.length > longest.length ? current : longest,
							""
						);
						setLongestWord(longest);

						const shortest = wordsArray.reduce(
							(shortest, current) =>
								current.length < shortest.length && current.length > 0
									? current
									: shortest,
							wordsArray[0] || ""
						);
						setShortestWord(shortest || "N/A");
					}}
				></motion.textarea>
				<div className="flex gap-2">
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={`w-full py-2 px-4 ${
							theme === "light" ? "bg-neutral-500" : "bg-neutral-700"
						} text-white font-semibold rounded-md hover:${
							theme === "light" ? "bg-neutral-600" : "bg-neutral-800"
						} focus:outline-none focus:ring-2 focus:ring-neutral-400`}
						onClick={onSubmit}
					>
						Submit
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="w-full py-2 px-4 bg-neutral-500 text-white font-semibold rounded-md hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-400"
						onClick={clearText}
					>
						Clear
					</motion.button>
				</div>

				<div className="flex gap-2">
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="w-full mt-2 py-2 px-4 bg-neutral-500 text-white font-semibold rounded-md hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-400"
						onClick={copyText}
					>
						Copy Text
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="w-full mt-2 py-2 px-4 bg-neutral-500 text-white font-semibold rounded-md hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-400"
						onClick={copyWordCount}
					>
						Copy Word Count
					</motion.button>
				</div>

				<div className="flex gap-2">
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="w-full mt-2 py-2 px-4 bg-neutral-500 text-white font-semibold rounded-md hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-400"
						onClick={copyMostFrequentWord}
					>
						Copy Most Frequent Word
					</motion.button>
				</div>

				<div className="flex gap-2 items-center mt-4">
					<label
						className={`text-lg font-semibold ${
							theme === "light" ? "text-neutral-900" : "text-white"
						}`}
					>
						Case Sensitive
					</label>
					<input
						type="checkbox"
						checked={caseSensitive}
						onChange={toggleCaseSensitivity}
						className="toggle-checkbox"
					/>
				</div>

				<div className="flex gap-2">
					<div className="mt-6 flex gap-2 w-1/2">
						<motion.h2
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className={`text-xl font-semibold mb-4 ${
								theme === "light" ? "text-neutral-900" : "text-white"
							}`}
						>
							Character Count:
						</motion.h2>
						<p
							className={`text-lg ${
								theme === "light" ? "text-neutral-900" : "text-white"
							}`}
						>
							{charCount}
						</p>
					</div>
					<div className="mt-6 flex gap-2 w-1/2">
						<motion.h2
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className={`text-xl flex font-semibold mb-4 ${
								theme === "light" ? "text-neutral-900" : "text-white"
							}`}
						>
							Total Words:
						</motion.h2>
						<p
							className={`text-lg flex ${
								theme === "light" ? "text-neutral-900" : "text-white"
							}`}
						>
							{totalWords}
						</p>
					</div>
				</div>

				<div className="mt-6">
					<motion.h2
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className={`text-xl font-semibold mb-4 ${
							theme === "light" ? "text-neutral-900" : "text-white"
						}`}
					>
						Longest Word:
					</motion.h2>
					<p
						className={`text-lg ${
							theme === "light" ? "text-neutral-900" : "text-white"
						}`}
					>
						{longestWord || "N/A"}
					</p>
				</div>

				<div className="mt-6">
					<motion.h2
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className={`text-xl font-semibold mb-4 ${
							theme === "light" ? "text-neutral-900" : "text-white"
						}`}
					>
						Shortest Word:
					</motion.h2>
					<p
						className={`text-lg ${
							theme === "light" ? "text-neutral-900" : "text-white"
						}`}
					>
						{shortestWord || "N/A"}
					</p>
				</div>

				<div className="mt-6">
					<motion.h2
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className={`text-xl font-semibold mb-4 ${
							theme === "light" ? "text-neutral-900" : "text-white"
						}`}
					>
						Word Count:
					</motion.h2>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						<AnimatePresence>
							{wordCount.map(([word, count]) => (
								<motion.div
									key={word}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									className={`${
										theme === "light" ? "bg-neutral-100" : "bg-neutral-700"
									} shadow-md border ${
										theme === "light"
											? "border-neutral-200"
											: "border-neutral-600"
									} rounded-md p-3 text-center`}
								>
									<strong
										className={`text-lg ${
											theme === "light" ? "text-neutral-900" : "text-white"
										}`}
									>
										{word}
									</strong>
									<p
										className={`text-neutral-600 ${
											theme === "light" ? "" : "text-neutral-400"
										}`}
									>
										Count: {count}
									</p>
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
