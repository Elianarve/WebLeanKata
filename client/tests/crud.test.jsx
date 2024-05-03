
// import request from 'supertest'; // Importa supertest para realizar solicitudes HTTP
// import { createBrowserRouter } from '../src/router/router'; // Importa la función createBrowserRouter del enrutador
// import { it, describe, expect } from 'vitest';

// describe('CRUD Tests', () => {
//   it('should create a new item', async () => {
//     const newItem = {
//       nombre: 'Nuevo Elemento',
//       descripcion: 'Descripción del nuevo elemento',
//     };

//     const response = await request(services) // Debes asegurarte de que 'app' esté definido correctamente en tu aplicación
//       .post('./crud.test.js')
//       .send(newItem)
//       .expect(201);

//     expect(response.body).toHaveProperty('id');
//   });

//   it('should get the created item', async () => {
//     // Simula la recuperación de datos de la base de datos
//     // Puedes usar jest.fn() para crear funciones simuladas
//     const data = {
//       nombre: 'Nuevo Elemento',
//       descripcion: 'Descripción del nuevo elemento',
//     };

//     createBrowserRouter.mockReturnValueOnce(data); // Debes asegurarte de que createBrowserRouter esté definido correctamente en el enrutador

//     // Tu código de prueba aquí
//   });

//   // Agrega más casos de prueba según sea necesario
// });
