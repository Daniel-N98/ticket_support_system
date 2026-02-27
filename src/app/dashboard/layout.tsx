export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="mt-4 md:mt-8">
      {children}
    </div>
  );
}