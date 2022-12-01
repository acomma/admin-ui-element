<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'
import { reactive, toRefs } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const state = reactive({
    avatar: '../duck.svg'
})
const { avatar } = toRefs(state)

const handleCommand = (command: string | number | object) => {
    if (command === 'logout') {
        doLogout()
    }
}

const doLogout = () => {
    axios.post('/user/logout', {})
        .then((response) => {
            localStorage.removeItem('token')
            router.replace({ path: '/login' })
        })
}
</script>

<template>
    <el-container class="basic-layout h-screen">
        <el-aside width="200px">
            <el-scrollbar>
                <el-menu router>
                    <el-sub-menu index="system">
                        <template #title>
                            <el-icon>
                                <Setting />
                            </el-icon>
                            系统管理
                        </template>
                        <el-menu-item index="menu" route="/menu">菜单管理</el-menu-item>
                        <el-menu-item index="role" route="/role">角色管理</el-menu-item>
                        <el-menu-item index="user" route="/user">用户管理</el-menu-item>
                        <el-menu-item index="menu-action" route="/menu/action">菜单操作</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <div class="toolbar">
                    <el-dropdown @command="handleCommand">
                        <el-avatar :src="avatar" />
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main>
                <el-scrollbar>
                    <router-view></router-view>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>
  
<style scoped>
.basic-layout .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.basic-layout .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.basic-layout .el-menu {
    border-right: none;
}

.basic-layout .el-main {
    padding: 0;
}

.basic-layout .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>