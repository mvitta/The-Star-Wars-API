import { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import personajes from '../src/services/fetchPersonajes';
import getPersonaje from '../src/services/fetchOnePersonaje';
import Header from './components/Header';
import Footer from './components/Footer';
// spanglish jaja
function App() {
  const [caracteres, setCaracteres] = useState({});
  const [ID, setId] = useState(1); // almacena el id del personaje
  const [detalles, setDetalles] = useState({});
  const [textBuscar, setTextBuscar] = useState('');
  const [pagina, setPagina] = useState(1);
  const buscar = useRef('');

  const BASEURL = 'https://swapi.dev/api/';

  //obtiene todos los personajes de la pagina 1
  useEffect(() => {
    personajes(BASEURL, 'people', pagina).then((res) => {
      setCaracteres(res);
    });
  }, [pagina]);

  //hace render cuando el useState de la ID cambia
  useEffect(() => {
    getPersonaje(BASEURL, ID).then((res) => {
      setDetalles(res);
    });
  }, [ID]);

  // render cuando carga la pagina, para obtener la seccion donde se encuentran los nombres de los personajes

  useEffect(() => {
    document.getElementById('name-list').addEventListener('click', (e) => {
      const id = e.target.id;
      setId(id);
    });
  }, []);

  // useRef para referencia el input y asignarle un evento chance y obtener el contenido del input

  useEffect(() => {
    const actual = buscar.current;
    actual.addEventListener('change', () => {
      setTextBuscar(actual.value);
    });
  }, []);

  // para pasar a la pagina siquiente o anterior
  function cambiarPagina(numero) {
    setPagina(pagina + numero);
  }

  return (
    <div className='App'>
      <Header />
      <main>
        <div className='section-search'>
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
                .then((data) => {
                  setCaracteres(data);
                })
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
        <div className='section-pagination'>
          <button
            onClick={() => {
              cambiarPagina(-1);
            }}
          >
            Anterior
          </button>
          <span>{pagina}</span>
          <button
            onClick={() => {
              cambiarPagina(1);
            }}
          >
            Siquiente
          </button>
        </div>
        {detalles && (
          <section className='section-details'>
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
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
