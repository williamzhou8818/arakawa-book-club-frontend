<template>
  <header class="modern-header">
    <div class="header-container">
      <!-- LOGO -->
      <NuxtLink to="/" class="logo">
        <span class="logo-text">大人のゆるい読書会</span>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="desktop-nav">
        <NuxtLink
          v-for="(item, index) in navItems"
          :key="index"
          :to="item.path"
          class="nav-link"
          :class="{ active: route.path === item.path }"
          @mouseenter="activeLink = item.path"
          @mouseleave="activeLink = null"
        >
          {{ item.name }}
          <span
            class="underline"
            :class="{
              active: activeLink === item.path || route.path === item.path,
            }"
          ></span>
        </NuxtLink>
      </nav>

      <!-- Desktop Primary Button only -->
      <div class="desktop-actions">
        <!-- <el-button type="primary" class="primary-btn">今月のイベント</el-button> -->
      </div>

      <!-- Mobile Menu Button - fixed icon display -->
      <el-button class="mobile-menu-btn" circle @click="mobileMenuOpen = true">
        <el-icon class="mobile-menu-icon">
          <Menu />
        </el-icon>
      </el-button>
    </div>

    <!-- Mobile Drawer -->
    <el-drawer
      v-model="mobileMenuOpen"
      direction="rtl"
      size="280px"
      :append-to-body="true"
      :with-header="false"
      custom-class="mobile-drawer"
    >
      <div class="mobile-menu-container">
        <div class="mobile-header">
          <NuxtLink to="/" class="mobile-logo" @click="mobileMenuOpen = false">
            <span class="logo-text">読書会</span>
          </NuxtLink>
          <el-button class="close-btn" circle @click="mobileMenuOpen = false">
            <el-icon class="close-icon">
              <Close />
            </el-icon>
          </el-button>
        </div>

        <div class="mobile-nav">
          <NuxtLink
            v-for="(item, index) in navItems"
            :key="index"
            :to="item.path"
            @click="mobileMenuOpen = false"
            class="mobile-nav-link"
            :class="{ active: route.path === item.path }"
          >
            <span class="link-icon">
              <el-icon name="ArrowRightBold" v-if="route.path === item.path">
                <ArrowRightBold />
              </el-icon>
              <span v-else class="bullet"></span>
            </span>
            <span class="link-text">{{ item.name }}</span>
          </NuxtLink>
        </div>

        <div class="mobile-footer">
          <!-- <el-button
            type="primary"
            class="mobile-primary-btn"
            @click="mobileMenuOpen = false"
          >
            今月のイベント
          </el-button> -->
        </div>
      </div>
    </el-drawer>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Menu, Close, ArrowRightBold } from '@element-plus/icons-vue';

const route = useRoute();
const mobileMenuOpen = ref(false);
const activeLink = ref(null);

const navItems = [
  { name: 'ホーム', path: '/' },
  { name: 'ご案内', path: '/guide' },
  { name: 'スケジュール・予約', path: '/schedule' },
  { name: 'よくある質問', path: '/faq' },
  { name: 'お問い合わせ', path: '/contact' },
];
</script>

<style scoped>
/* 基础样式 */
.modern-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

/* Logo样式 */
.logo {
  display: flex;
  align-items: left;
  text-decoration: none;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #10b981, #059669);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 桌面导航 */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-left: 40px;
}

.nav-link {
  position: relative;
  font-size: 16px;
  font-weight: 500;
  color: #4b5563;
  text-decoration: none;
  padding: 8px 0;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #059669;
}

.underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #10b981, #059669);
  transition: width 0.3s ease;
}

.nav-link:hover .underline,
.nav-link.active .underline,
.underline.active {
  width: 100%;
}

/* 桌面操作按钮 - 只保留主要按钮 */
.desktop-actions {
  display: flex;
  align-items: center;
}

.primary-btn {
  background: linear-gradient(135deg, #10b981, #059669);
  border: none;
  border-radius: 12px;
  padding: 8px 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.primary-btn:hover {
  background: linear-gradient(135deg, #0d9488, #047857);
  transform: translateY(-1px);
}

/* 移动端菜单按钮 - 只在移动设备显示 */
.mobile-menu-btn {
  display: none;
  color: #059669;
  background: rgba(16, 185, 129, 0.1);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu-icon {
  font-size: 20px;
  color: #059669;
}

.mobile-menu-btn:hover {
  background: rgba(16, 185, 129, 0.2);
}

/* 移动端抽屉样式 */
:deep(.mobile-drawer .el-drawer__body) {
  padding: 0;
  background: #f9fafb;
}

.mobile-menu-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
}

.mobile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.mobile-logo {
  text-decoration: none;
}

.close-btn {
  color: #6b7280;
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-icon {
  font-size: 20px;
  color: #6b7280;
}

.mobile-nav {
  flex: 1;
  margin: 24px 0;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  margin: 8px 0;
  border-radius: 16px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  color: #4b5563;
  transition: all 0.3s ease;
}

.mobile-nav-link:hover {
  background: rgba(16, 185, 129, 0.1);
}

.mobile-nav-link.active {
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
}

.link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 12px;
}

.bullet {
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #9ca3af;
}

.mobile-footer {
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.mobile-primary-btn {
  width: 100%;
  background: linear-gradient(135deg, #10b981, #059669);
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-weight: 500;
  margin-top: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .desktop-nav,
  .desktop-actions {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .header-container {
    height: 64px;
  }
}

/* 平板设备优化 */
@media (min-width: 769px) and (max-width: 1024px) {
  .desktop-nav {
    gap: 24px;
    margin-left: 24px;
  }

  .primary-btn {
    padding: 6px 16px;
    font-size: 14px;
  }
}

/* 暗色模式支持 */
@media (prefers-color-scheme: dark) {
  .modern-header {
    background: rgba(24, 24, 24, 0.9);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .nav-link {
    color: #e5e7eb;
  }

  .nav-link:hover,
  .nav-link.active {
    color: #34d399;
  }

  .primary-btn {
    background: linear-gradient(135deg, #34d399, #10b981);
  }

  .primary-btn:hover {
    background: linear-gradient(135deg, #22d3ee, #06b6d4);
  }

  .mobile-menu-btn {
    color: #34d399;
    background: rgba(52, 211, 153, 0.1);
  }

  .mobile-menu-icon {
    color: #34d399;
  }

  .close-icon {
    color: #e5e7eb;
  }

  .mobile-menu-btn:hover {
    background: rgba(52, 211, 153, 0.2);
  }

  .mobile-menu-container {
    background: #1f2937;
  }

  .mobile-header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .close-btn {
    color: #e5e7eb;
  }

  .mobile-nav-link {
    color: #e5e7eb;
  }

  .mobile-nav-link:hover {
    background: rgba(52, 211, 153, 0.1);
  }

  .mobile-nav-link.active {
    background: rgba(52, 211, 153, 0.15);
    color: #34d399;
  }

  .bullet {
    background: #9ca3af;
  }

  .mobile-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
