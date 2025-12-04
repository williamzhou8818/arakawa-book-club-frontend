<template>
  <nav class="hidden md:block">
    <el-menu
      mode="horizontal"
      background-color="transparent"
      text-color="#666"
      active-text-color="#4f46e5"
      :router="true"
      class="flex space-x-6"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/activities">活动</el-menu-item>
      <el-menu-item index="/books">书单</el-menu-item>
      <el-menu-item index="/members">成员</el-menu-item>
      <el-menu-item index="/about">关于</el-menu-item>
    </el-menu>
  </nav>

  <!-- 移动端菜单 -->
  <div class="md:hidden">
    <el-button type="primary" @click="mobileMenuOpen = true">
      <el-icon name="menu" />
    </el-button>

    <el-drawer
      v-model="mobileMenuOpen"
      title="菜单"
      direction="rtl"
      size="280px"
    >
      <el-menu
        mode="vertical"
        background-color="transparent"
        text-color="#666"
        active-text-color="#4f46e5"
        :router="true"
        class="py-4"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/activities">活动</el-menu-item>
        <el-menu-item index="/books">书单</el-menu-item>
        <el-menu-item index="/members">成员</el-menu-item>
        <el-menu-item index="/about">关于</el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const mobileMenuOpen = ref(false);
</script>

<style scoped>
:deep(.el-menu) {
  background-color: transparent !important;
  border: none !important;
}
</style>
