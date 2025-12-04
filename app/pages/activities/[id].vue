<template>
  <div class="py-8">
    <NuxtLink
      to="/activities"
      class="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
    >
      <el-icon name="arrow-left" class="mr-2" />
      返回活动列表
    </NuxtLink>
    <ActivityDetail />
  </div>
</template>

<script setup>
import ActivityDetail from '~/components/activities/ActivityDetail.vue';
</script>
