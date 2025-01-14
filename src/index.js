import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18+

function App() {
  return <h1>Hello, React!</h1>;
}

// Get the root DOM node
const rootElement = document.getElementById('root');

// Create a root and render the App component
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
