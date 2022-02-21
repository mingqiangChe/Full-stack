// 系统管理员表 t_img
class sqlTable {
    static pubilcSet() {
        return {
            freezeTableName: true,
            paranoid: true, 
            indexes:[{ // 索引
                name: 'id', // 索引名
                fields: ['id'] // 关联字段
            },]
        }
    }
    static testTable(Sequelize) {
        return {
            id: {
                type: Sequelize.INTEGER(11),
                autoIncrement: true,
                primaryKey:true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(40),
                defaultValue:''
            },
            uid: {
                type: Sequelize.INTEGER(11),
                comment: 'uid',
                defaultValue:1
            }
        }
    };
}
export default sqlTable;
