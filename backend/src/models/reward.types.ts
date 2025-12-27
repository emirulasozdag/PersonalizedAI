// =============================================================================
// Reward Types - Badges, points, achievements
// =============================================================================

import { RewardType } from './enums';

export interface Reward {
  id: string;
  type: RewardType;
  name: string;
  description: string;
  icon: string;
  pointValue: number;
  criteria: RewardCriteria;
  isActive: boolean;
  createdAt: Date;
}

export interface RewardCriteria {
  type: 'streak' | 'lessons_completed' | 'tests_passed' | 'score_threshold' | 'level_achieved' | 'custom';
  threshold: number;
  additionalConditions?: Record<string, any>;
}

export interface StudentReward {
  id: string;
  studentId: string;
  rewardId: string;
  earnedAt: Date;
  notified: boolean;
}

export interface PointTransaction {
  id: string;
  studentId: string;
  points: number;
  reason: string;
  sourceType: 'lesson' | 'exercise' | 'test' | 'streak' | 'reward' | 'bonus';
  sourceId?: string;
  createdAt: Date;
}

// DTOs
export interface StudentRewardsDTO {
  totalPoints: number;
  currentStreak: number;
  badges: {
    id: string;
    name: string;
    description: string;
    icon: string;
    earnedAt: Date;
  }[];
  recentPoints: PointTransaction[];
  availableRewards: Reward[];
}

export interface AwardRewardDTO {
  studentId: string;
  rewardId: string;
  notify: boolean;
}
