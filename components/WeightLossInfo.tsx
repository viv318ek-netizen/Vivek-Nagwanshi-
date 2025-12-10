import React, { useState } from 'react';
import { Search, Scale, Flame, Utensils, BedDouble, Droplets, Dumbbell, Footprints, Salad, AlertOctagon, Brain } from 'lucide-react';

interface TipData {
  id: string;
  category: 'Nutrition' | 'Exercise' | 'Lifestyle' | 'Myth';
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const weightLossData: TipData[] = [
  {
    id: 'caloric-deficit',
    category: 'Nutrition',
    title: 'Caloric Deficit',
    description: 'To lose weight, you must consume fewer calories than you burn. This is the fundamental principle of weight loss, regardless of the specific diet method used.',
    icon: Scale,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'protein',
    category: 'Nutrition',
    title: 'Prioritize Protein',
    description: 'High-protein foods increase satiety (fullness) and help preserve muscle mass while losing fat. Aim for lean sources like chicken, fish, tofu, and legumes.',
    icon: Utensils,
    color: 'bg-emerald-100 text-emerald-600'
  },
  {
    id: 'strength-training',
    category: 'Exercise',
    title: 'Strength Training',
    description: 'Building muscle helps increase your resting metabolic rate (calories burned at rest). Try lifting weights or bodyweight exercises 2-3 times a week.',
    icon: Dumbbell,
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    id: 'neat',
    category: 'Exercise',
    title: 'Walk More (NEAT)',
    description: 'Non-Exercise Activity Thermogenesis (NEAT) accounts for significant calorie burn. Simple habits like taking the stairs, pacing, or standing more add up.',
    icon: Footprints,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 'sleep',
    category: 'Lifestyle',
    title: 'Quality Sleep',
    description: 'Lack of sleep disrupts hunger hormones (ghrelin and leptin), leading to increased cravings and appetite. Aim for 7-9 hours per night.',
    icon: BedDouble,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'hydration',
    category: 'Nutrition',
    title: 'Stay Hydrated',
    description: 'Drinking water before meals can reduce appetite. Replacing sugary drinks with water is one of the easiest ways to cut calories.',
    icon: Droplets,
    color: 'bg-cyan-100 text-cyan-600'
  },
  {
    id: 'volume-eating',
    category: 'Nutrition',
    title: 'Volume Eating',
    description: 'Eat low-calorie, high-volume foods like vegetables and fruits. You can eat a larger portion to feel physically full without overconsuming calories.',
    icon: Salad,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'mindful-eating',
    category: 'Lifestyle',
    title: 'Mindful Eating',
    description: 'Eat slowly and without distractions (like TV). It takes about 20 minutes for your brain to signal that you are full.',
    icon: Brain,
    color: 'bg-teal-100 text-teal-600'
  },
  {
    id: 'myth-spot-reduction',
    category: 'Myth',
    title: 'Myth: Spot Reduction',
    description: 'You cannot target fat loss in specific areas (like belly fat) by doing specific exercises (like crunches). Fat loss happens systematically across the body.',
    icon: AlertOctagon,
    color: 'bg-rose-100 text-rose-600'
  },
  {
    id: 'myth-starvation',
    category: 'Myth',
    title: 'Myth: Starvation Mode',
    description: 'Skipping meals or eating too little often leads to binging later, not "stopping" metabolism. However, moderate, sustainable deficits are better than crash diets.',
    icon: AlertOctagon,
    color: 'bg-rose-100 text-rose-600'
  },
  {
    id: 'fiber',
    category: 'Nutrition',
    title: 'Increase Fiber',
    description: 'Soluble fiber absorbs water and forms a gel that helps slow down food as it passes through your digestive system, helping you feel full.',
    icon: Salad,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'consistency',
    category: 'Lifestyle',
    title: 'Consistency > Perfection',
    description: 'One "bad" meal wont make you gain weight, just as one salad wont make you lose it. Long-term consistency is key.',
    icon: Flame,
    color: 'bg-amber-100 text-amber-600'
  }
];

const WeightLossInfo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Nutrition', 'Exercise', 'Lifestyle', 'Myth'];

  const filteredTips = weightLossData.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tip.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Weight Loss Guide</h1>
            <p className="text-slate-500 mt-1">Science-backed strategies for sustainable weight management.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
              placeholder="Search tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map((tip) => {
          const Icon = tip.icon;
          return (
            <div key={tip.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all group h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${tip.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                  tip.category === 'Myth' 
                    ? 'bg-rose-50 text-rose-600 border border-rose-100'
                    : 'bg-slate-50 text-slate-500 border border-slate-100'
                }`}>
                  {tip.category}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2">{tip.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                {tip.description}
              </p>
            </div>
          );
        })}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
            <Scale className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">No tips found</h3>
          <p className="text-slate-500 mt-1">Try adjusting your search or category.</p>
        </div>
      )}
    </div>
  );
};

export default WeightLossInfo;