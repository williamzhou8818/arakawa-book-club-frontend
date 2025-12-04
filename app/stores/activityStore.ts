import { defineStore } from 'pinia';

export interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  coverImage: string;
  participants: number;
  maxParticipants: number;
  isRegistered: boolean;
}

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: [] as Activity[],
    currentActivity: null as Activity | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchActivities() {
      this.loading = true;
      try {
        // 模拟API调用
        await new Promise((resolve) => setTimeout(resolve, 1000));

        this.activities = [
          {
            id: 1,
            title: '《百年孤独》读书分享会',
            description: '一起探讨马尔克斯的魔幻现实主义杰作，分享阅读心得。',
            date: '2025-12-15',
            time: '14:00-16:00',
            location: '城市书房·三里屯店',
            coverImage:
              'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            participants: 12,
            maxParticipants: 30,
            isRegistered: false,
          },
          {
            id: 2,
            title: '科幻小说创作工作坊',
            description:
              '邀请知名科幻作家分享创作经验，探讨未来科技与人文的碰撞。',
            date: '2025-12-20',
            time: '19:00-21:00',
            location: '创新大厦·会议中心',
            coverImage:
              'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            participants: 25,
            maxParticipants: 50,
            isRegistered: true,
          },
          {
            id: 3,
            title: '《红楼梦》诗词赏析',
            description: '深入解析《红楼梦》中的经典诗词，感受古典文学的魅力。',
            date: '2025-12-28',
            time: '10:00-12:00',
            location: '国学书院·东城分院',
            coverImage:
              'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            participants: 8,
            maxParticipants: 20,
            isRegistered: false,
          },
        ];
      } catch (error) {
        this.error = '获取活动列表失败';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async getActivityById(id: number) {
      this.loading = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const activity = this.activities.find((a) => a.id === id);
        if (activity) {
          this.currentActivity = { ...activity };
        } else {
          this.error = '活动不存在';
        }
      } catch (error) {
        this.error = '获取活动详情失败';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    registerForActivity(id: number) {
      const activity = this.activities.find((a) => a.id === id);
      if (activity && activity.participants < activity.maxParticipants) {
        activity.participants++;
        activity.isRegistered = true;
        // 模拟API调用
        console.log(`用户已报名活动: ${activity.title}`);
      }
    },
  },
});
