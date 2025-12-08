<template>
  <div
    class="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    @click="handleCardClick"
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
      <p class="text-gray-600 mb-4 line-clamp-2">
        {{ event.description }}
      </p>
      <div class="flex items-center justify-between">
        <div class="flex -space-x-3">
          <img
            v-for="i in Math.min(3, getParticipantCount(event.id))"
            :key="i"
            :src="`https://i.pravatar.cc/150?img=${i + 10 + event.id}`"
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
          v-if="showReserveButton"
          type="primary"
          size="small"
          @click.stop="handleReserveClick"
          class="bg-green-600 hover:bg-green-700"
        >
          予約する
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Location } from '@element-plus/icons-vue';

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
  showReserveButton: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const getTagClass = (tag) => {
  const tagStyles = {
    人気イベント: 'bg-amber-100 text-amber-800',
    限定イベント: 'bg-green-100 text-green-800',
    注目: 'bg-blue-100 text-blue-800',
    新着: 'bg-purple-100 text-purple-800',
  };
  return tagStyles[tag] || 'bg-gray-100 text-gray-800';
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

const getParticipantCount = (eventId) => {
  return Math.floor(15 + ((eventId * 7) % 25));
};

const handleCardClick = () => {
  router.push(`/schedule/${props.event.id}`);
};

const handleReserveClick = (e) => {
  e.stopPropagation();
  router.push(`/schedule/${props.event.id}`);
};
</script>
