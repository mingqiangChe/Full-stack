// 系统管理员表 t_user
class sqlTable {
    static pubilcSet() {
        return {
            freezeTableName: true,
            paranoid: true, 
            indexes:[{ // 索引
                phone: 'phone', // 索引名
                fields: ['phone'] // 关联字段
            },]
        }
    }
    static testTable(Sequelize) {
        return {
            uid: {
                type: Sequelize.INTEGER(11),
                autoIncrement: true,
                primaryKey:true,
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING(20),
                defaultValue:'',
                comment: '手机号',
                unique: true
            },
            password: {
                type: Sequelize.STRING(50),
                allowNull: false,
                comment: '密码'
            }
        }
    };
}
export default sqlTable;
