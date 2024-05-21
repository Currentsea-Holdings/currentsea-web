import { useRef, useState } from 'react';

import { CSButton } from '@/components';
import { DashboardLayout } from '@/layouts';
import { useAuthStore } from '@/stores/authStore';

import { EditProfileForm } from './components/EditProfileForm';
import { ViewProfile } from './components/ViewProfile';

import type { UpdateUserProfile, UserProfile } from '@/types';
import { useManageUserProfile } from '@/hooks/useManageUserProfile';

export const ProfileView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const userProfile = useAuthStore((state) => state.userProfile) as UserProfile;
  const formRef = useRef<HTMLFormElement>(null);

  const { saveUserProfile, isProcessing } = useManageUserProfile();

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (newProfileData: UpdateUserProfile, profilePicture: File | null) => {
    saveUserProfile(newProfileData, profilePicture, () => {
      setIsEditing(false);
    });
  };

  const title = isEditing ? 'Edit Profile' : 'Profile';

  const buttonStyle = {
    padding: '0px 6px',
  };

  const buttons = isEditing ? (
    <>
      <CSButton
        style={buttonStyle}
        className="rounded-half mr-2 bg-primary font-semibold text-white"
        onClick={() => {
          formRef.current?.requestSubmit();
        }}
        disabled={isProcessing}
      >
        Save
      </CSButton>
      <CSButton
        style={buttonStyle}
        outline
        className="rounded-half font-semibold text-dark"
        onClick={handleEditToggle}
      >
        Cancel
      </CSButton>
    </>
  ) : (
    <CSButton
      style={buttonStyle}
      className="rounded-half bg-primary font-semibold text-white"
      onClick={handleEditToggle}
    >
      Edit profile
    </CSButton>
  );

  const profileContent = isEditing ? (
    <EditProfileForm
      ref={formRef}
      userProfile={userProfile}
      handleSave={handleSave}
    />
  ) : (
    <ViewProfile userProfile={userProfile} />
  );

  return (
    <DashboardLayout>
      <div className="p-20">
        <div className="mb-20 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex">{buttons}</div>
        </div>
        {profileContent}
      </div>
    </DashboardLayout>
  );
};
