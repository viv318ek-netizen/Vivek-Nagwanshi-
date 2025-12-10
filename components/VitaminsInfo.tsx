import React, { useState } from 'react';
import { Search, Pill, Droplet, Sun, Zap, Shield, Eye, Brain, Bone, Heart, Sparkles } from 'lucide-react';

interface VitaminData {
  id: string;
  name: string;
  aka: string;
  benefits: string;
  sources: string;
  deficiency: string;
  icon: React.ElementType;
  color: string;
}

const vitaminsData: VitaminData[] = [
  {
    id: 'vit-a',
    name: 'Vitamin A',
    aka: 'Retinol',
    benefits: 'Maintains healthy vision, immune system function, and skin health.',
    sources: 'Carrots, sweet potatoes, spinach, liver, eggs, milk.',
    deficiency: 'Night blindness, dry skin, frequent infections.',
    icon: Eye,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 'vit-b1',
    name: 'Vitamin B1',
    aka: 'Thiamine',
    benefits: 'Helps convert food into energy, essential for nerve function.',
    sources: 'Whole grains, pork, beans, nuts, seeds.',
    deficiency: 'Fatigue, nerve damage, muscle weakness (Beriberi).',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 'vit-b2',
    name: 'Vitamin B2',
    aka: 'Riboflavin',
    benefits: 'Energy production, cell function, and metabolism of fats.',
    sources: 'Eggs, organ meats, lean meats, milk, green vegetables.',
    deficiency: 'Cracked lips, sore throat, skin disorders.',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 'vit-b3',
    name: 'Vitamin B3',
    aka: 'Niacin',
    benefits: 'Supports DNA repair, skin health, and digestive system.',
    sources: 'Chicken, turkey, salmon, tuna, peanuts.',
    deficiency: 'Pellagra (dermatitis, dementia, diarrhea).',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 'vit-b5',
    name: 'Vitamin B5',
    aka: 'Pantothenic Acid',
    benefits: 'Essential for fatty acid metabolism and hormone production.',
    sources: 'Avocado, yogurt, mushrooms, chicken.',
    deficiency: 'Rare; fatigue, headache, numbness.',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 'vit-b6',
    name: 'Vitamin B6',
    aka: 'Pyridoxine',
    benefits: 'Brain development, mood regulation, hemoglobin production.',
    sources: 'Chickpeas, salmon, potatoes, bananas.',
    deficiency: 'Anemia, depression, confusion, weakened immune system.',
    icon: Brain,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'vit-b7',
    name: 'Vitamin B7',
    aka: 'Biotin',
    benefits: 'Metabolism of carbs/fats, healthy hair, skin, and nails.',
    sources: 'Sweet potatoes, eggs, almonds, onions.',
    deficiency: 'Hair loss, skin rashes, brittle nails.',
    icon: Sparkles,
    color: 'bg-pink-100 text-pink-600'
  },
  {
    id: 'vit-b9',
    name: 'Vitamin B9',
    aka: 'Folate / Folic Acid',
    benefits: 'Crucial for cell division and DNA synthesis (vital during pregnancy).',
    sources: 'Dark leafy greens, beans, peanuts, sunflower seeds.',
    deficiency: 'Fatigue, mouth sores, growth problems.',
    icon: Shield,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'vit-b12',
    name: 'Vitamin B12',
    aka: 'Cobalamin',
    benefits: 'Nerve tissue health, brain function, red blood cell formation.',
    sources: 'Meat, fish, dairy, eggs (mostly animal products).',
    deficiency: 'Anemia, neurological issues, fatigue.',
    icon: Brain,
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    id: 'vit-c',
    name: 'Vitamin C',
    aka: 'Ascorbic Acid',
    benefits: 'Antioxidant, collagen production, immune support, iron absorption.',
    sources: 'Oranges, strawberries, bell peppers, broccoli.',
    deficiency: 'Scurvy, bleeding gums, slow wound healing.',
    icon: Shield,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 'vit-d',
    name: 'Vitamin D',
    aka: 'Calciferol',
    benefits: 'Calcium absorption, bone health, immune function.',
    sources: 'Sunlight exposure, fatty fish, fortified dairy.',
    deficiency: 'Rickets (in children), bone pain, muscle weakness.',
    icon: Sun,
    color: 'bg-amber-100 text-amber-600'
  },
  {
    id: 'vit-e',
    name: 'Vitamin E',
    aka: 'Tocopherol',
    benefits: 'Antioxidant, protects cells from damage.',
    sources: 'Almonds, sunflower seeds, vegetable oils, leafy greens.',
    deficiency: 'Nerve and muscle damage, vision problems.',
    icon: Heart,
    color: 'bg-emerald-100 text-emerald-600'
  },
  {
    id: 'vit-k',
    name: 'Vitamin K',
    aka: 'Phylloquinone',
    benefits: 'Essential for blood clotting and bone metabolism.',
    sources: 'Kale, spinach, broccoli, brussels sprouts.',
    deficiency: 'Excessive bleeding, easy bruising.',
    icon: Droplet,
    color: 'bg-red-100 text-red-600'
  }
];

const VitaminsInfo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVitamins = vitaminsData.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.aka.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.benefits.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vitamin Information Guide</h1>
          <p className="text-slate-500 mt-1">A comprehensive guide to essential vitamins for your health.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
            placeholder="Search vitamins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVitamins.map((vitamin) => {
          const Icon = vitamin.icon;
          return (
            <div key={vitamin.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all group h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${vitamin.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                  {vitamin.aka}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2">{vitamin.name}</h3>
              
              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Benefits</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{vitamin.benefits}</p>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Best Sources</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{vitamin.sources}</p>
                </div>

                <div className="pt-2 border-t border-slate-50 mt-auto">
                   <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                     Deficiency Signs
                   </p>
                   <p className="text-xs text-rose-700/80 leading-relaxed bg-rose-50 p-2 rounded-lg">
                     {vitamin.deficiency}
                   </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVitamins.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
            <Pill className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">No vitamins found</h3>
          <p className="text-slate-500 mt-1">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
};

export default VitaminsInfo;