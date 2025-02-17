export default function DashboardHeader({
  title,
}: {
  title: string | string[] | undefined;
}) {
  return (
    <div className="h-fit py-4 px-10 border-b border-gray-300">
      <h2 className="text-base font-semibold">{title}</h2>
    </div>
  );
}
