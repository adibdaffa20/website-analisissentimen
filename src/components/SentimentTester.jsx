import React, { useEffect, useState } from "react";
import "../style/SentimentTester.css";
import kamusData from "../data/kamuskatabaku.json";
import kataPositif from "../data/kata_positif.json";
import kataNegatif from "../data/kata_negatif.json";

const stopwords = [
  "yang", "dan", "di", "ke", "dari", "untuk", "dengan", "pada",
  "adalah", "itu", "ini", "sudah", "karena", "jadi", "agar", "sebagai", "atau"
];

const stemming = (word) => word.replace(/(lah|kah|ku|mu|nya|pun|i|kan|an)$/i, "");
const normalizeWord = (word, kamus) => kamus[word.toLowerCase()] || word;

const SentimentTester = () => {
  const [inputText, setInputText] = useState("");
  const [kamusKata, setKamusKata] = useState({});
  const [step, setStep] = useState("cleaned");
  const [processed, setProcessed] = useState({});
  const [sentimentLabel, setSentimentLabel] = useState("");
  const [positifWords, setPositifWords] = useState([]);
  const [negatifWords, setNegatifWords] = useState([]);

  useEffect(() => {
    const parsed = {};
    kamusData.forEach((entry) => {
      parsed[entry.tidak_baku.toLowerCase()] = entry.kata_baku.toLowerCase();
    });
    setKamusKata(parsed);
    setPositifWords(kataPositif.map((w) => stemming(w.toLowerCase())));
    setNegatifWords(kataNegatif.map((w) => stemming(w.toLowerCase())));
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setProcessed({});
    setSentimentLabel("");
  };

  const handleAnalyze = () => {
    const original = inputText;
    const cleaned = original.replace(/[^a-zA-Z\s]/g, "");
    const folded = cleaned.toLowerCase();
    const normalized = folded.split(" ").map((w) => normalizeWord(w, kamusKata)).join(" ");
    const tokenized = normalized.split(/\s+/).filter((t) => t);
    const stopRemoved = tokenized.filter((w) => !stopwords.includes(w));
    const stemmed = stopRemoved.map(stemming);

    setProcessed({ original, cleaned, folded, normalized, tokenized, stopRemoved, stemmed });

    const stemmedSet = new Set(stemmed);
    const hasPositive = positifWords.some((w) => stemmedSet.has(w));
    const hasNegative = negatifWords.some((w) => stemmedSet.has(w));

    let label = "Netral";
    if (hasPositive && !hasNegative) label = "Positif";
    else if (hasNegative && !hasPositive) label = "Negatif";

    setSentimentLabel(label);
  };

  const steps = [
    { id: "cleaned", label: "Cleaning" },
    { id: "folded", label: "Case Folding" },
    { id: "normalized", label: "Normalisasi" },
    { id: "tokenized", label: "Tokenize" },
    { id: "stopRemoved", label: "Stopword Removal" },
    { id: "stemmed", label: "Stemming" },
  ];

  return (
    <div className="sentiment-fullscreen">
      <div className="sentiment-container">
        <h2 className="sentiment-title">Test Sentimen</h2>

        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Ketik teks yang ingin dianalisis sentimennya..."
          className="sentiment-textarea"
        />

        <button onClick={handleAnalyze} className="sentiment-button">
          Analisis Sentimen
        </button>

        {sentimentLabel && (
          <div className="sentiment-label-output">
            <p><strong>Hasil Sentimen:</strong> {sentimentLabel}</p>
          </div>
        )}

        {Object.keys(processed).length > 0 && (
          <>
            <div className="step-tabs">
              {steps.map((s) => (
                <button
                  key={s.id}
                  className={`step-item ${step === s.id ? "active" : ""}`}
                  onClick={() => setStep(s.id)}
                >
                  <span className="step-number">{steps.indexOf(s) + 1}</span> {s.label}
                </button>
              ))}
            </div>

            <div className="table-wrapper">
              <table className="result-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Teks Asli</th>
                    <th>Hasil {steps.find((s) => s.id === step).label}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>{processed.original}</td>
                    <td>
                      {Array.isArray(processed[step])
                        ? (step === "tokenized" || step === "stopRemoved")
                          ? `['${processed[step].join("', '")}']`
                          : `[${processed[step].join(", ")}]`
                        : processed[step] || "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SentimentTester;