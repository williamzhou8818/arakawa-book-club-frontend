<template>
  <div class="font-sans">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- 全局加载指示器 -->
    <el-loading
      v-if="globalLoading"
      :fullscreen="true"
      text="加载中..."
      background="rgba(255, 255, 255, 0.8)"
    />

    <!-- 全局通知组件 -->
    <el-notification
      v-if="notification.message"
      :title="notification.title"
      :type="notification.type"
      :duration="3000"
      @close="clearNotification"
    >
      {{ notification.message }}
    </el-notification>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useActivityStore } from '~/stores/activityStore';

// 全局加载状态
const globalLoading = ref(false);
// 全局通知
const notification = ref({
  title: '',
  message: '',
  type: 'success',
});

// 从 store 获取加载状态
const activityStore = useActivityStore();

// 监听全局加载状态
watch(
  () => activityStore.loading,
  (newLoading) => {
    globalLoading.value = newLoading;
  },
);

// 全局错误处理
const handleError = (error: Error) => {
  console.error('全局错误:', error);
  showNotification('错误', error.message || '发生未知错误', 'error');
};

// 显示通知
const showNotification = (
  title: string,
  message: string,
  type: string = 'success',
) => {
  notification.value = {
    title,
    message,
    type,
  };
};

// 清除通知
const clearNotification = () => {
  notification.value = {
    title: '',
    message: '',
    type: 'success',
  };
};

// 全局事件监听
onMounted(() => {
  // 监听全局通知事件
  window.addEventListener('show-notification', (event: any) => {
    if (event.detail) {
      showNotification(
        event.detail.title || '提示',
        event.detail.message,
        event.detail.type || 'success',
      );
    }
  });

  // 监听全局错误
  window.addEventListener('error', handleError);
});

onUnmounted(() => {
  window.removeEventListener('error', handleError);
  window.removeEventListener('show-notification', () => {});
});

// 暴露方法给全局使用
defineExpose({
  showNotification,
  globalLoading,
});
</script>

<style lang="scss">
// 森林主题颜色变量
$forest-green-light: #88c9a1; // LightGreen - 浅绿色 (树叶)
$forest-green-medium: #5d9c73; // 中绿色 (深树叶)
$forest-green-dark: #3d6b4d; // 深绿色 (松树)
$forest-brown-light: #d4b08c; // 浅棕色 (树皮)
$forest-brown-medium: #a88b6a; // 中棕色 (泥土)
$forest-brown-dark: #7a6455; // 深棕色 (树干)
$forest-gray-light: #f5f5f5; // 浅灰色 (雾气)
$forest-gray-medium: #e0e0e0; // 中灰色 (岩石)
$forest-gray-dark: #616161; // 深灰色 (阴影)
$forest-black: #212121; // 黑色 (夜色)
$forest-white: #ffffff; // 白色 (晨雾)

// 全局基础样式
html,
body {
  background-color: $forest-gray-light;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'PingFang SC', 'Microsoft YaHei', sans-serif;
  margin: 0;
  padding: 0;
  height: 100%;
  color: $forest-black;
}

// 森林主题渐变背景
.forest-gradient-bg {
  background: linear-gradient(
    135deg,
    $forest-green-light 0%,
    $forest-brown-light 100%
  );
}

.forest-gradient-dark {
  background: linear-gradient(
    135deg,
    $forest-green-dark 0%,
    $forest-brown-dark 100%
  );
}

// 滚动条样式 - 森林主题
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: $forest-gray-medium;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: $forest-green-medium;
  border-radius: 8px;

  &:hover {
    background-color: $forest-green-dark;
  }
}

// Element Plus 全局样式覆盖 - 森林主题
:root {
  --el-color-primary: #{$forest-green-dark};
  --el-color-primary-light-3: #{$forest-green-medium};
  --el-color-primary-light-5: #{$forest-green-light};
  --el-color-primary-light-7: #{$forest-brown-light};
  --el-color-primary-light-9: #{$forest-gray-light};

  // 按钮样式
  --el-button-bg-color: #{$forest-green-dark};
  --el-button-hover-bg-color: #{$forest-green-medium};
  --el-button-active-bg-color: #{$forest-green-dark};

  // 卡片样式
  --el-card-bg-color: #{$forest-white};
  --el-card-border-color: #{$forest-gray-medium};
}

// 森林主题按钮
.forest-btn {
  background: linear-gradient(to right, $forest-green-dark, $forest-brown-dark);
  color: $forest-white;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba($forest-brown-dark, 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba($forest-brown-dark, 0.4);
    background: linear-gradient(
      to right,
      $forest-green-medium,
      $forest-brown-medium
    );
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba($forest-brown-dark, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    transform: none;
    box-shadow: none;
  }
}

// 森林主题卡片
.forest-card {
  background: $forest-white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba($forest-brown-dark, 0.1);
  border: 1px solid $forest-gray-medium;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 24px rgba($forest-brown-dark, 0.15);
    transform: translateY(-2px);
  }

  &--gradient {
    background: linear-gradient(
      135deg,
      $forest-green-light 0%,
      $forest-brown-light 100%
    );
    color: $forest-white;
  }
}

// 森林主题标题
.forest-title {
  color: $forest-green-dark;
  font-weight: 700;

  &--medium {
    color: $forest-green-medium;
  }

  &--light {
    color: $forest-green-light;
  }

  &--brown {
    color: $forest-brown-dark;
  }
}

// 森林主题文字
.forest-text {
  &--primary {
    color: $forest-green-dark;
  }

  &--secondary {
    color: $forest-brown-medium;
  }

  &--muted {
    color: $forest-gray-dark;
  }

  &--light {
    color: $forest-white;
  }
}

