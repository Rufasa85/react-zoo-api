module.exports = function(sequelize, DataTypes) {
    var Animal = sequelize.define('Animal', {
        // add properites here
        species: DataTypes.STRING,
        class: DataTypes.STRING,
        eatsMeat: DataTypes.BOOLEAN,
        weight: DataTypes.INTEGER

    });

    Animal.associate = function(models) {
        // add associations here
        // ex:Animal.hasMany(models.BlogPost);
    };

    return Animal;
};