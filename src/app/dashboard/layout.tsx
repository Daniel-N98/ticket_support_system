export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen`}
    >
      {children}
    </div>
  );
}