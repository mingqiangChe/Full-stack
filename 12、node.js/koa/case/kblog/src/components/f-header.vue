<template>
	<div>
		<el-menu :default-active="activeIndex" class="d-flex" mode="horizontal" :router="true" type="flex">
			<el-menu-item index="/home">{{$t("header.home")}}</el-menu-item>
			<el-menu-item index="/archive">{{$t("header.archive")}}</el-menu-item>
			<el-menu-item index="/about">{{$t("header.about")}}</el-menu-item>
			<el-submenu index="">
				<template slot="title">{{$t("header.language")}}</template>
				<el-menu-item     @click="toggleLang('zh')">{{$t("header.chinaese")}}</el-menu-item>
				<el-menu-item    @click="toggleLang('en')">{{$t("header.english")}}</el-menu-item>
			</el-submenu>
            <el-submenu index="-1" v-show="access_token" class="ml-auto">
                <template slot="title">
                    {{userInfo.username||'Kirk'}}
                </template>
                <el-menu-item index=""  @click="logout">{{$t("header.logout")}}</el-menu-item>
            </el-submenu>
            <el-menu-item index="-1" @click="goLogin" v-show="!access_token" class="ml-auto">
             {{$t("header.login")}}
            </el-menu-item>
		</el-menu>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				activeIndex:'/home'
			};
		},
		methods: {
            logout(){
                this.$store.dispatch('LogOut').then(r=>{

                })
            },
            goLogin(){
                this.$router.push('/login')
            },
			toggleLang(lang) {
				if(lang === 'zh') {
					localStorage.setItem('locale', 'zh')
					this.$i18n.locale = localStorage.getItem('locale')
					this.$message({
						message: '切换为中文！',
						type: 'success'
					})
				} else if(lang === 'en') {
					localStorage.setItem('locale', 'en')
					this.$i18n.locale = localStorage.getItem('locale')
					this.$message({
						message: 'Switch to English!',
						type: 'success'
					})
				}
			}
        },
        computed:{
            ...mapGetters(['userInfo','access_token'])
        }
	}
</script>

<style scoped>

</style>