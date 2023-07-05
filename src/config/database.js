import { config } from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';
import UserModel from '../models/User.js';
import UserDataModel from '../models/Userdata.js';
import RepuestoModel from '../models/Spare.js';
import ModelVentas from '../models/Ventas.js';
// Carga la configuración de variables de entorno
config();

// Configuración de Sequelize y conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_URL, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

// Carga y define los modelos
UserModel(sequelize, DataTypes);
UserDataModel(sequelize, DataTypes);
RepuestoModel(sequelize)
ModelVentas(sequelize)
// Obtén las referencias a los modelos
const { User, UserData, Repuesto } = sequelize.models;

// Establece las relaciones entre los modelos
UserData.belongsTo(User);
User.hasOne(UserData);


export { sequelize, User, UserData, Repuesto };

