// 系统管理员表 t_blog
class sqlTable {
    static pubilcSet() {
        return {
            freezeTableName: true,
            paranoid: true, 
            indexes:[{ // 索引
                name: 'title', // 索引名
                fields: ['title'] // 关联字段
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
            title: {
                type: Sequelize.STRING(200),
                comment: '标题',
                defaultValue:''
            },
            uid: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                comment: 'uid'
            },note_id: {
                type: Sequelize.STRING(45),
                defaultValue:'',
            },publish: {
                type: Sequelize.BOOLEAN,
                defaultValue:'0',
                comment: '是否发布'
            },brief: {
                type: Sequelize.TEXT,
            },ext_info: {
                type: Sequelize.TEXT,
            },content: {
                type: Sequelize.TEXT,
                comment: '内容'
            }
        }
    };
}
export default sqlTable;
