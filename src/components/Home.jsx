import React, { useState } from "react";
import Papa from "papaparse";
import "../style/Home.css";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { FaFolderOpen } from "react-icons/fa";

const COLORS = ["#FFA500", "#87EAF2"]; // Negatif, Positif

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState({ positif: 0, negatif: 0 });
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        let positif = 0;
        let negatif = 0;

        result.data.forEach((row) => {
          const label = row.sentiment_label?.toLowerCase().trim();
          if (label === "positif") positif++;
          else if (label === "negatif") negatif++;
        });

        setCounts({ positif, negatif });
        setData([
          { name: "Negatif", value: negatif },
          { name: "Positif", value: positif },
        ]);
        setLoading(false);
      },
    });
  };

  return (
    <div className="home-wrapper">
      <div className="upload-box">
        <div className="upload-left" />
        <div className="upload-right">
          <label htmlFor="csv-upload" className="csv-upload-label">
            <FaFolderOpen style={{ marginRight: "8px" }} />
            Drop Your File CSV. Here!
          </label>
          <input
            type="file"
            id="csv-upload"
            accept=".csv"
            onChange={handleFileUpload}
            className="csv-upload-input"
          />
          <p className="upload-note">Upload file CSV Anda untuk memudahkan proses klasifikasi.</p>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="loading-section">
          <div className="spinner" />
          <p>Memproses data sentimen...</p>
        </div>
      )}

      {/* Hasil */}
      {!loading && (counts.positif + counts.negatif > 0) && (
        <div className="result-section">
          <h2 className="result-title">Result</h2>
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
      )}
    </div>
  );
};

export default Home;
