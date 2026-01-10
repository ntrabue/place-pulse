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
    <div className="mb-4 rounded-lg border border-destructive bg-destructive/10 px-4 py-3 text-destructive">
      <p className="font-semibold">Error</p>
      <p className="text-sm">{errorMessage}</p>
    </div>
  );
}
