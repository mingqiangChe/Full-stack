/*
 * @Author: your name
 * @Date: 2021-07-09 10:04:08
 * @LastEditTime: 2021-08-04 19:14:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\layout\mixin\confirm.js
 */
import { delectCustomerPoolItem } from '@/api/customerpool'
const mixObj = {
    data() {
        return {
            dataId: '',
        }
    },
    methods: {
        /**
         * @description: 确认删除业务逻辑函数
         * @param {*}
         * @return {*}
         */
        confirmDelete(data) {
            delectCustomerPoolItem(data).then(response => {
                console.log(response)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.queryCustomerPool()
                this.dangerLoading = false;
            }).catch(error => {
                this.$message({
                    type: 'error',
                    message: '删除失败!'
                });
            })
        },


        /**
         * @description: 消息提示框封装函数
         * @param {*} info
         * @param {*} title
         * @param {*} type
         * @param {*} isCancelButton
         * @return {*}
         */
        confirmFnc(info, title, type, isCancelButton, data) {
            console.log(data)
            let self = this;
            self.data = data
            this.$confirm(info, title, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: type,
                showCancelButton: isCancelButton,
            }).then(async() => {
                await self.confirmDelete(self.data);
            }).catch((error) => {
                console.log(error)
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
                this.dangerLoading = false;
            });
        },
    }
}

export {
    mixObj
}