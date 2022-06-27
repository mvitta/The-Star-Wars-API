const getPersonaje = async (url, id) => {
  try {
    const response = await fetch(`${url}people/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(new Error(error));
  }
};

export default getPersonaje;
