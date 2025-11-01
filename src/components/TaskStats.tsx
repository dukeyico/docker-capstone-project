interface TaskStatsProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

export function TaskStats({ stats }: TaskStatsProps) {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center">
          <div className="text-2xl text-blue-600 mr-3">📊</div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center">
          <div className="text-2xl text-green-600 mr-3">✅</div>
          <div>
            <p className="text-sm font-medium text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center">
          <div className="text-2xl text-orange-600 mr-3">⏳</div>
          <div>
            <p className="text-sm font-medium text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center">
          <div className="text-2xl text-purple-600 mr-3">🎯</div>
          <div>
            <p className="text-sm font-medium text-gray-600">Progress</p>
            <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
