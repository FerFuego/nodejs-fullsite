import { Viajes } from "../models/Viaje.js";

const pageIndex = (req, res) => {
    res.render('inicio', {
        pagina: 'Agencia de viajes',
        clase: 'home'
    });
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