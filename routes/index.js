import express from 'express';
import { pageIndex, pageWeAre, pageTravels, pageTravelBySlug } from '../controllers/paginasController.js';
import { pageTestimonials, saveTestimonials } from '../controllers/testimonialController.js';

const router = express.Router();

// req: peticion, res: respuesta de express
//router.get ('/', (req, res) => {
    // envia un mensaje por defecto
    // res.send('Hello World'); 
    // envia un objeto JSON
    // res.json({ 
    //   message: 'Hello World'
    // }); 
    // envia una vista HTML
    // res.render('index', {title: 'Agencia de viajes', message: 'Hello World'});
//})

router.get('/', pageIndex)
router.get('/nosotros', pageWeAre)
router.get('/viajes', pageTravels)
router.get('/viajes/:slug', pageTravelBySlug)
router.get('/testimoniales', pageTestimonials)
router.post('/testimoniales', saveTestimonials)

export default router;