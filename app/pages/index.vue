<template>
  <div>
    <section class="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          热爱阅读，热爱生活
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          加入我们的读书会，与志同道合的朋友一起分享阅读的乐趣，在书香中遇见更好的自己。
        </p>
        <el-button
          type="primary"
          size="large"
          @click="$router.push('/activities')"
          class="px-8 py-4 text-lg"
        >
          浏览活动
        </el-button>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4">
        <ActivityList />
      </div>
    </section>
  </div>
</template>

<script setup>
import ActivityList from '@/components/activities/ActivityList.vue';
</script>
