import React, { useState } from "react";
import Papa from "papaparse";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import "../style/ResultSection.css";

const COLORS = ["#FFA500", "#87EAF2"]; // Negatif (orange), Positif (biru)

const ResultSection = () => {
  const [data, setData] = useState([]);
  const [counts, setCounts] = useState({ positif: 0, negatif: 0 });

  const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
      const rows = result.data;
      let positif = 0;
      let negatif = 0;

      rows.forEach((row) => {
        const label = row.sentiment_label?.toLowerCase().trim(); // ✅ gunakan kolom sentiment_label
        if (label === "positif") positif++;
        else if (label === "negatif") negatif++;
      });

      setCounts({ positif, negatif });
    },
  });
};

  return (
    <div className="result-wrapper">
      <h2 className="result-title">Result</h2>
      <p className="result-desc">Komposisi sentimen berupa positif dan negatif.</p>

      <input type="file" accept=".csv" onChange={handleFileUpload} className="csv-upload-input" />

      {(counts.positif + counts.negatif > 0) && (
        <>
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
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultSection;
