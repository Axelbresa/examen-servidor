const User = require("../models/Reserva");
const ctrlReservas = {};

ctrlReservas.lista = (req, res) => {
  res.render("lista_reservas");
};

ctrlReservas.crearreserva = (req, res) => {
  res.render("crear");
};

ctrlReservas.renderEditar=(req, res)=>{
  const reservaId = req.params.id;
  res.render("editar", { id: reservaId });
};

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
ctrlReservas.listadoReserva= async (req, res)=>{
    try {
      const reservas = await User.findAll({
          where: {
              estado: true
          }
      });
  
      return res.json(reservas);
  } catch (error) {
      console.log('Error al obtener las reservas', error);
      return res.status(500).json({
          message: 'Error al obtener las reservas'
      })
  }
  }
// Obtener una reserva
ctrlReservas.obtenerUnaReserva= async (req, res)=>{
    try {
      const { id } = req.params;
      const reserva = await User.findOne({
          whare: {
              estado: true,
              id
          }
      });
      return res.json(reserva);
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          message: 'Error al obtener la reserva'
      })
  }
  }
// Crear una reserva
ctrlReservas.crearreserva = async (req, res) => {
    const {    
      nombre,
      apellido,
      fecha_ingreso,
      fecha_salida,
      habitacion,
      cantidad_personas,
      telefono,
      email } = req.body;
  
      try{//se crea una instancia de la reserva
        const NuevaReserva = new User  ({  
          nombre,
          apellido,
          fecha_ingreso,
          fecha_salida,
          habitacion,
          codigo:  new Date().getTime(),
          cantidad_personas,
          telefono,
          email })
  
          await NuevaReserva.save()
  
          return res.status(201).json({
            message: 'Se creo la reserva'
  
          })
  
      }catch{
        console.log('Error al crear la reserva')
          return res.status(500).json({
            message: 'Error al crear la reserva'
          })
      }
  
  };
  

// Actualizar una reserva
ctrlReservas.actualizarReserva=async(req, res)=>{
    try {
      const { id } = req.params;
      const reserva = await User.findByPk(id);
      await reserva.update(req.body)
      return res.json({
          message: 'Reserva actualizada exitosamente'
      });
  } catch (error) {
      console.log('Error al actualizar la reserva', error);
      return res.status(error.status || 500).json({
          message: error.message
      })
  }
  }
// Eliminar una reserva de forma lógica
ctrlReservas.EliminarReserva = async (req, res)=>{
    try {
      const { id } = req.params;
      if(!id){
          throw({
              status: 400,
              message: 'No se ha enviado el id de la reserva'
          })
      }
      const reserva = await User.findByPk(id);
      await reserva.update({ estado: false });
      return res.json({ message: 'Reserva se eliminó correctamente' })
  } catch (error) {
      console.log('Error al eliminar la reserva', error);
      return res.status(error.status || 500).json({
          message: error.message || 'Error al eliminar la reserva'
      })
  }
  }

module.exports = ctrlReservas;


