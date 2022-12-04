<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '../stores/login-user'
import { ElMessage } from 'element-plus'

const formRef = ref<FormInstance>()
const model = reactive({
    username: null,
    password: null,
})

const router = useRouter()
const loginUserStore = useLoginUserStore()

const rules = reactive<FormRules>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})

const handleLogin = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            const { username, password } = model;
            const params = {
                username,
                password,
            }
            axios.post('/auth/login', params)
                .then((response) => {
                    const { code: errorCode, message: errorMessage } = response.data
                    if (errorCode !== 0) {
                        ElMessage.error(errorMessage || '登录失败')
                    } else {
                        const { data: { token: token, userId: userId } } = response.data
                        loginUserStore.setToken(token)
                        loginUserStore.setUserId(userId)
                        router.replace('/')
                    }
                })
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>

<template>
    <div class="login">
        <div class="container">
            <el-form ref="formRef" :model="model" :rules="rules" status-icon>
                <el-form-item prop="username">
                    <el-input v-model="model.username" placeholder="请输入用户名" :prefix-icon="User" clearable></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="model.password" type="password" show-password clearable placeholder="请输入密码"
                        :prefix-icon="Lock"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="w-full" @click="handleLogin(formRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<style scoped>
.login {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
}

.login .container {
    flex: 1;
    padding: 32px 12px;
    max-width: 384px;
    min-width: 320px;
    margin: 0 auto;
}
</style>