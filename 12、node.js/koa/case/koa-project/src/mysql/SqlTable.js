import testInfoTable from "./models/db_test";
import blogInfoTable from "./models/t_blog";
import imgInfoTable from "./models/t_img";
import noteInfoTable from "./models/t_note";
import userInfoTable from "./models/t_user";
// 初始化表
class table {
    constructor(Sequelize, sequelize) {
        // 测试表
        this.testTable = sequelize.define('test_table', testInfoTable.testTable(Sequelize), testInfoTable.pubilcSet());
        sequelize.sync({ logging: false });

        this.blogTable = sequelize.define('blog_table', blogInfoTable.testTable(Sequelize), blogInfoTable.pubilcSet());
        sequelize.sync({ logging: false });

        this.imgTable = sequelize.define('img_table', imgInfoTable.testTable(Sequelize), imgInfoTable.pubilcSet());
        sequelize.sync({ logging: false });

        this.noteTable = sequelize.define('note_table', noteInfoTable.testTable(Sequelize), noteInfoTable.pubilcSet());
        sequelize.sync({ logging: false });

        this.userTable = sequelize.define('user_table', userInfoTable.testTable(Sequelize), userInfoTable.pubilcSet());
        sequelize.sync({ logging: false });
        // sequelize.sync({ alter: true });
    }
}
export default table;