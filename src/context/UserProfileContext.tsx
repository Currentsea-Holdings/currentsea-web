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
}

const defaultContextValue: UserProfileContextType = {
  user: null,
  currentStep: 0,
  isProfileCreationStepsOpen: false,
  profileCompleted: false,
  nextStep: () => {},
  completeProfile: () => {},
  setIsProfileCreationStepsOpen: () => {},
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
  }, [authUser, navigate]);
  

  const nextStep = () => {
    setCurrentStep((current) => current + 1);
  };

  const completeProfile = () => {
    setProfileCompleted(true);
    navigate('/');
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
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
