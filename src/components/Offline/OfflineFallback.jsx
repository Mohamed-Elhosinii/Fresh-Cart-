export default function OfflineFallback() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="text-center space-y-4">
        <p className="text-3xl font-semibold text-red-500">You Are Offline</p>
        <p className="text-xl font-medium text-blue-500">Check The Internet</p>
      </div>
    </div>
  );
}
