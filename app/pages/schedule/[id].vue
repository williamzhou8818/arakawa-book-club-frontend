<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-white pt-20 pb-16">
    <!-- 読み込み状態 -->
    <div v-if="loading" class="container mx-auto px-4 py-12 text-center">
      <el-skeleton class="h-96" animated />
    </div>

    <!-- エラー状態 -->
    <div v-else-if="error" class="container mx-auto px-4 py-12 text-center">
      <div
        class="max-w-md mx-auto bg-red-50 rounded-2xl p-8 border border-red-200"
      >
        <div
          class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <el-icon class="text-red-600 text-3xl"><Warning /></el-icon>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          イベント情報の取得に失敗しました
        </h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <el-button
          type="primary"
          @click="fetchEvent"
          class="bg-green-600 hover:bg-green-700 px-6 py-3 text-lg"
        >
          再試行
        </el-button>
        <el-button
          @click="$router.push('/schedule')"
          class="mt-4 text-gray-600 hover:text-gray-900"
        >
          <el-icon class="mr-2"><ArrowLeft /></el-icon>
          イベント一覧に戻る
        </el-button>
      </div>
    </div>

    <!-- イベント詳細コンテンツ -->
    <div v-else-if="event" class="container mx-auto px-4">
      <div class="mb-8">
        <el-button
          @click="$router.push('/schedule')"
          class="text-gray-600 hover:text-gray-900 flex items-center group"
        >
          <el-icon
            class="mr-2 text-lg group-hover:-translate-x-1 transition-transform"
          >
            <ArrowLeft />
          </el-icon>
          <span class="font-medium group-hover:underline"
            >イベント一覧に戻る</span
          >
        </el-button>
      </div>

      <div
        class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200"
      >
        <!-- イベントヘッダー -->
        <div
          class="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-8 md:p-10"
        >
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div class="mb-6 md:mb-0">
              <div class="flex items-center space-x-3 mb-4">
                <span
                  :class="[
                    'px-4 py-1 rounded-full text-sm font-medium',
                    getTagClass(event.tag),
                  ]"
                >
                  {{ event.tag }}
                </span>
                <span
                  class="flex items-center bg-white/20 px-4 py-1 rounded-full"
                >
                  <el-icon class="mr-2"><User /></el-icon>
                  <span class="font-medium"
                    >{{ participantCount }}人 参加中</span
                  >
                </span>
              </div>
              <h1 class="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                {{ event.title }}
              </h1>
              <div class="flex items-center mb-2">
                <el-icon class="mr-3 text-xl"><Calendar /></el-icon>
                <span class="text-lg font-medium">
                  {{ formatDateOnly(event.start_time) }}
                  {{ formatTimeOnly(event.start_time) }} ~
                  {{ formatTimeOnly(event.end_time) }}
                </span>
              </div>
              <div class="flex items-center">
                <el-icon class="mr-3 text-xl"><Location /></el-icon>
                <span class="text-lg font-medium">{{ event.location }}</span>
              </div>
            </div>
            <div class="flex-shrink-0">
              <div
                class="bg-white text-green-700 rounded-2xl p-4 text-center shadow-lg"
              >
                <div class="text-4xl font-bold mb-1">{{ remainingSpots }}</div>
                <div class="text-lg font-medium">残り席</div>
                <div class="text-sm opacity-80">定員: {{ capacity }}名</div>
              </div>
            </div>
          </div>
        </div>

        <!-- イベントコンテンツ -->
        <div class="p-6 md:p-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- メインコンテンツ -->
            <div class="lg:col-span-2">
              <div class="prose prose-lg max-w-none">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">
                  イベント詳細
                </h2>
                <p class="text-gray-700 text-lg leading-relaxed mb-6">
                  {{ event.description }}
                </p>

                <div class="border-t border-gray-200 pt-6 mt-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-4">
                    イベントの流れ
                  </h3>
                  <ol class="list-decimal pl-6 space-y-3 text-gray-700">
                    <li>受付 (開始15分前から)</li>
                    <li>自己紹介・アイスブレイク (15分)</li>
                    <li>テーマ発表・ディスカッション (60分)</li>
                    <li>質疑応答・まとめ (30分)</li>
                    <li>交流会 (任意参加・30分)</li>
                  </ol>
                </div>

                <div class="border-t border-gray-200 pt-6 mt-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-4">注意事項</h3>
                  <ul class="list-disc pl-6 space-y-2 text-gray-700">
                    <li>当日は10分前までに会場にお越しください</li>
                    <li>予約キャンセルは24時間前まで可能です</li>
                    <li>飲み物は会場でご用意いたします</li>
                    <li>テーマに関する書籍は事前にご自身でご用意ください</li>
                  </ul>
                </div>
              </div>

              <!-- 参加者一覧 -->
              <div class="mt-10 pt-8 border-t border-gray-200">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-2xl font-bold text-gray-900">
                    参加者 ({{ participantCount }}人)
                  </h2>
                  <el-button
                    v-if="isAuthenticated"
                    type="primary"
                    size="small"
                    @click="showInviteModal = true"
                    class="bg-green-600 hover:bg-green-700"
                  >
                    <el-icon class="mr-1"><Plus /></el-icon>
                    友達を招待
                  </el-button>
                </div>
                <div
                  class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                  <div
                    v-for="(participant, index) in participants"
                    :key="index"
                    class="flex flex-col items-center"
                  >
                    <img
                      :src="`https://i.pravatar.cc/150?img=${10 + index}`"
                      class="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover"
                      alt="参加者"
                    />
                    <span class="text-sm font-medium mt-2 text-gray-700"
                      >参加者{{ index + 1 }}</span
                    >
                    <span class="text-xs text-green-600 mt-1">読書歴3年</span>
                  </div>
                  <div
                    v-if="participantCount > participants.length"
                    class="flex flex-col items-center"
                  >
                    <div
                      class="w-16 h-16 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-gray-500 font-bold shadow-md"
                    >
                      +{{ participantCount - participants.length }}
                    </div>
                    <span class="text-sm font-medium mt-2 text-gray-700"
                      >その他の参加者</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- 予約サイドバー -->
            <div class="lg:col-span-1">
              <div class="sticky top-8">
                <div
                  class="bg-green-50 rounded-2xl p-6 border border-green-200 shadow-sm"
                >
                  <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
                    予約フォーム
                  </h2>

                  <div
                    v-if="!isAuthenticated"
                    class="mb-6 p-4 bg-white rounded-lg border border-gray-200"
                  >
                    <p class="text-gray-600 mb-4 text-center">
                      予約にはログインが必要です。<br />アカウントをお持ちでない場合は、新規登録してください。
                    </p>
                    <div class="flex space-x-4">
                      <el-button
                        type="primary"
                        class="flex-1 bg-green-600 hover:bg-green-700"
                        @click="$router.push('/login')"
                      >
                        ログイン
                      </el-button>
                      <el-button
                        type="info"
                        class="flex-1 bg-blue-500 hover:bg-blue-600"
                        @click="$router.push('/register')"
                      >
                        新規登録
                      </el-button>
                    </div>
                  </div>

                  <div v-else>
                    <div class="mb-4">
                      <label class="block text-gray-700 mb-2 font-medium"
                        >お名前</label
                      >
                      <el-input
                        v-model="reservationForm.name"
                        placeholder="山田 太郎"
                        size="large"
                        class="!bg-white"
                      />
                    </div>
                    <div class="mb-4">
                      <label class="block text-gray-700 mb-2 font-medium"
                        >メールアドレス</label
                      >
                      <el-input
                        v-model="reservationForm.email"
                        placeholder="example@email.com"
                        size="large"
                        class="!bg-white"
                      />
                    </div>
                    <div class="mb-4">
                      <label class="block text-gray-700 mb-2 font-medium"
                        >電話番号</label
                      >
                      <el-input
                        v-model="reservationForm.phone"
                        placeholder="090-1234-5678"
                        size="large"
                        class="!bg-white"
                      />
                    </div>
                    <div class="mb-4">
                      <label class="block text-gray-700 mb-2 font-medium"
                        >参加人数</label
                      >
                      <el-select
                        v-model="reservationForm.guestCount"
                        class="w-full"
                        size="large"
                      >
                        <el-option :label="`1人 (自分)`" :value="1" />
                        <el-option :label="`2人 (自分 + 1名)`" :value="2" />
                        <el-option :label="`3人 (自分 + 2名)`" :value="3" />
                        <el-option :label="`4人 (自分 + 3名)`" :value="4" />
                      </el-select>
                    </div>

                    <el-alert
                      v-if="remainingSpots < reservationForm.guestCount"
                      type="warning"
                      class="mb-4"
                    >
                      残り席が不足しています。最大
                      {{ remainingSpots }}名まで予約可能です。
                    </el-alert>

                    <el-button
                      type="primary"
                      size="large"
                      @click="submitReservation"
                      :disabled="remainingSpots <= 0 || isSubmitting"
                      class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <span v-if="isSubmitting">
                        <el-icon class="mr-2 animate-spin"><Loading /></el-icon>
                        予約処理中...
                      </span>
                      <span v-else-if="remainingSpots <= 0"> 満席です </span>
                      <span v-else>
                        <el-icon class="mr-2"><Tickets /></el-icon>
                        {{ reservationForm.guestCount }}名で予約する
                      </span>
                    </el-button>
                  </div>
                </div>

                <div
                  class="mt-6 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                >
                  <h3 class="text-xl font-bold text-gray-900 mb-4">
                    このイベントをシェア
                  </h3>
                  <div class="flex space-x-4">
                    <el-button
                      class="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <el-icon class="mr-2"><ChatLineSquare /></el-icon>
                      LINE
                    </el-button>
                    <el-button
                      class="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      <el-icon class="mr-2"><ChatLineRound /></el-icon>
                      Twitter
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 友達招待モーダル -->
    <el-dialog
      v-model="showInviteModal"
      title="友達を招待"
      width="500px"
      class="!rounded-2xl"
    >
      <div class="py-4">
        <p class="text-gray-600 mb-4">
          以下のリンクを友達に送信して、このイベントに招待できます。
        </p>
        <div class="mb-4">
          <el-input :value="inviteUrl" readonly class="!bg-gray-50">
            <template #append>
              <el-button @click="copyInviteUrl">コピー</el-button>
            </template>
          </el-input>
        </div>
        <div class="flex justify-center space-x-4">
          <el-button class="bg-blue-500 hover:bg-blue-600 text-white">
            <el-icon class="mr-1"><ChatLineSquare /></el-icon>
            LINEで送る
          </el-button>
          <el-button class="bg-cyan-500 hover:bg-cyan-600 text-white">
            <el-icon class="mr-1"><ChatLineRound /></el-icon>
            Twitterで送る
          </el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 予約成功モーダル -->
    <el-dialog
      v-model="showSuccessModal"
      title=""
      width="400px"
      class="!rounded-2xl !p-0"
      :show-close="false"
    >
      <div class="text-center py-8 px-6">
        <div
          class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <el-icon class="text-green-600 text-4xl"
            ><CircleCheckFilled
          /></el-icon>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          予約が完了しました！
        </h2>
        <p class="text-gray-600 mb-6">
          予約確認メールを送信しました。<br />
          当日は10分前までに会場にお越しください。
        </p>
        <el-button
          type="primary"
          @click="closeSuccessModal"
          class="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg font-medium"
        >
          閉じる
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  ArrowLeft,
  Calendar,
  Location,
  User,
  Warning,
  Plus,
  Loading,
  Tickets,
  ChatLineSquare,
  ChatLineRound,
  CircleCheckFilled,
  UserFilled,
} from '@element-plus/icons-vue';
import { useEventsApi } from '~/composables/useEventsApi';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const error = ref(null);
const event = ref(null);
const showInviteModal = ref(false);
const showSuccessModal = ref(false);
const isSubmitting = ref(false);

