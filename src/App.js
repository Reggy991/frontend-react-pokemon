import React, { useEffect, useState } from 'react';
import Pokemon from "./components/Pokemon/Pokemon";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

function App() {
    const [page, setPage] = useState(0);
    const [disablePrevious, setDisablePrevious] = useState(true);
    const [disableNext, setDisableNext] = useState(false);

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    useEffect(() => {
        setDisablePrevious(page === 0);
    }, [page]);

    return (
        <>
            <div className="button-container">
                <button
                    className="list-button"
                    onClick={handlePreviousPage}
                    disabled={disablePrevious}
                >
                    Previous
                </button>
                <button
                    className="list-button"
                    onClick={handleNextPage}
                    disabled={disableNext}
                >
                    Next
                </button>
            </div>
            <Router>
                <Routes>
                    <Route path="/" element={<Pokemon page={page} setDisableNext={setDisableNext} />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
