export * from '@/api/types';
import type {
  UpdateUserProfileDto,
  CreateUserProfileDto,
  UserProfile as IUserProfile,
  Industry,
  CreateUserDto,
  RateDto,
  CampaignStage,
  CampaignType,
} from '@/api/types';

export type UserType = 'Creator' | 'Agency' | 'Brand';
export interface User {
  id: string;
  email: string;
  userType?: UserType;
  emailVerified: boolean;
}

export interface CreateUser extends CreateUserDto {}


export type { CreateUserProfileDto as CreateUserProfile };


export interface Rate extends RateDto {
  type: string;
  rate: string;
  platform: string;
}

export interface UserProfile extends Omit<IUserProfile, 'industries'> {
  industries?: Industry[];
  rates: Rate[];
}

export interface UpdateUserProfile extends UpdateUserProfileDto {
  id: string;
}

export interface UploadProfilePicture {
  id: string;
  profilePicture?: File | null;
}

export interface CampaignFormData {
  campaignDetails: {
    name: string;
    startDate: Date | null;
    endDate: Date | null;
    applicationDueDate: Date | null;
    description: string;
    coverPhoto?: string;
    minComp: number;
    maxComp: number;
    stage: CampaignStage;
    type: CampaignType | undefined;
  }
}