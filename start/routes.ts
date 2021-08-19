import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.get('/', async ({ response }: HttpContextContract) => {
  return response.redirect('/docs')
})

Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.get('/logout', 'AuthController.logout').middleware('auth')

Route.group(() => {
  Route.get('/', 'RestaurantsController.index')
  Route.get('/:restaurant_id', 'RestaurantsController.find')
  Route.post('/address/:restaurant_id', 'RestaurantsController.storeAddress').middleware('auth')
  Route.post('/foods/add', 'RestaurantsController.addFood').middleware('auth')
  Route.put('/foods/:food_id', 'RestaurantsController.updateFood').middleware('auth')
  Route.get('/foods/:food_id', 'RestaurantsController.findFood')
  Route.delete('/foods/:food_id', 'RestaurantsController.destroyFood').middleware('auth')
  Route.post('/store', 'RestaurantsController.store').middleware('auth')
  Route.post('/update/:restaurant_id', 'RestaurantsController.update').middleware('auth')
  Route.delete('/delete/:restaurant_id', 'RestaurantsController.destroy').middleware('auth')
}).prefix('/restaurants')

Route.group(() => {
  Route.get('/', 'FoodsController.index')
}).prefix('/foods')

Route.group(() => {
  Route.get('/', 'OrdersController.index').middleware('auth')
  Route.get('/:order_id', 'OrdersController.find').middleware('auth')
  Route.post('/store', 'OrdersController.store').middleware('auth')
  Route.post('/update/:order_id', 'OrdersController.update').middleware('auth')
  Route.delete('/delete/:order_id', 'OrdersController.destroy').middleware('auth')
}).prefix('/orders')

Route.group(() => {
  Route.get('/', 'UsersController.index')
  Route.get('/:user_id', 'UsersController.find')
  Route.post('/orders', 'UsersController.getOrders').middleware('auth')
  Route.post('/address/:user_id', 'UsersController.storeUserAddress').middleware('auth')
  Route.post('/store', 'UsersController.store').middleware('auth')
  Route.put('/update/:user_id', 'UsersController.update').middleware('auth')
  Route.delete('/delete/:user_id', 'UsersController.destroy').middleware('auth')
}).prefix('/users')
