const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['Authorization']?.split(' ')[1]; // Obtener el token del encabezado Authorization
    if (!token)  return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'sercret_key');
        req.user = verified; // Agregar la información del usuario al objeto req
        next(); // Continuar con la siguiente función middleware o ruta
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};