import { ConnectSocialMediaAccountButton } from './ConnectSocialMediaAccountButton';

type SocialMediaConnectContainerProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  onClick: () => void;
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
  codeParams: string;
  setCodeParams: (vaue: string) => void;
  isAvailable: boolean;
};

export const SocialMediaConnectContainer: React.FC<SocialMediaConnectContainerProps> = ({
  Icon,
  name,
  codeParams,
  onClick,
  isConnected,
  setIsConnected,
  setCodeParams,
  isAvailable,
}: SocialMediaConnectContainerProps) => {
  return (
    <div
      className={`m-2 flex flex-col items-center justify-center rounded-lg border border-gray-200 p-4 ${
        !isAvailable ? 'opacity-50' : 'opacity-100'
      }`}
      style={{ width: '195px', height: '165px' }}
    >
      <Icon className="mb-2 h-10 w-10" />
      <div
        className="mb-4 text-sm"
        style={{ fontWeight: '700' }}
      >
        {name}
      </div>
      <ConnectSocialMediaAccountButton
        text={isAvailable ? 'Connect account' : 'Unavailable'}
        onClick={onClick}
        codeParams={codeParams}
        setCodeParams={setCodeParams}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
    </div>
  );
};
