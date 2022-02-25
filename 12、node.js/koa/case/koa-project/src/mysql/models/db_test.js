class sqlTable {
    static pubilcSet() {
        return {
            freezeTableName: true,
            paranoid: true,
        }
    }
    static testTable(Sequelize) {
        return {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
           nickName:{
            type: Sequelize.STRING,
            allowNull: false
           }
        }
    };
}
export default sqlTable;