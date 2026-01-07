export function Error({
  error,
  fallback = "something went wrong",
}: {
  error: Error | null;
  fallback?: string;
}) {
  if (!error) {
    return null;
  }

  const errorMessage =
    error instanceof Error && error.message ? error.message : fallback;

  return (
    <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mb-4">
      <p className="font-semibold">Error</p>
      <p className="text-sm">{errorMessage}</p>
    </div>
  );
}
