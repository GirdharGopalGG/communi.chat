function MessagesLoadingSkeleton() {
  return (
    <div className="w-full mx-auto space-y-4 p-4">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"} animate-pulse-fast`}
        >
          <div className={`chat-bubble bg-slate-900/30 text-white w-32`}></div>
        </div>
      ))}
    </div>
  );
}
export default MessagesLoadingSkeleton;