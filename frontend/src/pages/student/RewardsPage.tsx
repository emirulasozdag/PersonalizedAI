import { Trophy, Star, Award, Medal } from 'lucide-react';

export default function RewardsPage() {
  const points = 1250;
  
  return (
    <div>
      <div className="card bg-gradient-to-r from-yellow-400 to-orange-500 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold mb-1">Your Points</h1>
            <p className="text-yellow-100">Keep learning to earn more!</p>
          </div>
          <div className="text-4xl font-bold flex items-center gap-2">
            <Trophy className="w-10 h-10" />
            {points}
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Badges & Achievements</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Star, name: 'First Lesson', earned: true },
          { icon: Award, name: 'Week Warrior', earned: true },
          { icon: Medal, name: 'Quick Learner', earned: false },
          { icon: Trophy, name: 'Grammar Master', earned: false },
        ].map((badge, i) => (
          <div key={i} className={`card text-center ${!badge.earned && 'opacity-50'}`}>
            <badge.icon className={`w-12 h-12 mx-auto mb-2 ${badge.earned ? 'text-yellow-500' : 'text-gray-400'}`} />
            <p className="font-medium text-gray-900">{badge.name}</p>
            <p className="text-xs text-gray-500">{badge.earned ? 'Earned!' : 'Locked'}</p>
          </div>
        ))}
      </div>
      
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Leaderboard</h2>
      <div className="card">
        <p className="text-gray-500 text-center py-8">Leaderboard coming soon!</p>
      </div>
    </div>
  );
}
