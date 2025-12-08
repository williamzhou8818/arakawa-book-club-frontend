<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-white pt-20">
    <!-- Hero Section -->
    <div
      class="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16"
    >
      <div class="container mx-auto px-4 text-center">
        <div class="flex items-center justify-center mb-4">
          <el-icon class="text-3xl mr-3"><Calendar /></el-icon>
          <h1 class="text-4xl md:text-5xl font-bold">イベント一覧</h1>
        </div>
        <p class="text-xl text-green-100 max-w-3xl mx-auto mt-4">
          読書を通じて深く学び、共に考える時間を。さまざまなテーマのイベントに参加して、新しい気づきを得ましょう。
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <el-button
            type="success"
            size="large"
            class="bg-white text-green-700 hover:bg-green-50 px-8 py-4 text-lg font-medium shadow-lg"
            @click="scrollToFilter"
          >
            <el-icon class="mr-2"><Filter /></el-icon>
            条件で絞り込む
          </el-button>
          <!-- <el-button
            type="warning"
            size="large"
            class="bg-amber-100 text-amber-800 hover:bg-amber-200 px-8 py-4 text-lg font-medium shadow-lg"
            @click="scrollToCalendar"
          >
            <el-icon class="mr-2"><Calendar /></el-icon>
            カレンダーで見る
          </el-button> -->
        </div>
      </div>
    </div>

    <!-- Filter Section -->
    <div ref="filterSection" class="container mx-auto px-4 py-8">
      <div
        class="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200"
      >
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div class="flex flex-wrap gap-3">
            <div
              v-for="(filter, index) in filters"
              :key="index"
              class="flex items-center"
            >
              <span class="text-gray-600 mr-2 text-sm font-medium"
                >{{ filter.label }}:</span
              >
              <el-select
                v-model="filter.value"
                class="min-w-[150px]"
                size="large"
                @change="applyFilters"
              >
                <el-option
                  v-for="option in filter.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </div>
          </div>
          <el-button
            type="primary"
            size="large"
            class="bg-green-600 hover:bg-green-700 px-6 py-3 text-lg"
            @click="resetFilters"
          >
            <el-icon class="mr-2"><Refresh /></el-icon>
            条件をリセット
          </el-button>
        </div>
      </div>

      <!-- Events Grid -->
      <div
        v-if="loading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <el-skeleton
          v-for="i in 6"
          :key="i"
          class="h-[400px] rounded-2xl"
          animated
        />
      </div>

      <div
        v-else-if="filteredEvents.length === 0"
        class="text-center py-16 bg-white rounded-2xl shadow-md p-8"
      >
        <div
          class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <el-icon class="text-4xl text-gray-500"><DocumentRemove /></el-icon>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">
          条件に合うイベントがありません
        </h3>
        <p class="text-gray-600 mb-6 max-w-md mx-auto">
          条件を変更するか、リセットしてすべてのイベントを表示してください。
        </p>
        <el-button
          type="primary"
          size="large"
          class="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
          @click="resetFilters"
        >
          条件をリセット
        </el-button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EventCard
          v-for="event in filteredEvents"
          :key="event.id"
          :event="event"
          :show-reserve-button="true"
          class="transition-all duration-300 hover:-translate-y-1"
        />
      </div>

      <!-- Pagination -->
      <div v-if="filteredEvents.length > 0" class="mt-12 flex justify-center">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="filteredEvents.length"
          layout="prev, pager, next, jumper"
          class="!text-green-600"
          @current-change="handlePageChange"
        />
      </div>
    </div>

    <!-- Calendar Section -->
    <!-- <div ref="calendarSection" class="container mx-auto px-4 py-12 bg-white">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-gray-900 mb-3">月別カレンダー</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          カレンダー形式でイベントを確認し、予定を立てやすくなります。
        </p>
      </div>
      <div class="bg-gray-50 rounded-2xl p-6 shadow-sm">
        <div class="flex justify-between items-center mb-6">
          <el-button
            type="primary"
            @click="prevMonth"
            class="bg-green-600 hover:bg-green-700"
          >
            <el-icon><ArrowLeft /></el-icon> 前月
          </el-button>
          <h3 class="text-2xl font-bold text-gray-800">
            {{ currentMonth }}月 {{ currentYear }}年
          </h3>
          <el-button
            type="primary"
            @click="nextMonth"
            class="bg-green-600 hover:bg-green-700"
          >
            次月 <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>
        <div class="grid grid-cols-7 gap-2 mb-4">
          <div
            v-for="day in ['日', '月', '火', '水', '木', '金', '土']"
            :key="day"
            class="text-center font-bold py-2 text-gray-700"
          >
            {{ day }}
          </div>
        </div>
        <div class="grid grid-cols-7 gap-2">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            :class="[
              'min-h-[100px] p-2 border rounded-lg relative',
              day.isOtherMonth ? 'bg-gray-50 text-gray-400' : 'bg-white',
              day.isToday ? 'border-green-500 bg-green-50' : 'border-gray-200',
              day.hasEvents ? 'border-2 border-green-400 bg-green-50' : '',
            ]"
          >
            <div class="font-medium mb-1">{{ day.date }}</div>
            <div v-if="day.hasEvents" class="absolute bottom-2 right-2">
              <el-badge
                :value="day.eventCount"
                type="primary"
                class="!text-xs !px-2 !py-0.5"
              />
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- CTA Section -->
    <div class="bg-green-50 py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          イベントの開催を希望しますか？
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto mb-8">
          ご希望のテーマや日程を教えてください。皆様のご要望に応じて、新しいイベントを企画します。
        </p>
        <el-button
          type="primary"
          size="large"
          class="bg-green-600 hover:bg-green-700 text-white px-10 py-5 text-xl font-medium shadow-xl"
          @click="$router.push('/contact')"
        >
          <el-icon class="mr-3 text-2xl"><ChatDotRound /></el-icon>
          イベントリクエスト
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Calendar,
  Filter,
  Refresh,
  DocumentRemove,
  ArrowLeft,
  ArrowRight,
  ChatDotRound,
  Check,
} from '@element-plus/icons-vue';
import EventCard from '../../components/EventCard.vue';