// ダミーデータ（実際にはAPIから取得）
const capacity = 50;
const participantCount = ref(28);
const participants = Array.from(
  { length: Math.min(8, participantCount.value) },
  (_, i) => i + 1,
);

// 予約フォーム
const reservationForm = ref({
  name: '',
  email: '',
  phone: '',
  guestCount: 1,
});

// 認証状態（ダミー）
const isAuthenticated = ref(true);

const remainingSpots = computed(() => {
  return capacity - participantCount.value;
});

const inviteUrl = computed(() => {
  return `${window.location.origin}/schedule/${route.params.id}`;
});

// タグのスタイルを取得
const getTagClass = (tag) => {
  const tagStyles = {
    人気イベント: 'bg-amber-100 text-amber-800',
    限定イベント: 'bg-green-100 text-green-800',
    注目: 'bg-blue-100 text-blue-800',
    新着: 'bg-purple-100 text-purple-800',
  };
  return tagStyles[tag] || 'bg-gray-100 text-gray-800';
};

// 日付部分のみフォーマット
const formatDateOnly = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

  return `${year}年${month}月${day}日（${dayOfWeek}）`;
};

// 時刻部分のみフォーマット
const formatTimeOnly = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

const copyInviteUrl = async () => {
  try {
    await navigator.clipboard.writeText(inviteUrl.value);
    ElMessage.success('リンクをコピーしました！');
  } catch (err) {
    console.error('Failed to copy text: ', err);
    ElMessage.error('コピーに失敗しました');
  }
};

