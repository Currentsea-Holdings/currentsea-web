export const ConnectSocialMediaAccountButton = ({
  text,
  onClick,
  isConnected,
  setIsConnected,
  codeParams,
  isAvailable,
  isDisabled,
}: {
  text: string;
  codeParams: string;
  onClick: () => void;
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
  setCodeParams: (value: string) => void;
  isAvailable: boolean;
  isDisabled: boolean;
}) => {
  return (
    <>
      {!isConnected ? (
        <button
          onClick={onClick}
          disabled={!isAvailable && isDisabled}
          className="h-9 w-40 cursor-pointer rounded-lg bg-primary text-sm text-white transition-colors duration-200 ease-in-out enabled:hover:opacity-90"
        >
          {text}
        </button>
      ) : (
        <h2 style={{ color: 'green', fontSize: '14px' }}>Connected!</h2>
      )}
    </>
  );
};
