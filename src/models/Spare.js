import { DataTypes } from "sequelize";

export default function RepuestoModel(sequelize) {
    const Repuesto = sequelize.define('Repuesto', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        cantidadDisponible: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}