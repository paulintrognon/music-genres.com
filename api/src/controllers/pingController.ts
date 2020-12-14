import { Router } from 'express'

const router = Router()

router.get('/', (req, res, next) => next({ ping: 'Hello World!' }))

export default router