const router = useRouter();
const route = useRoute();

// State Variables
const loading = ref(true);
const events = ref([]);
const currentPage = ref(1);
const pageSize = ref(9);
const filterSection = ref(null);
const calendarSection = ref(null);

// Filters
const filters = ref([
  {
    label: 'カテゴリ',
    value: 'all',
    options: [
      { value: 'all', label: 'すべて' },
      { value: '人気イベント', label: '人気イベント' },
      { value: '限定イベント', label: '限定イベント' },
      { value: '注目', label: '注目' },
      { value: '新着', label: '新着' },
    ],
  },
  {
    label: 'エリア',
    value: 'all',
    options: [
      { value: 'all', label: 'すべて' },
      { value: '東京', label: '東京' },
      { value: '大阪', label: '大阪' },
      { value: '名古屋', label: '名古屋' },
    ],
  },
  {
    label: '日付',
    value: 'upcoming',
    options: [
      { value: 'upcoming', label: '今後のイベント' },
      { value: 'this_month', label: '今月' },
      { value: 'next_month', label: '来月' },
      { value: 'all', label: 'すべて' },
    ],
  },
]);

// Calendar
const currentDate = new Date();
const currentMonth = ref(currentDate.getMonth() + 1);
const currentYear = ref(currentDate.getFullYear());

// Methods
const scrollToFilter = async () => {
  if (filterSection.value) {
    await nextTick();
    filterSection.value.scrollIntoView({ behavior: 'smooth' });
  }
};

const scrollToCalendar = async () => {
  if (calendarSection.value) {
    await nextTick();
    calendarSection.value.scrollIntoView({ behavior: 'smooth' });
  }
};

const fetchEvents = async () => {
  try {
    loading.value = true;
    // 実際のAPIエンドポイントに置き換えてください
    const response = await fetch('http://localhost:3001/api/events');
    const data = await response.json();

    if (data.success) {
      events.value = data.data.sort(
        (a, b) => new Date(a.start_time) - new Date(b.start_time),
      );

      // URLパラメータからフィルタを適用
      if (route.query.category) {
        filters.value[0].value = route.query.category;
      }
      if (route.query.area) {
        filters.value[1].value = route.query.area;
      }
      if (route.query.date) {
        filters.value[2].value = route.query.date;
      }
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  } finally {
    loading.value = false;
  }
};

const applyFilters = () => {
  // フィルタを適用
  // 実際の実装では、ここでフィルタリングロジックを実装
  console.log('Applying filters:', filters.value);
};

const resetFilters = () => {
  filters.value.forEach((filter) => {
    filter.value = filter.options[0].value;
  });
  applyFilters();
};

const handlePageChange = (page) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Calendar Methods
const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month - 1, 1).getDay();
};

const calendarDays = computed(() => {
  const days = [];
  const daysInMonth = getDaysInMonth(currentYear.value, currentMonth.value);
  const firstDay = getFirstDayOfMonth(currentYear.value, currentMonth.value);

  // 前月の日付を追加
  const prevMonthDays = firstDay === 0 ? 6 : firstDay - 1;
  for (let i = prevMonthDays; i >= 1; i--) {
    days.push({
      date: i,
      isOtherMonth: true,
      isToday: false,
      hasEvents: false,
      eventCount: 0,
    });
  }

  // 今月の日付を追加
  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      today.getDate() === i &&
      today.getMonth() + 1 === currentMonth.value &&
      today.getFullYear() === currentYear.value;

    // イベントのチェック（ダミーデータ）
    const dateStr = `${currentYear.value}-${currentMonth.value
      .toString()
      .padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
    const dayEvents = events.value.filter((event) => {
      const eventDate = new Date(event.start_time);
      return (
        eventDate.getFullYear() === currentYear.value &&
        eventDate.getMonth() + 1 === currentMonth.value &&
        eventDate.getDate() === i
      );
    });

    days.push({
      date: i,
      isOtherMonth: false,
      isToday: isToday,
      hasEvents: dayEvents.length > 0,
      eventCount: dayEvents.length,
    });
  }

  // 次月の日付を追加（7の倍数になるまで）
  const remainingDays = 7 - (days.length % 7);
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      isOtherMonth: true,
      isToday: false,
      hasEvents: false,
      eventCount: 0,
    });
  }

  return days.slice(0, 42); // 最大42日（6週間）
});

const prevMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const filteredEvents = computed(() => {
  // 実際のフィルタリングロジックを実装
  return events.value;
});

onMounted(fetchEvents);
</script>

<style scoped>
:deep(
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .el-pager li
  ) {
  background-color: white !important;
  color: #16a34a !important;
  border: 1px solid #16a34a !important;
}

:deep(.el-pagination.is-background .el-pager li.is-active) {
  background-color: #16a34a !important;
  color: white !important;
}

:deep(
    .el-pagination.is-background .btn-prev:hover,
    .el-pagination.is-background .btn-next:hover,
    .el-pagination.is-background .el-pager li:hover
  ) {
  background-color: #16a34a !important;
  color: white !important;
}

:deep(.el-badge__content) {
  background-color: #16a34a !important;
  border: none !important;
}
</style>
