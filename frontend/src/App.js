import React from "react";
import JobList from "./components/JobList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Job Platform</h1>
      </header>
      <JobList />
    </div>
  );
}

export default App;
