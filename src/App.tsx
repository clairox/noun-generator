import { useEffect, useState } from 'react'
import './App.css'

function App() {
	const [wordBank, setWordBank] = useState<string[]>([])

	const [count, setCount] = useState<string | number>(20)
	const [words, setWords] = useState<string[]>([])
	const [cols, setCols] = useState<string | number>(1)
	const [outputStyle, setOutputStyle] = useState({ gridTemplateColumns: 'repeat(1, 1fr)' })

	useEffect(() => {
		const loadWordBank = async () => {
			const text = await fetch('src/nouns.txt').then(result => result.text())
			setWordBank(text.split('\n'))
		}

		loadWordBank().catch(err => console.error(err))
	}, [])

	const generateWords = () => {
		const tempWords = []
		while (tempWords.length < +count) {
			const index = Math.floor(Math.random() * wordBank.length)
			tempWords.push(wordBank[index])
		}

		setOutputStyle({ gridTemplateColumns: `repeat(${cols}, 1fr)` })
		setWords(tempWords)
	}

	const shuffleWords = () => {
		const tempWords = words
		for (let i = tempWords.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[tempWords[i], tempWords[j]] = [tempWords[j], tempWords[i]]
		}

		setOutputStyle({ gridTemplateColumns: `repeat(${cols}, 1fr)` })
		setWords(tempWords)
	}

	if (wordBank.length === 0) {
		return <>Loading...</>
	}

	return (
		<>
			<div className="inputGroup">
				<label htmlFor="count">Number of nouns</label>
				<input
					type="text"
					id="count"
					name="count"
					value={count}
					onChange={e => setCount(e.target.value)}
				/>
			</div>
			<div className="inputGroup">
				<label htmlFor="cols">Number of cols</label>
				<select id="rowSelect" value={cols} onChange={e => setCols(e.target.value)}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
				</select>
			</div>
			<button onClick={generateWords}>Generate</button>
			<button onClick={shuffleWords}>Reorder</button>
			{words.length > 0 && (
				<div id="output" style={outputStyle}>
					{words.map((word, idx) => (
						<p key={idx}>{word}</p>
					))}
				</div>
			)}
		</>
	)
}

export default App
