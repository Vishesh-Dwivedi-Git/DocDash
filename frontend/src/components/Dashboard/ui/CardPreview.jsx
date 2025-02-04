import React from 'react';

// CardPreview Component takes a single upload item as a prop
const CardPreview = ({ upload }) => {
  // Function to render the appropriate preview based on the link type
  const renderPreview = (link) => {
    // Check if link is valid
    if (!link || typeof link !== 'string') return null;

    const fileExtension = link.split('.').pop()?.toLowerCase();

    // Check the file type based on the extension
    if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'gif') {
      return <img src={link} alt="Image Preview" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />;
    }

    if (fileExtension === 'mp4' || fileExtension === 'mov' || fileExtension === 'avi') {
      return <video src={link} controls style={{ width: '100%', borderRadius: '8px' }} />;
    }

    if (fileExtension === 'pdf') {
      return <iframe src={link} width="100%" height="200px" style={{ borderRadius: '8px' }} />;
    }

    return null; // Default if no match is found
  };

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        width: '300px',
        margin: '10px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <h3>{upload?.title}</h3>
      <p>{upload?.description}</p>
      {renderPreview(upload?.link)}
    </div>
  );
};

export default CardPreview;
