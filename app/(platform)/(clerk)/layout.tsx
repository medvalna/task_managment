const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen items-center align-middle justify-center flex-col">
      {children}
    </div>
  );
};

export default ClerkLayout;
