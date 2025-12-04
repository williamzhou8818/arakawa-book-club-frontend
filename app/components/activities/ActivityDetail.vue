<template>
  <div v-if="currentActivity" class="max-w-4xl mx-auto">
    <el-card shadow="never" class="mb-8">
      <div class="aspect-w-16 aspect-h-9 mb-6 overflow-hidden rounded-xl">
        <img
          :src="currentActivity.coverImage"
          :alt="currentActivity.title"
          class="w-full h-full object-cover"
        />
      </div>

      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        {{ currentActivity.title }}
      </h1>

      <div class="flex flex-wrap gap-3 mb-6">
        <el-tag type="success" size="large">
          <el-icon name="calendar" class="mr-2" />
          {{ formatDate(currentActivity.date) }}
        </el-tag>
        <el-tag type="info" size="large">
          <el-icon name="clock" class="mr-2" />
          {{ currentActivity.time }}
        </el-tag>
        <el-tag type="warning" size="large">
          <el-icon name="map-location" class="mr-2" />
          {{ currentActivity.location }}
        </el-tag>
      </div>

      <div class="bg-gray-50 p-6 rounded-lg mb-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-3">活动介绍</h2>
        <p class="text-gray-700 leading-relaxed whitespace-pre-line">
          {{ currentActivity.description }}
        </p>
      </div>

      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">参与人数</h3>
          <el-progress
            :percentage="
              (currentActivity.participants / currentActivity.maxParticipants) *
              100
            "
            :status="progressStatus"
            class="w-64"
          >
            <span class="text-sm text-gray-600">
              {{ currentActivity.participants }}/{{
                currentActivity.maxParticipants
              }}
              人
            </span>
          </el-progress>
        </div>

        <el-button
          type="primary"
          size="large"
          class="min-w-[200px]"
          @click="handleRegister"
          :disabled="
            currentActivity.isRegistered ||
            currentActivity.participants >= currentActivity.maxParticipants
          "
        >
          <el-icon
            name="check"
            v-if="currentActivity.isRegistered"
            class="mr-2"
          />
          {{
            currentActivity.isRegistered
              ? '已报名'
              : currentActivity.participants >= currentActivity.maxParticipants
              ? '名额已满'
              : '立即报名'
          }}
        </el-button>
      </div>

      <el-divider border-style="dashed" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">活动须知</h3>
          <ul class="space-y-3 text-gray-600">
            <li class="flex items-start">
              <el-icon name="check" class="text-green-500 mt-1 mr-2" />
              <span>请提前15分钟到场签到</span>
            </li>
            <li class="flex items-start">
              <el-icon name="check" class="text-green-500 mt-1 mr-2" />
              <span>携带相关书籍和笔记材料</span>
            </li>
            <li class="flex items-start">
              <el-icon name="check" class="text-green-500 mt-1 mr-2" />
              <span>保持手机静音，尊重分享者</span>
            </li>
            <li class="flex items-start">
              <el-icon name="check" class="text-green-500 mt-1 mr-2" />
              <span>活动后有茶歇交流时间</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">地点详情</h3>
          <div class="bg-white rounded-lg overflow-hidden border">
            <div class="p-4">
              <div class="flex items-center mb-3">
                <el-icon name="map-location" class="text-indigo-600 mr-2" />
                <span class="font-medium">{{ currentActivity.location }}</span>
              </div>
              <p class="text-gray-600 text-sm mb-4">
                详细地址将在报名成功后通过短信通知
              </p>
              <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="地点示意图"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>

  <el-empty v-else-if="loading" description="加载中..." class="py-12">
    <el-skeleton :rows="6" animated />
  </el-empty>

  <el-empty v-else description="活动不存在或已删除" class="py-12">
    <el-button type="primary" @click="$router.back()">返回上一页</el-button>
  </el-empty>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useActivityStore } from '~/stores/activityStore';

const route = useRoute();
const store = useActivityStore();
const { currentActivity, loading } = storeToRefs(store);

onMounted(() => {
  const id = parseInt(route.params.id as string);
  if (id) {
    store.getActivityById(id);
  }
});

const handleRegister = () => {
  if (currentActivity.value) {
    store.registerForActivity(currentActivity.value.id);
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const progressStatus = computed(() => {
  if (!currentActivity.value) return 'success';
  const ratio =
    currentActivity.value.participants / currentActivity.value.maxParticipants;
  if (ratio >= 0.9) return 'exception';
  if (ratio >= 0.7) return 'warning';
  return 'success';
});
</script>
