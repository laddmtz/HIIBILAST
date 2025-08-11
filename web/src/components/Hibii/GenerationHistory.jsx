import { History, Trash2 } from "lucide-react";

const HistoryItem = ({ generation, onSelect, onDelete }) => (
  <div
    className="bg-[#0f0f1a]/80 border border-[#2a2a3e]/30 rounded-2xl p-4 hover:border-[#4f46e5]/50 transition-all cursor-pointer group relative"
    onClick={() => onSelect(generation)}
  >
    <div className="aspect-square bg-[#2a2a3e]/30 rounded-xl mb-3 overflow-hidden relative">
      <img
        src={generation.imageUrl}
        alt={generation.prompt}
        className="w-full h-full object-cover"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(generation.id);
        }}
        className="absolute top-2 right-2 bg-red-500/80 backdrop-blur-sm p-1.5 rounded-lg text-white opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all"
      >
        <Trash2 size={14} />
      </button>
    </div>
    <p className="text-white/80 text-sm font-medium truncate mb-1">
      {generation.prompt}
    </p>
    <div className="flex items-center justify-between text-xs">
      <p className="text-white/50">
        {generation.timestamp.toLocaleDateString()}
      </p>
      <span className="text-[#06b6d4] bg-[#06b6d4]/10 px-2 py-1 rounded-lg text-[10px] font-medium">
        {generation.model}
      </span>
    </div>
  </div>
);

const EmptyState = () => (
    <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-[#2a2a3e]/50 rounded-3xl p-8">
        <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-50">
            <History size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white/80 mb-2">
            No generations yet
            </h3>
            <p className="text-white/50">
            Create your first AI image to see it here
            </p>
        </div>
    </div>
);

const LoadingState = () => (
    <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-[#2a2a3e]/50 rounded-3xl p-8">
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#06b6d4] border-t-transparent"></div>
        <span className="ml-3 text-white/70">
          Loading generations...
        </span>
      </div>
    </div>
);

export default function GenerationHistory({
  isLoading,
  history,
  onSelect,
  onDelete,
}) {
    if(isLoading) {
        return <LoadingState />;
    }

    if (history.length === 0) {
        return <EmptyState />;
    }

  return (
    <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-[#2a2a3e]/50 rounded-3xl p-8">
       <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <History className="mr-3 text-[#06b6d4]" size={24} />
        Recent Generations
      </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {history.slice(0, 8).map((generation) => (
            <HistoryItem 
                key={generation.id} 
                generation={generation}
                onSelect={onSelect}
                onDelete={onDelete}
            />
            ))}
        </div>
    </div>
  );
}
