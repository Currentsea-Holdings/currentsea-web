import { useState } from 'react';

import { CSButton } from '@/components';
import { DashboardLayout } from '@/layouts';

import { EditProfileForm } from './components/EditProfileForm';
import { ViewProfile } from './components/ViewProfile';

export const ProfileView = () => {
  const buttonStyle = {
    padding: '0px 6px',
  };

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const title = isEditing ? 'Edit Profile' : 'Profile';

  const buttons = isEditing ? (
    <>
      <CSButton
        style={buttonStyle}
        className="rounded-half mr-2 bg-primary font-semibold text-white"
        onClick={toggleEdit}
        disabled
      >
        Save
      </CSButton>
      <CSButton
        style={buttonStyle}
        outline
        className="rounded-half font-semibold text-dark"
        onClick={toggleEdit}
      >
        Cancel
      </CSButton>
    </>
  ) : (
    <CSButton
      style={buttonStyle}
      className="rounded-half bg-primary font-semibold text-white"
      onClick={toggleEdit}
    >
      Edit profile
    </CSButton>
  );

  const profileContent = isEditing ? <EditProfileForm toggleEdit={toggleEdit} /> : <ViewProfile />;

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
