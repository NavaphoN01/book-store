import Router from 'koa-router'
import category from './category'

const apiRouter = new Router()

apiRouter.get('/api/greet', async (ctx, next) => {
  ctx.body = {msg: 'Hello world.'}
})
  
apiRouter.use('/api/category', category.routes())

export default apiRouter
