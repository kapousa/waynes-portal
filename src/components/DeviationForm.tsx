import React, { useState } from 'react';

const DeviationForm = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    issue_description: '',
    batch_info: '',
    locale: 'en' // Default to English
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your actual Render URL
      const response = await fetch('https://waynes-portal-cms.onrender.com/api/deviation-reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formData }), // Strapi requires the 'data' wrapper
      });

      if (response.ok) {
        alert('Report submitted successfully!');
        setFormData({ product_name: '', issue_description: '', batch_info: '', locale: 'en' });
      } else {
        alert('Error submitting report.');
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Product deviation reporting</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Which product does the discrepancy refer to? *</label>
          <input
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>What is wrong with the product? *</label>
          <textarea
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            name="issue_description"
            value={formData.issue_description}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Enter batch number/best before date *</label>
          <input
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            name="batch_info"
            value={formData.batch_info}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0056b3', color: 'white', border: 'none', cursor: 'pointer' }}>
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default DeviationForm;