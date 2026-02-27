export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div
      className={`py-8 px-8 md:py-11 md:px-12`}
    >
      {children}
    </div>
  );
}