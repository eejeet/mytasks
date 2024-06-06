import React from 'react';

const ErrorBoundary: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [hasError, setHasError] = React.useState(false);

    const handleError = () => {
        setHasError(true);
    };

    if (hasError) {
        return (
            <div className="container mt-5">
                <h1>Something went wrong.</h1>
                <p>Please try again later.</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default ErrorBoundary;