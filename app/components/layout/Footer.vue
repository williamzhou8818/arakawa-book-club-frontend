<template>
  <footer class="bg-gray-900 text-gray-300 py-12 mt-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- Branding -->
        <div class="md:col-span-2">
          <h3 class="text-2xl font-bold text-indigo-400 mb-4">
            読書会コミュニティ
          </h3>
          <p class="leading-relaxed mb-5">
            「学び・対話・つながり」をテーマにした読書コミュニティです。<br />
            多様な価値観を尊重しながら、本を通して深く語り合える場を提供しています。
          </p>

          <div class="flex space-x-3">
            <el-button
              circle
              class="!bg-indigo-600 hover:!bg-indigo-500"
              aria-label="公式SNS"
            >
              <el-icon><ChatLineSquare /></el-icon>
            </el-button>

            <el-button
              circle
              class="!bg-indigo-600 hover:!bg-indigo-500"
              aria-label="YouTube"
            >
              <el-icon><VideoCamera /></el-icon>
            </el-button>

            <el-button
              circle
              class="!bg-indigo-600 hover:!bg-indigo-500"
              aria-label="Instagram"
            >
              <el-icon><Picture /></el-icon>
            </el-button>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">ナビゲーション</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/" class="hover:text-white transition"
                >トップページ</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/activities" class="hover:text-white transition"
                >イベント一覧</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/books" class="hover:text-white transition"
                >おすすめ書籍</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-white transition"
                >私たちについて</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-lg font-semibold text-white mb-4">お問い合わせ</h4>
          <ul class="space-y-2 text-sm">
            <li class="flex items-start">
              <el-icon class="mr-2 mt-0.5"><Location /></el-icon>
              <span>東京都荒川区</span>
            </li>
            <li class="flex items-start">
              <el-icon class="mr-2 mt-0.5"><Phone /></el-icon>
              <span>03-1234-5678</span>
            </li>
            <li class="flex items-start">
              <el-icon class="mr-2 mt-0.5"><Message /></el-icon>
              <span>info@bookclub.jp</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-sm"
      >
        <p>© 2025 読書会コミュニティ All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {
  ChatLineSquare,
  VideoCamera,
  Picture,
  Location,
  Phone,
  Message,
} from '@element-plus/icons-vue';
</script>
