import styles from "@/styles/auth.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-screen bg-black flex justify-center p-7 items-center sm:justify-start sm:items-start sm:p-0">
      <div className="absolute inset-0 bg-cover bg-center z-0 bg-pan-zoom"></div>
      {/* <div className="absolute inset-0 bg-cover bg-center z-0 bg-pan-zoom"></div> */}
      <div className="bg-white h-full z-10 relative max-w-full min-w-96 p-16 sm:w-2/4">
        <div className="w-full h-full">
          <div className="logo-with-name">
            <img src="/images/neural-labs-logo.png" className="logo-sm"></img>
            <p className="logo-name">neural labs</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
