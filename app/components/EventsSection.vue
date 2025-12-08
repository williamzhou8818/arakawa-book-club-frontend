<template>
  <section class="py-16 bg-gradient-to-b from-green-50 to-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          今月の注目イベント
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          特別ゲストを招いた対談や、テーマ別に深く掘り下げる読書会を多数開催しています。
        </p>
      </div>
      <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <el-skeleton
          v-for="i in 2"
          :key="i"
          class="h-80 rounded-2xl"
          animated
        />
      </div>

      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-500 text-lg">イベントの取得に失敗しました</p>
        <el-button type="primary" @click="fetchEvents" class="mt-4">
          再試行
        </el-button>
      </div>

      <div v-else-if="recentEvents.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">現在表示するイベントがありません</p>
      </div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          v-for="(event, index) in recentEvents"
          class="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="p-6">
            <div class="flex items-center mb-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium mr-3',
                  getTagClass(event.tag),
                ]"
              >
                {{ event.tag }}
              </span>
              <span class="text-green-600 font-medium">
                {{ formatDateOnly(event.start_time) }}
                {{ formatTimeOnly(event.start_time) }} ~
                {{ formatTimeOnly(event.end_time) }}
              </span>
            </div>
            <div class="flex items-center mb-4">
              <span class="px-3 text-gray-800 text-sm font-medium">
                <el-icon class="mr-2 mt-0.5"><Location /></el-icon>

                {{ event.location }}
              </span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">
              {{ event.title }}
            </h3>
            <p class="text-gray-600 mb-4">
              {{ event.description }}
            </p>
            <div class="flex items-center justify-between">
              <div class="flex -space-x-3">
                <img
                  v-for="i in Math.min(3, getParticipantCount(event.id))"
                  :key="i"
                  :src="`https://i.pravatar.cc/150?img=${i + index * 5}`"
                  class="w-10 h-10 rounded-full border-2 border-white"
                  alt="参加者"
                />
                <div
                  v-if="getParticipantCount(event.id) > 3"
                  class="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-500"
                >
                  +{{ getParticipantCount(event.id) - 3 }}
                </div>
              </div>
              <el-button
                type="primary"
                size="small"
                @click="$router.push(`/schedule/${event.id}`)"
                class="bg-green-600 hover:bg-green-700"
              >
                予約する
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-8">
        <el-button
          type="info"
          @click="$router.push('/schedule')"
          class="px-6 py-3 border-2 border-green-600 text-green-700 hover:bg-green-50 transition-all duration-300"
        >
          すべてのイベントを見る
        </el-button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { Location } from '@element-plus/icons-vue';
import { useEventsApi } from '../composables/useEventsApi';

const loading = ref(true);
const error = ref(false);
const events = ref([]);

const getTagClass = (tag) => {
  const tagClasses = {
    人気イベント: 'bg-amber-100 text-amber-800',
    注目: 'bg-blue-100 text-blue-800',
    新着: 'bg-green-100 text-green-800',
    終了間近: 'bg-red-100 text-red-800',
  };
  return tagClasses[tag] || 'bg-gray-100 text-gray-800';
};

// 日付部分のみフォーマット (年月日と曜日)
const formatDateOnly = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

  return `${year}年${month}月${day}日（${dayOfWeek}）`;
};

// 時刻部分のみフォーマット (HH:mm)
const formatTimeOnly = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

// 参加者数をランダムに生成（実際のAPIに参加者数フィールドがあればそちらを使用）
const getParticipantCount = (eventId) => {
  // イベントIDに基づいて決定的なランダム値を生成
  return 15 + ((eventId * 7) % 25);
};

// 最近の2つのイベントを取得（日付順でソート）
const recentEvents = computed(() => {
  if (!events.value || events.value.length === 0) return [];

  // start_timeでソート（昇順）
  const sortedEvents = [...events.value].sort(
    (a, b) => new Date(a.start_time) - new Date(b.start_time),
  );

  // 最初の2つだけを返す
  return sortedEvents.slice(0, 2);
});

onMounted(async () => {
  try {
    loading.value = true;
    const api = useEventsApi();
    events.value = await api.getEvents();
  } catch (error) {
    console.error('Failed to load events:', error);
  } finally {
    loading.value = false;
  }
});
</script>
