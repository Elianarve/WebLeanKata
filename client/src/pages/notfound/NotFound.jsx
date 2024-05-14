import './NotFound.css';

const NotFound = () => {

  window.onerror = (_message, _source, _lineno, _colno, error) => {

    console.error(error);

    switch (error.code) {
      case 404:
        return (
          <div className="not-found">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/">TRY GOING BACK TO HOME PAGE</a>
          </div>
        );
      case 500:
        return (
          <div className="not-found">
            <h1>500 - Internal Server Error</h1>
            <p>There was an error on the server. Please try again later.</p>
            <a href="/">TRY GOING BACK TO HOME PAGE</a>
          </div>
        );
      default:
        return (
          <div className="not-found">
            <h1>An error occurred.</h1>
            <p>Error Code: {error.code}</p>
            <a href="/">TRY GOING BACK TO HOME PAGE</a>
          </div>
        );
    }
  };

  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>WE KEEP WORKING TO FIX THIS ISSUE.</p>
      <a href="/">TRY GOING BACK TO HOME PAGE</a>
    </div>
  );
};

export default NotFound;