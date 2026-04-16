export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No dashboard sidebar — editor is full-screen
  return <>{children}</>;
}
