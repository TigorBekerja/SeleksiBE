/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.get('/conversations', 'ConversationsController.index')
Route.post('/conversations', 'ConversationsController.store')
Route.put('/conversations/:id', 'ConversationsController.update')
Route.delete('/conversations/:id', 'ConversationsController.destroy')

Route.get('/messages', 'MessagesController.index')
Route.post('/messages', 'MessagesController.store')
Route.delete('/messages/:id', 'MessagesController.destroy')

Route.get('/pivots', 'PivotsController.index')
Route.post('/pivots', 'PivotsController.store')
Route.delete('/pivots/:id', 'PivotsController.destroy')