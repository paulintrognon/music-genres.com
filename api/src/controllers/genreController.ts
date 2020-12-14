import { Router } from 'express'
import { getFromSlug } from '../managers/genreManager'

const router = Router()

router.get('/:slug', async (req, res) => {
  const musicGenre = await getFromSlug(req.params.slug)
  if (!musicGenre) {
    return res.status(404).send({ musicGenre: null })
  }
  res.status(200).send({
    musicGenre,
  })
})

export default router
