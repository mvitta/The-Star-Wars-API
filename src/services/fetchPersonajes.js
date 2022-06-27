const personajes = async (url, query, page) => {
  try {
    const response = await fetch(`${url}${query}/?page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(new Error(error));
  }
};

export default personajes;
