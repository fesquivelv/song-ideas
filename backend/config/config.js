module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    // Esto es importante para que la CLI no intente usar valores por defecto
    dialectOptions: {
      underline: true
    }
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Necesario para la mayoría de DBs en la nube
      }
    }
  }
};