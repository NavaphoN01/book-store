import Router from 'koa-router'
import category from './category'
import book from './book'
import router from './category'

const apiRouter = new Router()

apiRouter.get('/api/greet', async (ctx, next) => {
  ctx.body = {msg: 'Hello world.'}
})
  
router.use('/api/category', category.routes())
router.use('/api/book', book.routes())


export default router
