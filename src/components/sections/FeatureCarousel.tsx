import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plug, Brain, TrendingUp } from 'lucide-react';
import stepConnectImg from '@/assets/step-connect.jpg';
import stepAiImg from '@/assets/step-ai-learns.jpg';
import stepSavingsImg from '@/assets/step-savings-new.jpg';

const steps = [
  {
    number: '01',
    icon: Plug,
    title: 'Connect in Minutes',
    description: 'Non-invasive installation on existing infrastructure. No rewiring. No downtime. Live in under 30 days.',
    details: ['Clamp-on sensors', 'WiFi connectivity', 'Zero disruption'],
    image: stepConnectImg,
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Learns & Optimizes',
    description: 'Advanced Monitoring technology disaggregates and tracks every load. Our AI builds a digital twin and identifies optimization opportunities.',
    details: ['Load disaggregation', 'Pattern recognition', 'Anomaly detection'],
    image: stepAiImg,
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Savings Compound',
    description: 'Autonomous actions eliminate waste 24/7. Watch savings grow month over month with detailed analytics.',
    details: ['Real-time actions', 'Continuous learning', 'Monthly reports'],
    image: stepSavingsImg,
  },
];

const FeatureCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const AUTO_ADVANCE_MS = 6000;

  useEffect(() => {
    if (isPaused) {
      return;
    }
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((s) => (s + 1) % steps.length);
          return 0;
        }
        return prev + 100 / (AUTO_ADVANCE_MS / 50);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused, activeStep]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setProgress(0);
  };

  const StepIcon = steps[activeStep].icon;

  return (
    <div
      className="max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Step tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 ${
                activeStep === index
                  ? 'bg-primary/10 border-2 border-primary/40 shadow-md'
                  : 'bg-card border border-border/50 hover:border-primary/20'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  activeStep === index
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`hidden sm:block text-sm font-medium transition-colors ${
                  activeStep === index ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress bars */}
      <div className="flex gap-2 mb-8">
        {steps.map((_, index) => (
          <div key={index} className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              animate={{
                width:
                  activeStep === index
                    ? `${progress}%`
                    : activeStep > index
                    ? '100%'
                    : '0%',
              }}
              transition={{ duration: activeStep === index ? 0.05 : 0.3 }}
            />
          </div>
        ))}
      </div>

      {/* Content area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl font-bold text-primary/15">
                {steps[activeStep].number}
              </span>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-teal)]">
                <StepIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              {steps[activeStep].title}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {steps[activeStep].description}
            </p>
            <ul className="space-y-2">
              {steps[activeStep].details.map((detail, i) => (
                <motion.li
                  key={detail}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {detail}
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            className="relative rounded-2xl overflow-hidden border border-primary/10"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={steps[activeStep].image}
              alt={steps[activeStep].title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <h4 className="text-lg font-semibold text-foreground mb-1">
                {steps[activeStep].title}
              </h4>
              <p className="text-sm text-muted-foreground">
                Step {activeStep + 1} of {steps.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FeatureCarousel;
