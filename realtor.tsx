import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { MessageCircle, ChevronRight, LineChart, DollarSign, Home, Clock, Banknote, CalendarDays, PieChart, TrendingUp } from 'lucide-react';

const RealEstateDashboard = () => {
  const [currentPayment] = useState(2400);
  const [currentLoanBalance] = useState(343000);
  const [currentRate] = useState(3);
  const [activeScenario, setActiveScenario] = useState(null);
  const [values, setValues] = useState({
    purchasePrice: 600000,
    initialRent: 2400,
    leaseTermYears: 2,
    equitySplitPercent: 50,
    marketValue: 547000,
    inspectionCost: 0,
    showingCost: 0,
  });

  const scenarios = {
    subjectTo: {
      title: "Subject-To Purchase with Cash Out",
      description: "Maintain current loan while receiving immediate equity. Keep payments stable with structured rent increases.",
      values: {
        purchasePrice: 520000,
        initialRent: 2400,
        leaseTermYears: 2,
        equitySplitPercent: 0,
        marketValue: 520000,
      }
    },
    equityShare: {
      title: "Equity Share Partnership",
      description: "Lower initial investment with shared future appreciation. Reduced monthly payments through partnership structure.",
      values: {
        purchasePrice: 340000,
        initialRent: 2000,
        leaseTermYears: 3,
        equitySplitPercent: 50,
        marketValue: 520000,
      }
    }
  };

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, timestamp: new Date().toLocaleString() }]);
      setNewComment('');
    }
  };

  const activateScenario = (scenario) => {
    setActiveScenario(scenario);
    setValues(scenarios[scenario].values);
  };

  return (
    <div className="w-full max-w-5xl p-8 space-y-8 bg-gray-900">
      {/* Property Image Banner */}
      <div className="w-1/2 h-32 bg-gray-800 rounded-lg overflow-hidden mx-auto">
        <img 
          src="https://maps.googleapis.com/maps/api/streetview?location=8021+Cornell+Ave%2C+Saint+Louis%2C+MO+63130&size=1536x1152&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&&signature=6pd5wJXAwN5rOZNvgrsYXzCA8Xg=" 
          alt="8021 Cornell"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Property Details Card */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <div className="space-y-2">
            <h2 className="text-xl font-medium text-gray-400">8021 Cornell, St. Louis, MO, 63130</h2>
            <p className="text-gray-500">Traditional two-story brick colonial with black shutters, attached garage, and manicured front lawn. Features symmetrical windows, central white doorway with iron railing, and brick exterior. Located in University City neighborhood.</p>
          </div>
        </CardHeader>
      </Card>

      {/* Scenario Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <Card key={key} className={`bg-gray-800 border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/20 ${activeScenario === key ? 'ring-2 ring-blue-400' : ''}`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-100">{scenario.title}</h3>
                <button
                  onClick={() => activateScenario(key)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  Activate <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-400">{scenario.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard */}
      <Card className="border-0 shadow-xl bg-gray-800 border-gray-700">
        <CardContent className="p-8">
          <div className="space-y-8">
            {/* Current Property Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: DollarSign, label: 'Current Payment', value: `$${currentPayment.toLocaleString()}`, color: 'text-emerald-400' },
                { icon: Banknote, label: 'Loan Balance', value: `$${currentLoanBalance.toLocaleString()}`, color: 'text-purple-400' },
                { icon: Clock, label: 'Interest Rate', value: `${currentRate}% (30yr Fixed)`, color: 'text-yellow-400' },
                { icon: TrendingUp, label: 'Market Value Range', value: `$547k - $620k`, color: 'text-blue-400' }
              ].map((item, i) => (
                <div key={i} className="bg-gray-700/50 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <div className="text-sm text-gray-300 font-medium">{item.label}</div>
                  </div>
                  <div className="text-xl font-bold text-gray-100">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Interactive Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  {
                    label: 'Purchase Price',
                    value: values.purchasePrice,
                    min: 340000,
                    max: 600000,
                    step: 5000,
                    format: (v) => `$${v.toLocaleString()}`,
                    key: 'purchasePrice',
                    icon: Home,
                    color: 'text-pink-400'
                  },
                  {
                    label: 'Monthly Rent',
                    value: values.initialRent,
                    min: 1900,
                    max: 4500,
                    step: 100,
                    format: (v) => `$${v.toLocaleString()}`,
                    key: 'initialRent',
                    icon: DollarSign,
                    color: 'text-emerald-400'
                  }
                ].map((slider) => (
                  <div key={slider.key} className="bg-gray-700/50 p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <slider.icon className={`w-5 h-5 ${slider.color}`} />
                        <label className="text-sm font-medium text-gray-300">{slider.label}</label>
                      </div>
                      <span className="text-lg font-bold text-gray-100">
                        {slider.format(slider.value)}
                      </span>
                    </div>
                    <Slider
                      value={[slider.value]}
                      onValueChange={([v]) => setValues({...values, [slider.key]: v})}
                      min={slider.min}
                      max={slider.max}
                      step={slider.step}
                      className="mt-2"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                {[
                  {
                    label: 'Inspection Ready Cost',
                    value: values.inspectionCost,
                    min: 0,
                    max: 50000,
                    step: 1000,
                    format: (v) => `$${v.toLocaleString()}`,
                    key: 'inspectionCost',
                    icon: Home,
                    color: 'text-yellow-400'
                  },
                  {
                    label: 'Showing Ready Cost',
                    value: values.showingCost,
                    min: 0,
                    max: 50000,
                    step: 1000,
                    format: (v) => `$${v.toLocaleString()}`,
                    key: 'showingCost',
                    icon: Home,
                    color: 'text-teal-400'
                  },
                  {
                    label: 'Lease Term',
                    value: values.leaseTermYears,
                    min: 1,
                    max: 5,
                    step: 1,
                    format: (v) => `${v} Years`,
                    key: 'leaseTermYears',
                    icon: CalendarDays,
                    color: 'text-orange-400'
                  },
                  {
                    label: 'Equity Split',
                    value: values.equitySplitPercent,
                    min: 0,
                    max: 100,
                    step: 5,
                    format: (v) => `${v}%`,
                    key: 'equitySplitPercent',
                    icon: PieChart,
                    color: 'text-violet-400'
                  }
                ].map((slider) => (
                  <div key={slider.key} className="bg-gray-700/50 p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <slider.icon className={`w-5 h-5 ${slider.color}`} />
                        <label className="text-sm font-medium text-gray-300">{slider.label}</label>
                      </div>
                      <span className="text-lg font-bold text-gray-100">
                        {slider.format(slider.value)}
                      </span>
                    </div>
                    <Slider
                      value={[slider.value]}
                      onValueChange={([v]) => setValues({...values, [slider.key]: v})}
                      min={slider.min}
                      max={slider.max}
                      step={slider.step}
                      className="mt-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: 'Initial Equity',
                  value: `$${(values.purchasePrice - currentLoanBalance).toLocaleString()}`,
                  color: 'text-emerald-400',
                  bgColor: 'bg-emerald-400/10',
                  icon: LineChart
                },
                {
                  label: 'Monthly Change',
                  value: `$${(values.initialRent - currentPayment).toFixed(2)}`,
                  color: values.initialRent > currentPayment ? 'text-red-400' : 'text-emerald-400',
                  bgColor: values.initialRent > currentPayment ? 'bg-red-400/10' : 'bg-emerald-400/10',
                  icon: TrendingUp
                },
                {
                  label: 'Future Equity Share',
                  value: `$${((values.marketValue - values.purchasePrice) * (values.equitySplitPercent/100)).toLocaleString()}`,
                  color: 'text-blue-400',
                  bgColor: 'bg-blue-400/10',
                  icon: PieChart
                }
              ].map((item, i) => (
                <div key={i} className={`${item.bgColor} p-6 rounded-xl border border-gray-700`}>
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <div className="text-sm text-gray-300">{item.label}</div>
                  </div>
                  <div className={`text-2xl font-bold ${item.color}`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Comments Section */}
            <div className="bg-gray-700/50 p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-gray-100">Analysis Notes</h3>
              </div>
              <div className="flex gap-2 mb-4">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add analysis notes..."
                  className="flex-1 bg-gray-800 border-gray-600 text-gray-100"
                />
                <button
                  onClick={addComment}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Note
                </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {comments.map((comment, i) => (
                  <div key={i} className="p-3 bg-gray-800 rounded-lg">
                    <div className="text-xs text-gray-400">{comment.timestamp}</div>
                    <div className="text-gray-300 mt-1">{comment.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealEstateDashboard;

Version 20 of 20
