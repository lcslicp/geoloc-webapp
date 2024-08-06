import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const SearchHistory = sequelize.define('SearchHistory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', 
            key: 'id'
        }
    },
    search_ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    search_results: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const value = this.getDataValue('search_results');
            return value ? JSON.parse(value) : null;
        },
        set(value) {
            this.setDataValue('search_results', JSON.stringify(value));
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'search_history',
    timestamps: true
});

export default SearchHistory;
