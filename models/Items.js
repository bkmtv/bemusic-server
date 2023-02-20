module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define("Items", {
        name: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        comment: {
            type: DataTypes.STRING,
        },
    });

    Items.associate = (models) => {
        Items.hasMany(models.Tags, {
            onDelete: "cascade",
        });
        Items.hasMany(models.Comments, {
            onDelete: "cascade",
        });
        Items.hasMany(models.Likes, {
            onDelete: "cascade",
        });
    };

    return Items;
}