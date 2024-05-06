import { userProfileApi } from '@/api/userProfileApi';
import { useAuthStore, type User } from '@/stores/authStore';
import { type ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProfileContextType {
  user: User | null;
  currentStep: number;
  isProfileCreationStepsOpen: boolean;
  profileCompleted: boolean;
  nextStep: () => void;
  completeProfile: () => void;
  setIsProfileCreationStepsOpen: (isOpen: boolean) => void;
  closeModal: () => void;
}

const defaultContextValue: UserProfileContextType = {
  user: null,
  currentStep: 0,
  isProfileCreationStepsOpen: false,
  profileCompleted: false,
  nextStep: () => {},
  completeProfile: () => {},
  setIsProfileCreationStepsOpen: () => {},
  closeModal: () => {},
};

export const UserProfileContext = createContext<UserProfileContextType>(defaultContextValue);

interface UserProfileProviderProps {
  children: ReactNode;
}

export const UserProfileProvider: React.FC<UserProfileProviderProps> = ({
  children,
}: UserProfileProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const userProfile = useAuthStore((state) => state.userProfile);
  const [currentStep, setCurrentStep] = useState(0);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [isProfileCreationStepsOpen, setIsProfileCreationStepsOpen] = useState(false);

  const { user: authUser } = useAuthStore();

  useEffect(() => {
    if (!user) {
      setUser(authUser);
    } else if (!authUser) {
      // Handle case where there is no user logged in
      navigate('/login');
    }
  }, [authUser, navigate, user]);

  const nextStep = () => {
    setCurrentStep((current) => current + 1);
  };

  const closeModal = () => {
    console.log('closeModal triggered');
    setIsProfileCreationStepsOpen(false);
    setProfileCompleted(false);
    navigate('/');
  };

  const completeProfile = () => {
    if (!userProfile || !user) throw new Error('User profile is not available.');
    userProfileApi
      .setUserProfileStatus(userProfile.id, true)
      .then(() => {
        setProfileCompleted(true);
        setIsProfileCreationStepsOpen(false);
        navigate('/profile');
      })
      .catch((error: unknown) => {
        setIsProfileCreationStepsOpen(true);
        setProfileCompleted(false);
        console.error('Failed to mark profile as completed:', error);
      });
  };

  return (
    <UserProfileContext.Provider
      value={{
        user,
        isProfileCreationStepsOpen,
        setIsProfileCreationStepsOpen,
        currentStep,
        nextStep,
        completeProfile,
        profileCompleted,
        closeModal,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
