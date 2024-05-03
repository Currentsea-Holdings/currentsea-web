import { useEffect, useState } from 'react';
import { HiStar } from 'react-icons/hi';

import { userProfileApi } from '@/api/userProfileApi';
import { InstagramIcon } from '@/assets/icons';
import profilePic from '@/assets/images/authentication/agency.png';
import { CSButton } from '@/components';
import { useUserProfile } from '@/hooks/useUserProfile';
import { DashboardLayout } from '@/layouts';
import { getUserUserProfile } from '@/services/usersService';
import { useAuthStore } from '@/stores/authStore';
import { BASE_API_URL } from '@/utils/constants';
import { Highlights } from './Highlights';
import { EditProfileForm } from './EditProfileForm';

interface EditProfileProps {
  toggleEdit: () => void;
}

export const EditProfile = ({ toggleEdit }: EditProfileProps) => {
  const user = useAuthStore((state) => state.user);
  const setUserProfile = useAuthStore((state) => state.setUserProfile);
  const userProfile = useAuthStore((state) => state.userProfile);

  useEffect(() => {
    const fetchUserProfileData = async () => {
      const userProfileData = await getUserUserProfile(user?.id);
      setUserProfile(userProfileData);
    };
    fetchUserProfileData().catch((error: unknown) => {
      console.error(error);
    });
  }, []);

  const [selectedFileName, setSelectedFileName] = useState('No file chosen');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [image, setImage] = useState<string | undefined>();

  useEffect(() => {
    if (userProfile?.profilePicturePath) {
      setImagePreviewUrl(`${BASE_API_URL}/${userProfile.profilePicturePath}`);
      setImage(`${BASE_API_URL}/${userProfile.profilePicturePath}`);
      const pathSegments = userProfile.profilePicturePath.split('/');
      setSelectedFileName(pathSegments.pop() ?? 'No file chosen');
    }
  }, [userProfile?.profilePicturePath]);

  let firstName;
  let lastName;
  let city;
  let state;
  let shortBio;
  let industries;

  if (userProfile) {
    ({ firstName, lastName, city, state, shortBio, industries } = userProfile);
  }

  const buttonStyle = {
    padding: '0px 6px',
  };
  return (
    <div className="p-20">
      <div className="mb-20 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Profile</h1>
        <div className="flex-grow"></div>
        <div className="flex">
          {' '}
          <CSButton
            style={buttonStyle}
            className="rounded-half mr-2 bg-primary font-semibold text-white" // Added margin-right to separate the buttons
            onClick={toggleEdit}
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
        </div>
      </div>
      { user && <EditProfileForm user={user} /> }
    </div>
  );
};
