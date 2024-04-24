//Método GET
export const getObstaculos = async () => {  
    try {  
      const response = await fetch('http://localhost:3000/Obstaculos'); 
      const data = await response.json(); 
      return data 
    } catch (error) { 
      console.error('Error fetching api:', error); 
    }
  };
//Método DELETE
export    const deleteObstaculo = async (id) => {  
   await fetch(`http://localhost:3000/Obstaculos/${id}`, { 
      method: 'DELETE'
    });
};

//Método POST
export const addObstaculo = async (data) => {
  try {
      const response = await fetch('http://localhost:3000/Obstaculos', { 
          method: 'POST', 
          headers: { 
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (response.ok) { 
          return { success: true };
      } else {
          return { success: false, error: 'Hubo un problema al añadir tu bicicleta. Por favor, intenta de nuevo más tarde.' };
      }
  } catch (error) { 
      console.error('Error:', error);
      return { success: false, error: 'Hubo un problema al añadir tu bicicleta. Por favor, intenta de nuevo más tarde.' };
  }
};
//get para introducir datos en el formulario de editar
export const getItemById = async (id) => { 
  try {
    const response = await fetch(`http://localhost:3000/Obstaculos/${id}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching api:', error);
  }
};
//Método PUT
export const updateItem = async (id, newData) => { 
  try {
    const response = await fetch(`http://localhost:3000/Obstaculos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });

    if (!response.ok) { 
      throw new Error('Error updatingItem'); 
    }

    return response.json(); 
  } catch (error) {
    console.error('Error updatingItem:', error);
    throw error;
  }
};

//Método GET
export const getOneObstaculo = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/Obstaculos/${id}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching Obstaculos:', error);
  }
};
