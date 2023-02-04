module.exports = (sequelize, DataTypes) => {
    const Collections = sequelize.define("Collections", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
    });

    Collections.associate = (models) => {
        Collections.hasMany(models.Items, {
            onDelete: "cascade",
        });
    };

    return Collections;
}