const submitReservation = async () => {
  if (remainingSpots.value < reservationForm.value.guestCount) {
    ElMessage.warning('残り席が不足しています');
    return;
  }

  if (
    !reservationForm.value.name ||
    !reservationForm.value.email ||
    !reservationForm.value.phone
  ) {
    ElMessage.warning('すべての項目を入力してください');
    return;
  }

  try {
    isSubmitting.value = true;

    // ここで実際の予約APIを呼び出します
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 予約成功
    participantCount.value += reservationForm.value.guestCount;

    // フォームをリセット
    reservationForm.value = {
      name: '',
      email: '',
      phone: '',
      guestCount: 1,
    };

    showSuccessModal.value = true;
  } catch (err) {
    console.error('Reservation failed:', err);
    ElMessage.error('予約に失敗しました。もう一度お試しください。');
  } finally {
    isSubmitting.value = false;
  }
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  // 必要に応じてページをリロードまたは状態を更新
};

const fetchEvent = async () => {
  try {
    loading.value = true;
    error.value = null;

    const api = useEventsApi();
    event.value = await api.getEventById(route.params.id);

    if (!event.value) {
      throw new Error('イベントが見つかりません');
    }
  } catch (err) {
    console.error('Error fetching event:', err);
    error.value = err.message || 'イベント情報の取得に失敗しました';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchEvent);
</script>

<style scoped>
.prose h2 {
  @apply text-2xl font-bold text-gray-900 mt-8 mb-4;
}
.prose h3 {
  @apply text-xl font-bold text-gray-900 mt-6 mb-3;
}
.prose p {
  @apply mb-4;
}
.prose ol {
  @apply list-decimal pl-6 space-y-2;
}
.prose ul {
  @apply list-disc pl-6 space-y-2;
}
</style>
