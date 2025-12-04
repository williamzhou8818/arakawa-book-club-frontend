<template>
  <footer class="bg-gray-800 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-2">
          <h3 class="text-2xl font-bold text-indigo-400 mb-4">读书会</h3>
          <p class="text-gray-300 mb-4">
            一个热爱阅读的社区，分享书籍、交流思想、共同成长。
          </p>
          <div class="flex space-x-4">
            <el-button circle type="primary">
              <el-icon name="chat-line-square" />
            </el-button>
            <el-button circle type="primary">
              <el-icon name="video-camera" />
            </el-button>
            <el-button circle type="primary">
              <el-icon name="picture" />
            </el-button>
          </div>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">快速链接</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-gray-300 hover:text-white transition"
                >首页</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/activities"
                class="text-gray-300 hover:text-white transition"
                >活动</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/books"
                class="text-gray-300 hover:text-white transition"
                >书单</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/members"
                class="text-gray-300 hover:text-white transition"
                >成员</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">联系我们</h4>
          <ul class="space-y-2 text-gray-300">
            <li class="flex items-start">
              <el-icon name="location" class="mr-2 mt-1" />
              <span>北京市海淀区</span>
            </li>
            <li class="flex items-start">
              <el-icon name="phone" class="mr-2 mt-1" />
              <span>+86 123 4567 890</span>
            </li>
            <li class="flex items-start">
              <el-icon name="message" class="mr-2 mt-1" />
              <span>contact@readingclub.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>© 2025 读书会. 保留所有权利.</p>
      </div>
    </div>
  </footer>
</template>
