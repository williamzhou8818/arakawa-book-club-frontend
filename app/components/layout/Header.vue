<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-2xl font-bold text-indigo-600">
        读书会
      </NuxtLink>
      <Menu />
      <div class="flex items-center space-x-4">
        <el-button type="primary" @click="handleLogin"> 登录 </el-button>
        <el-button @click="handleRegister"> 注册 </el-button>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import Menu from './Menu.vue';

const handleLogin = () => {
  console.log('登录');
};

const handleRegister = () => {
  console.log('注册');
};
</script>
