import './NotFound.css';

const NotFound = ({ error }) => {
  let message;
  let code;

  if (error) {
    // eslint-disable-next-line react/prop-types
    message = error.message;
    // eslint-disable-next-line react/prop-types
    code = error.code;
  } else {
    message = '';
    code = '';
  }

  return (
    <div className="not-found">
       <div className='notfound-container'>
      <h1> ALGO SALIÓ MAL {code}</h1>
      </div>
      <p>{message}</p>
      {code === 404 && (
        <p>
          La página que estás buscando no existe. Es posible que la URL sea incorrecta o que la página haya sido eliminada.
        </p>
      )}

      {code === 500 && (
        <p>
          Se ha producido un error interno del servidor. Intenta volver a cargar la página más tarde o contacta con el administrador del sitio web.
        </p>
      )}
      <a href="/">Volver a la página de inicio</a>
      </div>
  );
};

export default NotFound;
