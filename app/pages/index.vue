<template>
  <div class="home-page">
    <!-- Hero Section - 增强版 -->
    <section
      class="hero-section py-20 bg-gradient-to-r from-indigo-50 to-purple-50 relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div class="container mx-auto px-4 relative z-10 text-center">
        <div class="inline-block mb-6">
          <span
            class="px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
          >
            📚 新しい読書体験
          </span>
        </div>
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
        >
          <span class="block">本と共に、</span>
          <span class="block mt-2">より良い未来へ</span>
        </h1>
        <p class="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          読書を通じて自己成長し、多様な視点を持つ仲間と深く交流できる場所。一人では気づけない本の魅力を、一緒に発見しましょう。
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <el-button
            type="primary"
            size="large"
            @click="$router.push('/schedule')"
            class="px-8 py-4 text-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105"
          >
            次回イベントを予約
          </el-button>
          <el-button
            size="large"
            @click="$router.push('/guide')"
            class="px-8 py-4 text-lg border-2 border-green-600 text-green-700 hover:bg-green-50 transition-all duration-300"
          >
            会の詳細を見る
          </el-button>
        </div>
        <div
          class="flex justify-center items-center gap-4 text-sm text-gray-500"
        >
          <div class="flex -space-x-2">
            <img
              v-for="(user, index) in recentParticipants"
              :key="index"
              :src="`https://i.pravatar.cc/150?img=${index + 1}`"
              class="w-8 h-8 rounded-full border-2 border-white object-cover"
              alt="参加者"
            />
          </div>
          <span>今月は500人以上の読書愛好家が参加</span>
        </div>
      </div>
    </section>

    <!-- Value Proposition Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            私たちが大切にすること
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            読書会は単なる本の感想を共有する場ではありません。人生を豊かにするための対話の場です。
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300"
          >
            <div
              class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-green-700 text-2xl font-bold">1</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">深く考える</h3>
            <p class="text-gray-600">
              表面的な感想ではなく、本が伝える本質的なメッセージや、自分の人生にどう活かせるかを深く考えます。
            </p>
          </div>

          <div
            class="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300"
          >
            <div
              class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-green-700 text-2xl font-bold">2</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">多様な視点</h3>
            <p class="text-gray-600">
              年齢、職業、経験が異なる参加者から学ぶことで、自分だけでは気づけなかった本の新たな魅力を発見します。
            </p>
          </div>

          <div
            class="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300"
          >
            <div
              class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-green-700 text-2xl font-bold">3</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">実践につなげる</h3>
            <p class="text-gray-600">
              読んだ内容をただ理解するだけでなく、日常生活や仕事にどう活かせるかを具体的に考え、行動に移します。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Upcoming Events Preview -->
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

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            class="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div class="p-6">
              <div class="flex items-center mb-4">
                <span
                  class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mr-3"
                >
                  限定イベント
                </span>
                <span class="text-green-600 font-medium"
                  >2024年12月15日（日）14:00-16:00</span
                >
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">
                『人生を変える読書術』著者対談会
              </h3>
              <p class="text-gray-600 mb-4">
                話題のベストセラー著者をゲストに迎え、読書を通じた自己変革の秘訣について深く語り合います。参加者からの質問も受け付けます。
              </p>
              <div class="flex items-center justify-between">
                <div class="flex -space-x-3">
                  <img
                    v-for="i in 3"
                    :key="i"
                    :src="`https://i.pravatar.cc/150?img=${i + 10}`"
                    class="w-10 h-10 rounded-full border-2 border-white"
                    alt="参加者"
                  />
                  <div
                    class="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-500"
                  >
                    +28
                  </div>
                </div>
                <el-button
                  type="primary"
                  size="small"
                  @click="$router.push('/schedule')"
                  class="bg-green-600 hover:bg-green-700"
                >
                  予約する
                </el-button>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div class="p-6">
              <div class="flex items-center mb-4">
                <span
                  class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mr-3"
                >
                  人気イベント
                </span>
                <span class="text-green-600 font-medium"
                  >2024年12月20日（金）19:00-21:00</span
                >
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">
                哲学的対話：「幸福とは何か」
              </h3>
              <p class="text-gray-600 mb-4">
                古典的な哲学書を題材に、現代社会における「幸福」のあり方について、参加者全員で対話型ディスカッションを行います。
              </p>
              <div class="flex items-center justify-between">
                <div class="flex -space-x-3">
                  <img
                    v-for="i in 3"
                    :key="i"
                    :src="`https://i.pravatar.cc/150?img=${i + 15}`"
                    class="w-10 h-10 rounded-full border-2 border-white"
                    alt="参加者"
                  />
                  <div
                    class="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-500"
                  >
                    +42
                  </div>
                </div>
                <el-button
                  type="primary"
                  size="small"
                  @click="$router.push('/schedule')"
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

    <!-- Testimonials Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">参加者の声</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            読書会に参加された皆さんからの感想と変化の物語
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-green-200 transition-all duration-300"
          >
            <div class="flex items-center mb-4">
              <img
                src="https://i.pravatar.cc/150?img=45"
                alt="参加者"
                class="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h4 class="font-bold text-gray-900">田中 美咲さん</h4>
                <p class="text-sm text-green-600">2年間参加</p>
              </div>
            </div>
            <div class="text-yellow-400 mb-2">
              <span>★★★★★</span>
            </div>
            <p class="text-gray-600 italic">
              "最初は人見知りで緊張していましたが、優しい雰囲気のおかげで自然と本音を話せるようになりました。読書の楽しみが10倍になりました！"
            </p>
          </div>

          <div
            class="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-green-200 transition-all duration-300"
          >
            <div class="flex items-center mb-4">
              <img
                src="https://i.pravatar.cc/150?img=67"
                alt="参加者"
                class="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h4 class="font-bold text-gray-900">佐藤 健太郎さん</h4>
                <p class="text-sm text-green-600">3年間参加</p>
              </div>
            </div>
            <div class="text-yellow-400 mb-2">
              <span>★★★★★</span>
            </div>
            <p class="text-gray-600 italic">
              "ビジネス書の読書会で得た気づきが、実際の仕事に活かされ、昇進につながりました。知識だけではなく、人脈も広がったのが嬉しいです。"
            </p>
          </div>

          <div
            class="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-green-200 transition-all duration-300"
          >
            <div class="flex items-center mb-4">
              <img
                src="https://i.pravatar.cc/150?img=89"
                alt="参加者"
                class="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h4 class="font-bold text-gray-900">鈴木 陽子さん</h4>
                <p class="text-sm text-green-600">1年間参加</p>
              </div>
            </div>
            <div class="text-yellow-400 mb-2">
              <span>★★★★★</span>
            </div>
            <p class="text-gray-600 italic">
              "子育ての合間の貴重な時間です。同じような境遇のママ友ができ、本の話だけでなく、育児の悩みも共有できる場になっています。"
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-16 bg-gradient-to-b from-green-50 to-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">参加の流れ</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            読書会への参加はとても簡単です。初めての方でも安心してご参加いただけます。
          </p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="relative">
            <!-- Timeline line -->
            <div
              class="hidden md:block absolute top-8 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-green-200"
            ></div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Step 1 -->
              <div class="relative z-10">
                <div
                  class="absolute -left-4 top-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold md:hidden"
                >
                  1
                </div>
                <div
                  class="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
                >
                  <div
                    class="hidden md:block absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold"
                  >
                    1
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">
                    イベントを選ぶ
                  </h3>
                  <p class="text-gray-600 mb-4">
                    興味のあるテーマや日程を選んで予約します。初めての方は「初めての方向け」イベントがおすすめです。
                  </p>
                  <el-button
                    type="info"
                    size="small"
                    @click="$router.push('/schedule')"
                    class="border-green-500 text-green-700 hover:bg-green-50"
                  >
                    イベント一覧を見る
                  </el-button>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="relative z-10">
                <div
                  class="absolute -left-4 top-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold md:hidden"
                >
                  2
                </div>
                <div
                  class="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
                >
                  <div
                    class="hidden md:block absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold"
                  >
                    2
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">本を読む</h3>
                  <p class="text-gray-600 mb-4">
                    指定された本を事前に読んでおきます。必ず全文を読む必要はなく、興味のある章だけでもOKです。
                  </p>
                  <el-button
                    type="info"
                    size="small"
                    @click="$router.push('/guide')"
                    class="border-green-500 text-green-700 hover:bg-green-50"
                  >
                    読書のコツを見る
                  </el-button>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="relative z-10">
                <div
                  class="absolute -left-4 top-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold md:hidden"
                >
                  3
                </div>
                <div
                  class="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
                >
                  <div
                    class="hidden md:block absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold"
                  >
                    3
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">参加する</h3>
                  <p class="text-gray-600 mb-4">
                    現地またはオンラインで参加。自己紹介から始まり、和やかな雰囲気でディスカッションを行います。
                  </p>
                  <el-button
                    type="info"
                    size="small"
                    @click="$router.push('/contact')"
                    class="border-green-500 text-green-700 hover:bg-green-50"
                  >
                    会場について
                  </el-button>
                </div>
              </div>

              <!-- Step 4 -->
              <div class="relative z-10">
                <div
                  class="absolute -left-4 top-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold md:hidden"
                >
                  4
                </div>
                <div
                  class="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
                >
                  <div
                    class="hidden md:block absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold"
                  >
                    4
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">繋がる</h3>
                  <p class="text-gray-600 mb-4">
                    気の合う仲間ができたら、今後のイベントや自主的な読書グループに参加することもできます。
                  </p>
                  <el-button
                    type="info"
                    size="small"
                    @click="$router.push('/contact')"
                    class="border-green-500 text-green-700 hover:bg-green-50"
                  >
                    お問い合わせ
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white"
    >
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          今日から、読書のある人生を
        </h2>
        <p class="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          一人で読む本も素敵ですが、仲間と分かち合う本は、人生をさらに豊かにしてくれます。
        </p>
        <el-button
          type="primary"
          size="large"
          @click="$router.push('/schedule')"
          class="px-10 py-5 text-xl bg-white text-green-700 hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          今すぐ参加する
        </el-button>
        <p class="mt-6 text-green-100">
          初めての方は、初回参加費50%オフのキャンペーン中！
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const recentParticipants = ref([1, 2, 3, 4, 5]);
</script>

<style scoped>
.home-page {
  scroll-behavior: smooth;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(16, 185, 129, 0.1) 0%,
    transparent 70%
  );
  z-index: 0;
}

.bg-grid-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 4.968-5.697 5.994-8 14 2.303-8.006 4.686-9.032 8-14 2.21 0 4 1.79 4 4Z'/%3E%3Cpath d='M22 10c0-2.21-1.79-4-4-4-3.314 4.968-5.697 5.994-8 14 2.303-8.006 4.686-9.032 8-14 2.21 0 4 1.79 4 4Z'/%3E%3Cpath d='M34 10c0-2.21-1.79-4-4-4-3.314 4.968-5.697 5.994-8 14 2.303-8.006 4.686-9.032 8-14 2.21 0 4 1.79 4 4Z'/%3E%3Cpath d='M46 10c0-2.21-1.79-4-4-4-3.314 4.968-5.697 5.994-8 14 2.303-8.006 4.686-9.032 8-14 2.21 0 4 1.79 4 4Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
