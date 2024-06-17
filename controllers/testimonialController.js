import { Testimonial } from "../models/Testimonial.js";

const pageTestimonials = async (req, res) => {
    // consulta a la base de datos
    const testimoniales = await Testimonial.findAll();

    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    });
}

const saveTestimonials = async (req, res) => {
    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if (nombre.trim() === '') {
        errores.push({ 'message': 'Agrega tu nombre' });
    }
    if (correo.trim() === '') {
        errores.push({ 'message': 'Agrega tu correo' });
    }
    if (mensaje.trim() === '') {
        errores.push({ 'message': 'Agrega tu mensaje' });
    }
    if (errores.length > 0) {
        // consulta a la base de datos
        const testimoniales = await Testimonial.findAll();
        // muestra la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales,
            errores: errores.length > 0 ? errores : false,
            nombre: errores.length > 0 ? nombre : '',
            correo: errores.length > 0 ? correo : '',
            mensaje: errores.length > 0 ? mensaje : ''
        });
    } else {
        // insertar en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    pageTestimonials,
    saveTestimonials
}