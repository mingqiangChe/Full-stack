<template>
    <div class="userInfo_Box">
        <div class="box_Top">
            <el-avatar :src="userInfo.avator" :size="70"></el-avatar>
            <span class="username">{{userInfo.username}}</span>
        </div>
        <el-tabs tab-position="left" style="width:80%;height:250px;margin-top:50px;">
            <el-tab-pane label="个人信息">
                <div class="user_tab1">
                    <span><span>用户名：</span>{{userInfo.username}}</span>
                    <span><span>账号：</span>{{userInfo.user_code}}</span>
                    <span><span>性别：</span>{{userInfo.sex == 0 ? '女' : '男'}}</span>
                    <span><span>ID：</span>{{userInfo.id}}</span>
                </div>
            </el-tab-pane>
            <el-tab-pane label="修改密码">
                <div class="user_tab2">
                   <el-input
                        placeholder="请输入旧密码"
                        v-model="fromData.nowPassword"
                       
                        clearable>
                    </el-input>
                    <el-input
                        placeholder="请输入新密码"
                        v-model="fromData.newPassword"
                        
                        clearable>
                    </el-input>
                    <el-input
                        placeholder="请输入再次输入密码"
                        v-model="fromData.forPassword"
                        
                        clearable>
                    </el-input>
                     <el-button type="primary" @click="isPrimary">提交</el-button>
                </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="账户级别">角色管理</el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<script>
import { setUserPwd } from '@/api/user'
import {mapGetters} from 'vuex';
import {Message} from 'element-ui'
export default {
    name:'userInfo',
    data(){
        return{
            fromData:{
                nowPassword:'',
                newPassword:'',
                forPassword:'',
                id:''
            }
        }
    },
    computed: {
        ...mapGetters([
            'userInfo'
        ])
    },
    mounted(){
       
    },
    methods:{
        isPrimary(){
            if(!this.fromData.nowPassword.trim()){
                this.$message.error('密码不能为空');
                return false;
            }
            if(this.fromData.newPassword.trim() !== this.fromData.forPassword.trim()){
                this.$message.error('两次密码不一致，请重新输入');
                return false;
            }
            if(this.fromData.nowPassword.trim() === this.fromData.forPassword.trim()){
                this.$message.error('旧密码与新密码不能一致，请重新输入');
                return false;
            }
            this.fromData.id = this.userInfo.id
            setUserPwd(this.fromData).then(res=>{
                console.log(res)
                this.$message.success(res.msg);
                this.logout()
            }).catch(error=>{
                console.log(error)
            })
        },
        async logout() {
            await this.$store.dispatch('user/logout') 
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
    }
}
</script>

<style lang="scss" scoped>
    .userInfo_Box{
        width: 700px;
        height: 500px;
        background: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        transform:translate(-50%,-50%);
        border-radius: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        .box_Top{
            display: flex;
            flex-direction:column;
            justify-content: center;
            align-items: center;
            margin-top: 30px;
            .el-image{
                border-radius: 50%;
                overflow: hidden;
            }
            .username{
                margin-top: 10px;
                font-size: 20px;
                color: #6BC7FF;
            }
        }
        .user_tab1{
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            >span{
                margin-left:20px;
                margin-top: 11px;
            }
            >span:nth-child(2){
                margin-top: 20px;
            }
            >span:nth-child(3),>span:nth-child(4){
                margin-top: 25px;
            }
        }
        .user_tab2{
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            .el-input{
                width: 50%;
                margin-bottom: 20px;
            }
            .el-button{
                width: 100px;
            }
        }
    }
</style>
