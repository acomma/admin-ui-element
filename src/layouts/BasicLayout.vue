<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'
import { reactive, toRefs, onBeforeMount } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '../stores/login-user'

const router = useRouter()
const state = reactive({
    avatar: '../duck.svg'
})
const { avatar } = toRefs(state)
const loginUserStore = useLoginUserStore()

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

interface Menu {
    menuId: bigint;
    parentId: bigint;
    name: string;
    path: string;
    children: Menu[];
}

let menus: Menu[] = reactive([])

onBeforeMount(() => {
    const userId = loginUserStore.getUserId
    axios.get(`/users/${userId}/menus`)
        .then((response) => {
            const data = response.data.data
            menus.push(...data)
        })
})
</script>

<template>
    <el-container class="basic-layout h-screen">
        <el-aside width="200px">
            <el-scrollbar>
                <div class="logo"></div>
                <el-menu router>
                    <template v-for="menu in menus">
                        <template v-if="menu.children.length > 0">
                            <el-sub-menu :index="`${menu.menuId}`">
                                <template #title>
                                    <el-icon>
                                        <Setting />
                                    </el-icon>
                                    {{ menu.name }}
                                </template>
                                <el-menu-item v-for="child in menu.children" :index="`${child.menuId}`"
                                    :route="child.path">{{ child.name }}</el-menu-item>
                            </el-sub-menu>
                        </template>
                        <template v-else>
                            <el-menu-item :index="`${menu.menuId}`" :route="menu.path">{{ menu.name }}</el-menu-item>
                        </template>
                    </template>
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

.basic-layout .el-aside .logo {
    height: 60px;
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