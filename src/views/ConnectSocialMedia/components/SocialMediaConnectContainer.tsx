import { ConnectSocialMediaAccountButton } from './ConnectSocialMediaAccountButton';

type SocialMediaConnectContainerProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  onClick: () => void; 
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
  codeParams: string;
  setCodeParams: (vaue: string) => void;
};

export const SocialMediaConnectContainer: React.FC<SocialMediaConnectContainerProps> = ({
  Icon,
  name,
  codeParams,
  onClick,
  isConnected,
  setIsConnected,
  setCodeParams,
}: SocialMediaConnectContainerProps) => {

  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 m-2"
      style={{ width: '195px', height: '165px' }}
    >
      <Icon className="w-10 h-10 mb-2" />
      <div className="text-sm mb-4" style={{fontWeight: '700'}}>{name}</div>
      <ConnectSocialMediaAccountButton
        text="Connect account"
        onClick={onClick}
        codeParams={codeParams}
        setCodeParams={setCodeParams}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
    </div>
  );
};
