const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./models');

// Establecer el entorno de producción
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Cargar variables de entorno solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Función para probar la conexión a la base de datos
async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente.');
        
        // Obtener información del dialecto y la URL de conexión
        console.log('📊 Configuración de la base de datos:', {
            dialect: sequelize.options.dialect,
            host: sequelize.options.host,
            database: sequelize.options.database,
            port: sequelize.options.port
        });
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
    }
}

// Llamar a la función de prueba
testDatabaseConnection();

console.log('🌍 Entorno actual:', process.env.NODE_ENV);

app.set('PORT', process.env.PORT || 4000);

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// ✅ Middleware CORS (antes de las rutas)
app.use(cors({
    origin: '*', // 🔓 Permite todas las solicitudes
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

// Middleware de debug
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.url}`);
    next();
});

// **RUTAS**
app.use('/api/v1/rols', require('./api/v1/routes/rols.routes'));
app.use('/api/v1/users', require('./api/v1/routes/users.routes'));
app.use('/api/v1/categories', require('./api/v1/routes/categories.routes'));
app.use('/api/v1/events', require('./api/v1/routes/events.routes'));

// Ruta de prueba básica
app.get('/', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

// Ruta de prueba simple
app.get('/test/:id', (req, res) => {
    res.json({ test: 'ok', id: req.params.id });
});

app.listen(app.get('PORT'), () => {
    console.log(`🚀 Server running on PORT ${app.get('PORT')}`);
});
