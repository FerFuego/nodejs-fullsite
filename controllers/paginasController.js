import { Viajes } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimonial.js";

const pageIndex = async (req, res) => {

    const promiseDB = [];
    // consulta a la base de datos al momento de renderizar la vista
    // ambas promesas se ejecutan al mismo tiempo
    // mejora el rendimiento, no bloquea la vista
    promiseDB.push(Viajes.findAll({ limit: 3 }));
    promiseDB.push(Testimonial.findAll({ limit: 3 }));

    try {
        // consulta a la base de datos
        const [viajes, testimoniales] = await Promise.all(promiseDB);
    
        res.render('inicio', {
            pagina: 'Agencia de viajes',
            clase: 'home',
            viajes,
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
}

const pageWeAre = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const pageTravels = async (req, res) => {

    // consulta a la base de datos
    const viajes = await Viajes.findAll();

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

const pageTravelBySlug = async (req, res) => {
    // consulta a la base de datos
    try {
        const viaje = await Viajes.findOne({
            where: {
                slug: req.params.slug
            }
        });
        res.render('viaje-detalle', {
            pagina: `Viaje a ${viaje.titulo}`,
            viaje
        });
    } catch (error) {
        console.log(error);
    }
}

export {
    pageIndex,
    pageWeAre,
    pageTravels,
    pageTravelBySlug,
}