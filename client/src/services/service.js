import axios from 'axios';

//Método GET
export const getRetos = async () => {  
    try {  
      const response = await fetch('http://localhost:3000/retos'); 
      const data = await response.json(); 
      return data 
    } catch (error) { 
      console.error('Error fetching api:', error); 
    }
  };
//Método DELETE
export    const deleteReto = async (id) => {  
   await fetch(`http://localhost:3000/retos/${id}`, { 
      method: 'DELETE'
    });
};

//Método POST
export const addReto = async (data) => {
  try {
      const response = await fetch('http://localhost:3000/retos', { 
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
    const response = await fetch(`http://localhost:3000/retos/${id}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching api:', error);
  }
};
//Método PUT
export const updateItem = async (id, newData) => { 
  try {
    const response = await fetch(`http://localhost:3000/retos/${id}`, {
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



//Método GET por Id
export const getOneReto = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/retos/${id}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching Retos:', error);
  }
};


export const uploadImage = async (imageData) => {
  try {
    const response = await axios.post(
      "http://api.cloudinary.com/v1_1/dlg7gpmha/image/upload", 
      imageData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al cargar la imagen en Cloudinary: " + error.message);
  }
};

// // Método para eliminar una imagen de Cloudinary
export const deleteImage = async (imageUrl) => {
  try {
      const response = await fetch(`http://api.cloudinary.com/v1_1/dlg7gpmha/image/destroy?url=${imageUrl}`, {
          method: 'DELETE',
          headers: {
              'Authorization': 'Bearer 814857226871881', 
          },
      });
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      throw new Error('Error deleting image from Cloudinary');
  }
};