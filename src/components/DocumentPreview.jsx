import React from "react";

// Create Document Component
const DocumentPreviewer = React.memo(({ document }) => {
  const linkToViewPDF = URL.createObjectURL(document);

  return <iframe title="PDF" src={linkToViewPDF} width="100%" height="100%" />;
});

export default DocumentPreviewer;
