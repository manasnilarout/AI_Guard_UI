export interface DashboardStats {
  totalRequests: number;
  totalTokens: number;
  totalCost: number;
  activeProjects: number;
}

export interface ActivityItem {
  id: string;
  type: 'api_call' | 'project_created' | 'key_added' | 'member_invited' | 'error';
  title: string;
  description: string;
  timestamp: string;
  projectName?: string;
  severity?: 'info' | 'warning' | 'error' | 'success';
}

export interface UsageTrend {
  date: string;
  requests: number;
  cost: number;
  tokens: number;
}

export interface ProviderStats {
  provider: 'openai' | 'anthropic' | 'google';
  requests: number;
  cost: number;
  percentage: number;
}