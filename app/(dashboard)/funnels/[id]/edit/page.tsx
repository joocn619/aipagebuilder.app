export default function EditFunnelPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Funnel</h1>
      <p className="mt-2 text-muted-foreground">Funnel ID: {params.id}</p>
    </div>
  );
}
