<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">近期活动</h1>
      <p class="text-gray-600">
        加入我们的读书活动，与志同道合的朋友一起分享阅读的乐趣
      </p>
    </div>

    <el-empty v-if="loading" description="加载中...">
      <el-skeleton :rows="3" animated />
    </el-empty>

    <el-empty v-else-if="error" :description="error">
      <el-button type="primary" @click="fetchActivities">重试</el-button>
    </el-empty>

    <div v-else-if="activities.length === 0" class="text-center py-12">
      <el-empty description="暂无活动" />
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="activity in activities"
        :key="activity.id"
        :to="`/activities/${activity.id}`"
        class="block"
      >
        <el-card
          shadow="hover"
          class="h-full transition-transform hover:scale-[1.02]"
        >
          <div class="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg">
            <img
              :src="activity.coverImage"
              :alt="activity.title"
              class="w-full h-full object-cover transition-transform hover:scale-110"
            />
          </div>

          <div class="space-y-3">
            <div>
              <h3 class="text-xl font-bold text-gray-900 line-clamp-1">
                {{ activity.title }}
              </h3>
              <p class="text-gray-600 text-sm line-clamp-2 mt-1">
                {{ activity.description }}
              </p>
            </div>

            <div class="flex flex-wrap gap-2">
              <el-tag type="success" size="small">
                <el-icon name="calendar" class="mr-1" />
                {{ formatDate(activity.date) }}
              </el-tag>
              <el-tag type="info" size="small">
                <el-icon name="clock" class="mr-1" />
                {{ activity.time }}
              </el-tag>
              <el-tag type="warning" size="small">
                <el-icon name="user" class="mr-1" />
                {{ activity.participants }}/{{ activity.maxParticipants }}
              </el-tag>
            </div>

            <div class="flex items-center justify-between pt-2 border-t">
              <span class="text-sm text-gray-500">
                {{ activity.location }}
              </span>
              <el-button
                type="primary"
                size="small"
                @click.stop="handleRegister(activity)"
                :disabled="
                  activity.isRegistered ||
                  activity.participants >= activity.maxParticipants
                "
              >
                {{
                  activity.isRegistered
                    ? '已报名'
                    : activity.participants >= activity.maxParticipants
                    ? '已满'
                    : '立即报名'
                }}
              </el-button>
            </div>
          </div>
        </el-card>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useActivityStore } from '~/stores/activityStore';

const store = useActivityStore();
const { activities, loading, error } = storeToRefs(store);

onMounted(() => {
  if (activities.value.length === 0) {
    store.fetchActivities();
  }
});

const handleRegister = (activity) => {
  store.registerForActivity(activity.id);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
</script>
