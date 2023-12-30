// src/CryptoConverter.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import cryptoStyles from "./Crypto.module.css";
import { FaArrowRight } from "react-icons/fa";

const CryptoConverter = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [sourceCrypto, setSourceCrypto] = useState("");
  const [amount, setAmount] = useState(1);
  const [targetCurrency, setTargetCurrency] = useState("usd");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of cryptocurrencies
    axios
      .get("https://crypto-converter-olr4.onrender.com/cryptocurrencies")
      .then((response) => {
        setCryptocurrencies(response.data);
        setSourceCrypto(response.data[0]?.id || "");
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching cryptocurrencies");
      });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic input validation
    if (!sourceCrypto || isNaN(amount) || amount <= 0 || !targetCurrency) {
      setError("Please fill in all fields with valid values.");
      return;
    }

    // Submit the request to convert currency
    axios
      .get(
        `https://crypto-converter-olr4.onrender.com/convert?sourceCrypto=${sourceCrypto}&amount=${amount}&targetCurrency=${targetCurrency}`
      )
      .then((response) => {
        setConvertedAmount(response.data.convertedAmount);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Error converting currency");
        setConvertedAmount(null);
      });
  };

  return (
    <>
      <h1>Cryptocurrency Converter Calculator</h1>
      <div className={cryptoStyles.container}>
        <form className={cryptoStyles.form} onSubmit={handleSubmit}>
          {/* <label>Amount:</label> */}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
          />
          <div className={cryptoStyles.selectMain}>
            {/* <label>Source Cryptocurrency:</label> */}
            <select
              value={sourceCrypto}
              onChange={(e) => setSourceCrypto(e.target.value)}
            >
              {cryptocurrencies?.map((crypto) => (
                <option key={crypto.id} value={crypto?.id}>
                  {crypto?.name} ({crypto?.symbol})
                </option>
              ))}
            </select>

            <div className={cryptoStyles.sign}>
            <FaArrowRight />
            </div>

            {/* <label>Target Currency: </label> */}
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="inr">INR</option>
              {/* Add more currency options as needed */}
            </select>
          </div>

          <button className={cryptoStyles.button} type="submit">
            Convert
          </button>
        </form>
        {convertedAmount !== null && (
          <p>
            {amount}<span>{sourceCrypto}</span> = <span className={cryptoStyles.amountText}>{convertedAmount}</span> {targetCurrency.toUpperCase()}
          </p>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default CryptoConverter;
