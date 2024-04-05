export const ConnectSocialMediaAccountButton = ({
  text,
  onClick,
  isConnected,
  setIsConnected,
}: {
  text: string;
  onClick: () => void;
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
}) => {
  return (
    <>
      {!isConnected ? (
        <button
          onClick={onClick}
          className="h-9 w-40 cursor-pointer rounded-lg bg-primary text-sm text-white transition-colors duration-200 ease-in-out enabled:hover:opacity-90"
        >
          {text}
        </button>
      ) : (
        <h2 style={{color: 'green', fontSize: '14px'}}>
          Connected!
        </h2>
      )}
    </>
  );
};