// 森林主题边框
.forest-border {
  border-color: $forest-gray-medium;

  &--primary {
    border-color: $forest-green-medium;
  }

  &--secondary {
    border-color: $forest-brown-medium;
  }
}

// 森林主题阴影
.forest-shadow {
  box-shadow: 0 4px 12px rgba($forest-brown-dark, 0.1);

  &--hover {
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 8px 24px rgba($forest-brown-dark, 0.15);
    }
  }

  &--deep {
    box-shadow: 0 8px 32px rgba($forest-brown-dark, 0.2);
  }
}

// 森林主题分隔线
.forest-divider {
  border-color: $forest-gray-medium;

  &--primary {
    border-color: $forest-green-medium;
  }

  &--secondary {
    border-color: $forest-brown-medium;
  }
}

// 动画效果
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

// 容器样式
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 640px) {
    max-width: 640px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: 1024px) {
    max-width: 1024px;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media (min-width: 1280px) {
    max-width: 1280px;
  }

  @media (min-width: 1536px) {
    max-width: 1536px;
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

// 森林主题背景
.forest-bg {
  &--light {
    background-color: $forest-gray-light;
  }

  &--white {
    background-color: $forest-white;
  }

  &--gradient {
    background: linear-gradient(
      135deg,
      $forest-green-light 0%,
      $forest-brown-light 100%
    );
  }

  &--dark {
    background-color: $forest-green-dark;
    color: $forest-white;
  }
}

// 森林主题覆盖层
.forest-overlay {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba($forest-green-dark, 0.1),
      rgba($forest-brown-dark, 0.2)
    );
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 2;
  }
}

// 响应式工具类
.hidden {
  display: none;
}

.block {
  display: block;
}

.flex {
  display: flex;
}

.inline-flex {
  display: inline-flex;
}

.grid {
  display: grid;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.space-y-3 > * + * {
  margin-top: 0.75rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.space-y-8 > * + * {
  margin-top: 2rem;
}

.space-x-2 > * + * {
  margin-left: 0.5rem;
}

.space-x-3 > * + * {
  margin-left: 0.75rem;
}

.space-x-4 > * + * {
  margin-left: 1rem;
}

.space-x-6 > * + * {
  margin-left: 1.5rem;
}

.space-x-8 > * + * {
  margin-left: 2rem;
}

// 森林主题图片效果
.forest-image {
  &--rounded {
    border-radius: 12px;
    overflow: hidden;
  }

  &--shadow {
    box-shadow: 0 4px 12px rgba($forest-brown-dark, 0.15);
  }

  &--border {
    border: 2px solid $forest-green-medium;
  }
}

// 森林主题徽章
.forest-badge {
  background: linear-gradient(
    135deg,
    $forest-green-medium,
    $forest-brown-medium
  );
  color: $forest-white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-block;
}

// 森林主题标签
.forest-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;

  &--primary {
    background-color: rgba($forest-green-medium, 0.1);
    color: $forest-green-dark;
    border: 1px solid $forest-green-medium;
  }

  &--secondary {
    background-color: rgba($forest-brown-medium, 0.1);
    color: $forest-brown-dark;
    border: 1px solid $forest-brown-medium;
  }

  &--success {
    background-color: rgba($forest-green-dark, 0.1);
    color: $forest-green-dark;
    border: 1px solid $forest-green-dark;
  }
}

// 森林主题链接
.forest-link {
  color: $forest-green-dark;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: $forest-green-medium;
    text-decoration: underline;
  }

  &--white {
    color: $forest-white;

    &:hover {
      color: $forest-green-light;
    }
  }
}

// 森林主题按钮组
.forest-btn-group {
  display: inline-flex;
  gap: 0.5rem;

  .forest-btn {
    flex: 1;
    min-width: 120px;
  }
}

// 森林主题响应式
@media (max-width: 768px) {
  .forest-text-responsive {
    font-size: 0.95rem;
  }

  .forest-title-responsive {
    font-size: 1.5rem;
  }
}

@media (min-width: 768px) {
  .forest-text-responsive {
    font-size: 1rem;
  }

  .forest-title-responsive {
    font-size: 2rem;
  }
}

@media (min-width: 1024px) {
  .forest-text-responsive {
    font-size: 1.125rem;
  }

  .forest-title-responsive {
    font-size: 2.5rem;
  }
}
</style>

<script lang="ts">
// 全局类型定义
export interface NotificationEvent {
  detail: {
    title?: string;
    message: string;
    type?: 'success' | 'warning' | 'info' | 'error';
  };
}

// 全局工具函数
export const showError = (message: string) => {
  const event = new CustomEvent('show-notification', {
    detail: {
      title: '错误',
      message,
      type: 'error',
    },
  });
  window.dispatchEvent(event);
};

export const showSuccess = (message: string) => {
  const event = new CustomEvent('show-notification', {
    detail: {
      title: '成功',
      message,
      type: 'success',
    },
  });
  window.dispatchEvent(event);
};

export const showWarning = (message: string) => {
  const event = new CustomEvent('show-notification', {
    detail: {
      title: '警告',
      message,
      type: 'warning',
    },
  });
  window.dispatchEvent(event);
};

export const showInfo = (message: string) => {
  const event = new CustomEvent('show-notification', {
    detail: {
      title: '提示',
      message,
      type: 'info',
    },
  });
  window.dispatchEvent(event);
};

// 森林主题工具函数
export const getForestColors = () => {
  return {
    primary: '#88c9a1', // LightGreen
    secondary: '#7a6455', // 深棕色
    accent: '#5d9c73', // 中绿色
    background: '#f5f5f5', // 浅灰色
    text: '#212121', // 黑色
    white: '#ffffff', // 白色
  };
};
</script>
