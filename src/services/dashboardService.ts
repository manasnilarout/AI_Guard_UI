import { apiClient } from './api';
import { DashboardStats, ActivityItem, UsageTrend, ProviderStats } from '@/types/dashboard';

export const dashboardService = {
  async getDashboardStats(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>('/_api/dashboard/stats');
  },

  async getRecentActivity(limit: number = 10): Promise<ActivityItem[]> {
    return apiClient.get<ActivityItem[]>('/_api/dashboard/activity', { params: { limit } });
  },

  async getUsageTrend(days: number = 7): Promise<UsageTrend[]> {
    return apiClient.get<UsageTrend[]>('/_api/dashboard/usage-trend', { params: { days } });
  },

  async getProviderStats(): Promise<ProviderStats[]> {
    return apiClient.get<ProviderStats[]>('/_api/dashboard/provider-stats');
  },
};