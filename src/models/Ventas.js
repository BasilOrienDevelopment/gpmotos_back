import { DataTypes } from "sequelize";

export default function ModelVentas(sequelize) {
    const Ventas = sequelize.define("Ventas", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        // Otros campos relacionados con la venta, como productos, cantidad, usuario, etc.
    });
}
