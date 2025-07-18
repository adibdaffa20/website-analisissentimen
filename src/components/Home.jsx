import React from "react";
import "../style/Home.css";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#FFA500", "#87EAF2"];

const counts = {
  positif: 800,
  negatif: 800,
};

const data = [
  { name: "Negatif", value: counts.negatif },
  { name: "Positif", value: counts.positif },
];

const Home = () => {
  return (
    <div className="home-wrapper">
      <h2 className="result-title">Hasil Analisis Ulasan Pelanggan IndiHome Menggunakan Metode RNN dengan LSTM</h2>
      <div className="result-section">
        <h3 className="result-title">Jumlah Dataset</h3>
        <p>Komposisi sentimen berupa positif dan negatif.</p>
        <div className="result-summary">
          <div className="result-box positif">
            <h3>{counts.positif}</h3>
            <span>Positif</span>
          </div>
          <div className="result-box negatif">
            <h3>{counts.negatif}</h3>
            <span>Negatif</span>
          </div>
          <div className="result-box total">
            <h3>{counts.positif + counts.negatif}</h3>
            <span>Total</span>
          </div>
        </div>
        <div className="result-chart">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="evaluation-section">
        <h3>Overall Statistics:</h3>
        <pre>
        Mean Accuracy: 89.00% (+/- 2.11%)
        Mean Loss: 0.3144 (+/- 0.0305)
        </pre>
        <h3>Average Classification Metrics Across All Folds:</h3>
        <pre>
            Negatif Class:
            - Precision: 0.869
            - Recall: 0.920
            - F1-Score: 0.893

            Positif Class:
            - Precision: 0.918
            - Recall: 0.860
            - F1-Score: 0.887

            Overall Macro Average:
            - Precision: 0.893
            - Recall: 0.890
            - F1-Score: 0.890
        </pre>
        <h3>Confusion Matrix Aggregated (All Folds)</h3>
        <img
        src="/images/confusion-matrix.png"
        alt="Confusion Matrix"
        style={{ maxWidth: "100%", height: "auto" }}
        />
        <h4>Confusion Matrix Average (Across Folds)</h4>
        <img
        src="/images/confusion-matrix-avg.png"
        alt="Confusion Matrix"
        style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default Home;
