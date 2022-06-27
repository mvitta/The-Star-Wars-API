import { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import personajes from '../src/services/fetchPersonajes';
import getPersonaje from '../src/services/fetchOnePersonaje';
// spanglish jaja
function App() {
  const [caracteres, setCaracteres] = useState({});
  const [ID, setId] = useState(1); // almacena el id del personaje
  const [detalles, setDetalles] = useState({});
  const [textBuscar, setTextBuscar] = useState('');
  const [pagina, setPagina] = useState(1);
  const buscar = useRef('');

  const BASEURL = 'https://swapi.dev/api/';

  useEffect(() => {
    personajes(BASEURL, 'people', pagina).then((res) => {
      console.log(res);
      setCaracteres(res);
    });
  }, [pagina]);

  useEffect(() => {
    getPersonaje(BASEURL, ID).then((res) => {
      // console.log(res);
      setDetalles(res);
    });
  }, [ID]);

  useEffect(() => {
    document.getElementById('name-list').addEventListener('click', (e) => {
      const id = e.target.id;
      setId(id);
    });
  }, []);

  useEffect(() => {
    const actual = buscar.current;
    actual.addEventListener('change', () => {
      setTextBuscar(actual.value);
    });
  }, []);

  function cambiarPagina(numero) {
    setPagina(pagina + numero);
  }

  return (
    <div className='App'>
      <div style={{ padding: '20px' }}>
        <label htmlFor='search'>Buscar Personaje</label>
        <br />
        <input ref={buscar} type='text' name='search' id='search' />
        <br />
        <button
          id='btn-buscar'
          onClick={() => {
            setDetalles({});
            fetch(`https://swapi.dev/api/people/?search=${textBuscar}`)
              .then((response) => response.json())
              .then((data) => setCaracteres(data.results))
              .catch((err) => console.log(new Error(err)));
          }}
        >
          Buscar
        </button>
      </div>
      <div id='name-list'>
        {caracteres?.results?.map((caracter, index) => {
          const { name, url } = caracter;
          const id = url.split('/').slice(-2)[0];
          return (
            <h1 id={id} key={crypto.randomUUID()}>
              {index} : {name}
            </h1>
          );
        })}
      </div>
      <div style={{ margin: '10px', textAlign: 'center' }}>
        <button
          onClick={() => {
            cambiarPagina(-1);
          }}
        >
          Anterior
        </button>
        <span style={{ padding: '0 10px 0 10px' }}>{pagina}</span>
        <button
          onClick={() => {
            cambiarPagina(1);
          }}
        >
          Siquiente
        </button>
      </div>
      {detalles && (
        <div>
          <section>
            <h1>{detalles.name}</h1>
            <ul>
              <li>
                <strong>height: </strong> {detalles.height}
              </li>
              <li>
                <strong>mass: </strong> {detalles.mass}
              </li>
              <li>
                <strong>eye color: </strong>
                {detalles.eye_color}
              </li>
              <li>
                <strong>birth year: </strong>
                {detalles.birth_year}
              </li>
            </ul>
          </section>
        </div>
      )}
      <div className='section-button'>
        <button onClick={() => {}}>Mostrar detalles</button>
      </div>
    </div>
  );
}

export default App;
