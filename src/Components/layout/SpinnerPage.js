import React from "react";

const SpinnerPage = () => {
        return (
                <React.Fragment>
                        <div className="spinner-grow text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                        </div>
                </React.Fragment>
        );
}

export default SpinnerPage;