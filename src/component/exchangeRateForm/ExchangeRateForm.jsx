import React, { useState } from 'react';
import './ExchangeRateForm.css';

const ExchangeRateForm = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [rate, setRate] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [message, setMessage] = useState('');


  const currencies = ['USD', 'GBP', 'AUD', 'CAD'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const baseUrl = 'http://127.0.0.1:8000/api';
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`${baseUrl}/exchange-rates`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          base_currency: baseCurrency,
          rate: parseFloat(rate),
          date: date,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed with status: ${response.status}`);
      }

      const data = await response.json();
      setMessage('Exchange rate added successfully!');
      setTimeout(() => {
        setBaseCurrency('USD');
        setRate('');
        setDate(new Date().toISOString().split('T')[0]);
        setMessage('');
      }, 3000);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="exchange-form-container">
      <h3 className="exchange-form-title">Add New Exchange Rate</h3>
      {message && <p className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="base-currency">Base Currency:</label>
          <select
            id="base-currency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            required
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rate">Rate:</label>
          <input
            type="number"
            id="rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            step="0.0001"
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Rate</button>
      </form>
    </div>
  );
};

export default ExchangeRateForm;