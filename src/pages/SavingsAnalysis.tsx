 import { useState } from 'react';
 import { motion } from 'framer-motion';
 import { Link } from 'react-router-dom';
 import { Upload, FileText, CheckCircle, AlertTriangle, Building2, Zap, TrendingDown, Shield, Info, ChevronRight, Gauge, Clock, Battery, Receipt } from 'lucide-react';
 import Layout from '@/components/layout/Layout';
 import ParticleBackground from '@/components/animations/ParticleBackground';
 import { Button } from '@/components/ui/button';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Label } from '@/components/ui/label';
 import { Input } from '@/components/ui/input';
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
 
 interface BillData {
   contractDemand: string;
   billingDemand: string;
   totalUnits: string;
   energyCharges: string;
   demandCharges: string;
   todCharges: string;
   powerFactor: string;
   fuelAdjustmentCost: string;
   totalBillAmount: string;
 }
 
 interface AnalysisResult {
   healthScore: number;
   confidenceLevel: 'High' | 'Medium' | 'Low';
   savingsRange: { min: number; max: number };
   riskFlags: string[];
   recommendations: string[];
   demandAnalysis: string;
   todAnalysis: string;
   pfAnalysis: string;
 }
 
 const SavingsAnalysis = () => {
   const [step, setStep] = useState<'upload' | 'details' | 'confirm' | 'results'>('upload');
   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
   const [state] = useState('Maharashtra');
   const [discom] = useState('MSEDCL');
   const [tariffCategory, setTariffCategory] = useState('');
   const [billData, setBillData] = useState<BillData>({
     contractDemand: '',
     billingDemand: '',
     totalUnits: '',
     energyCharges: '',
     demandCharges: '',
     todCharges: '',
     powerFactor: '',
     fuelAdjustmentCost: '',
     totalBillAmount: '',
   });
   const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
   const [isAnalyzing, setIsAnalyzing] = useState(false);
 
   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (file) {
       setUploadedFile(file);
       // Simulate AI extraction with demo values
       setTimeout(() => {
         setBillData({
           contractDemand: '150',
           billingDemand: '98',
           totalUnits: '45000',
           energyCharges: '315000',
           demandCharges: '44100',
           todCharges: '18500',
           powerFactor: '0.89',
           fuelAdjustmentCost: '12500',
           totalBillAmount: '425600',
         });
         setStep('details');
       }, 1500);
     }
   };
 
   const handleInputChange = (field: keyof BillData, value: string) => {
     setBillData(prev => ({ ...prev, [field]: value }));
   };
 
   const proceedToConfirm = () => {
     if (tariffCategory) {
       setStep('confirm');
     }
   };
 
   const runAnalysis = () => {
     setIsAnalyzing(true);
     // Simulate analysis
     setTimeout(() => {
       const contractDemand = parseFloat(billData.contractDemand) || 0;
       const billingDemand = parseFloat(billData.billingDemand) || 0;
       const pf = parseFloat(billData.powerFactor) || 0;
       const todCharges = parseFloat(billData.todCharges) || 0;
       const totalBill = parseFloat(billData.totalBillAmount) || 0;
 
       // Calculate health score based on various factors
       let score = 100;
       const riskFlags: string[] = [];
       const recommendations: string[] = [];
 
       // Demand analysis - MSEDCL specific
       const fortyPercentRule = contractDemand * 0.4;
       const demandRatio = billingDemand / contractDemand;
       let demandAnalysis = '';
 
       if (billingDemand <= fortyPercentRule * 1.1) {
         // Billing demand driven by 40% rule
         score -= 15;
         demandAnalysis = `Your billing demand (${billingDemand} kVA) appears to be driven by the 40% of Contract Demand rule. This suggests your actual recorded demand may be lower than necessary. Contract demand rationalization could be explored, though approval is subject to MSEDCL review.`;
         riskFlags.push('Contract demand may be oversized for actual usage');
         recommendations.push('Evaluate contract demand rationalization with MSEDCL - potential to reduce fixed demand charges');
       } else if (demandRatio > 0.85) {
         demandAnalysis = `Your billing demand (${billingDemand} kVA) is close to your contract demand (${contractDemand} kVA), which is typical for well-sized connections. No immediate demand-side concern identified.`;
       } else {
         demandAnalysis = `Your billing demand utilizes ${Math.round(demandRatio * 100)}% of contract demand. Current sizing appears reasonable.`;
       }
 
       // TOD analysis
       const todPercentage = (todCharges / totalBill) * 100;
       let todAnalysis = '';
 
       if (todPercentage > 5) {
         score -= 10;
         todAnalysis = `TOD charges represent ${todPercentage.toFixed(1)}% of your bill. The 18:00–22:00 peak window carries penalty rates. Consider: (1) Pre-cooling before 18:00, (2) Staggering HVAC/pump operations, (3) Rescheduling flexible loads. Actual feasibility depends on operations and occupancy patterns.`;
         riskFlags.push('Significant peak-hour (TOD) exposure detected');
         recommendations.push('Review operations during 18:00–22:00 peak window for load-shifting opportunities');
       } else {
         todAnalysis = `TOD charges are ${todPercentage.toFixed(1)}% of total bill - within acceptable range. Current peak-hour management appears adequate.`;
       }
 
       // Power factor analysis
       let pfAnalysis = '';
 
       if (pf >= 0.92) {
         pfAnalysis = `Power factor of ${pf} is acceptable (≥0.92 threshold). No immediate correction needed.`;
       } else if (pf >= 0.85) {
         score -= 10;
         pfAnalysis = `Power factor of ${pf} is below the 0.92 threshold, likely incurring penalty charges. Consider: (1) HVAC/pump motor inspection for degradation, (2) Component health checks, (3) APFC panel evaluation. Root cause analysis recommended before major investment.`;
         riskFlags.push('Power factor below optimal threshold (0.92)');
         recommendations.push('Investigate power factor degradation causes before considering APFC installation');
       } else {
         score -= 20;
         pfAnalysis = `Power factor of ${pf} is significantly below threshold, incurring substantial penalties. Immediate investigation recommended - check motor health, cable conditions, and loading patterns.`;
         riskFlags.push('Critical: Power factor significantly below threshold');
         recommendations.push('Urgent: Conduct power factor root cause analysis and remediation');
       }
 
       // Calculate savings range (conservative)
       const savingsMin = Math.round(totalBill * 0.08);
       const savingsMax = Math.round(totalBill * 0.18);
 
       setAnalysisResult({
         healthScore: Math.max(40, score),
         confidenceLevel: uploadedFile?.type === 'application/pdf' ? 'High' : 'Medium',
         savingsRange: { min: savingsMin, max: savingsMax },
         riskFlags,
         recommendations: recommendations.length > 0 ? recommendations : ['Current bill parameters appear well-optimized. Continue monitoring for seasonal variations.'],
         demandAnalysis,
         todAnalysis,
         pfAnalysis,
       });
       setIsAnalyzing(false);
       setStep('results');
     }, 2500);
   };
 
   const formatCurrency = (value: number) => {
     return new Intl.NumberFormat('en-IN', {
       style: 'currency',
       currency: 'INR',
       maximumFractionDigits: 0,
     }).format(value);
   };
 
   const scopeItems = [
     { icon: CheckCircle, text: 'Built for Maharashtra (MSEDCL)', highlight: true },
     { icon: CheckCircle, text: 'Commercial LT-II A / B / C', highlight: true },
     { icon: Shield, text: 'AI-assisted, consultant-reviewed logic', highlight: true },
     { icon: AlertTriangle, text: 'Other DISCOMs coming soon', highlight: false },
   ];
 
   return (
     <Layout>
       {/* Hero Section */}
       <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-light to-accent">
         <ParticleBackground color="white" density="medium" />
         <div className="container-custom relative z-10 text-center px-4 pt-24 pb-16">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
           >
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
               Understand Your Electricity Bill.
               <br />
               <span className="text-white/90">Before You Automate It.</span>
             </h1>
             <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-4">
               Upload your electricity bill and get a consultant-grade savings analysis — focused on demand charges, peak-hour penalties, power factor health, and tariff alignment.
             </p>
             <p className="text-sm text-white/70 mb-8">
               Optimized for Maharashtra commercial connections. Other states coming soon.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button
                 size="lg"
                 className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                 onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
               >
                 Analyze My Bill
                 <ChevronRight className="ml-2 w-5 h-5" />
               </Button>
               <Button
                 size="lg"
                 variant="outline"
                 className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg"
                 asChild
               >
                 <Link to="/product">Learn About Neev</Link>
               </Button>
             </div>
           </motion.div>
         </div>
       </section>
 
       {/* Scope & Trust Strip */}
       <section className="relative py-8 bg-muted overflow-hidden">
         <ParticleBackground color="teal" density="low" />
         <div className="container-custom relative z-10 px-4">
           <div className="flex flex-wrap justify-center gap-4 md:gap-8">
             {scopeItems.map((item, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.1 }}
                 className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                   item.highlight 
                     ? 'bg-primary/10 text-primary' 
                     : 'bg-amber-100 text-amber-700'
                 }`}
               >
                 <item.icon className="w-4 h-4" />
                 <span className="text-sm font-medium">{item.text}</span>
               </motion.div>
             ))}
           </div>
           <p className="text-center text-muted-foreground text-sm mt-4 max-w-2xl mx-auto">
             This analysis is currently optimized for Maharashtra commercial tariffs. Accuracy for other states will improve as we expand.
           </p>
         </div>
       </section>
 
       {/* Main Analysis Section */}
       <section id="upload-section" className="relative py-16 md:py-24 overflow-hidden">
         <ParticleBackground color="teal" density="low" />
         <div className="container-custom relative z-10 px-4">
           {/* Step Indicators */}
           <div className="flex justify-center mb-12">
             <div className="flex items-center gap-2 md:gap-4">
               {['Upload', 'Details', 'Confirm', 'Results'].map((label, index) => {
                 const stepIndex = ['upload', 'details', 'confirm', 'results'].indexOf(step);
                 const isActive = index <= stepIndex;
                 const isCurrent = index === stepIndex;
                 return (
                   <div key={label} className="flex items-center">
                     <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all ${
                       isActive ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                     } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}>
                       {index + 1}
                     </div>
                     <span className={`hidden sm:block ml-2 text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                       {label}
                     </span>
                     {index < 3 && (
                       <div className={`w-8 md:w-16 h-0.5 mx-2 ${index < stepIndex ? 'bg-primary' : 'bg-muted'}`} />
                     )}
                   </div>
                 );
               })}
             </div>
           </div>
 
           {/* Step 1: Upload */}
           {step === 'upload' && (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="max-w-2xl mx-auto"
             >
               <Card className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors">
                 <CardContent className="p-8">
                   <label htmlFor="bill-upload" className="cursor-pointer block text-center">
                     <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                       <Upload className="w-10 h-10 text-primary" />
                     </div>
                     <h3 className="text-xl font-semibold mb-2">Upload Your Electricity Bill</h3>
                     <p className="text-muted-foreground mb-4">
                       Drag and drop or click to upload
                     </p>
                     <div className="flex items-center justify-center gap-4 text-sm">
                       <span className="flex items-center gap-1 text-primary">
                         <FileText className="w-4 h-4" /> PDF (recommended)
                       </span>
                       <span className="flex items-center gap-1 text-muted-foreground">
                         <FileText className="w-4 h-4" /> Image (allowed)
                       </span>
                     </div>
                     <input
                       id="bill-upload"
                       type="file"
                       accept=".pdf,image/*"
                       className="hidden"
                       onChange={handleFileUpload}
                     />
                   </label>
                   <p className="text-xs text-center text-muted-foreground mt-6">
                     For best accuracy, upload the original PDF electricity bill. Images may require confirmation.
                   </p>
                 </CardContent>
               </Card>
             </motion.div>
           )}
 
           {/* Step 2: Connection Details */}
           {step === 'details' && (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="max-w-4xl mx-auto"
             >
               <Card>
                 <CardHeader>
                   <CardTitle className="flex items-center gap-2">
                     <Building2 className="w-5 h-5 text-primary" />
                     Connection Details
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                   {/* Uploaded file indicator */}
                   <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                     <FileText className="w-5 h-5 text-primary" />
                     <span className="text-sm">{uploadedFile?.name}</span>
                     <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                   </div>
 
                   {/* Dropdowns */}
                   <div className="grid md:grid-cols-3 gap-4">
                     <div>
                       <Label>State</Label>
                       <Select value={state} disabled>
                         <SelectTrigger className="bg-background">
                           <SelectValue />
                         </SelectTrigger>
                         <SelectContent className="bg-background border shadow-lg z-50">
                           <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
                     <div>
                       <Label>DISCOM</Label>
                       <Select value={discom} disabled>
                         <SelectTrigger className="bg-background">
                           <SelectValue />
                         </SelectTrigger>
                         <SelectContent className="bg-background border shadow-lg z-50">
                           <SelectItem value="MSEDCL">MSEDCL</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
                     <div>
                       <Label>Tariff Category</Label>
                       <Select value={tariffCategory} onValueChange={setTariffCategory}>
                         <SelectTrigger className="bg-background">
                           <SelectValue placeholder="Select tariff" />
                         </SelectTrigger>
                         <SelectContent className="bg-background border shadow-lg z-50">
                           <SelectItem value="LT-II-A">LT-II A (Commercial)</SelectItem>
                           <SelectItem value="LT-II-B">LT-II B (Commercial)</SelectItem>
                           <SelectItem value="LT-II-C">LT-II C (Commercial)</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
                   </div>
                   <p className="text-xs text-muted-foreground">Other states and DISCOMs coming soon.</p>
 
                   {/* AI-extracted values */}
                   <div className="border-t pt-6">
                     <div className="flex items-start gap-2 mb-4 p-3 bg-amber-50 rounded-lg">
                       <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                       <p className="text-sm text-amber-800">
                         AI has pre-filled values from your bill. Please verify or correct them before analysis. <strong>Accuracy &gt; automation.</strong>
                       </p>
                     </div>
 
                     <div className="grid md:grid-cols-3 gap-4">
                       <div>
                         <Label>Contract Demand (kVA)</Label>
                         <Input
                           value={billData.contractDemand}
                           onChange={(e) => handleInputChange('contractDemand', e.target.value)}
                           className="bg-background"
                         />
                       </div>
                       <div>
                         <Label>Billing / Maximum Demand (kVA)</Label>
                         <Input
                           value={billData.billingDemand}
                           onChange={(e) => handleInputChange('billingDemand', e.target.value)}
                           className="bg-background"
                         />
                       </div>
                       <div>
                         <Label>Total Units Consumed</Label>
                         <Input
                           value={billData.totalUnits}
                           onChange={(e) => handleInputChange('totalUnits', e.target.value)}
                           className="bg-background"
                         />
                       </div>
                       <div>
                         <Label>Energy Charges (₹)</Label>
                         <Input
                           value={billData.energyCharges}
                           onChange={(e) => handleInputChange('energyCharges', e.target.value)}
                           className="bg-background"
                         />
                       </div>
                       <div>
                         <Label>Demand Charges (₹)</Label>
                         <Input
                           value={billData.demandCharges}
                           onChange={(e) => handleInputChange('demandCharges', e.target.value)}
                           className="bg-background"
                         />
                       </div>
                       <div>
                         <Label>TOD Charges (₹)</Label>
                         <Input
                           value={billData.todCharges}
                           onChange={(e) => handleInputChange('todCharges', e.target.value)}
                           className="bg-background"
                         />
                       </div>
                       <div>
                         <Label>Power Factor</Label>
                         <Input
                           value={billData.powerFactor}
                           onChange={(e) => handleInputChange('powerFactor', e.target.value)}
                           className="bg-background"
                         />
                       </div>
                       <div>
                         <Label>Fuel Adjustment Cost (₹)</Label>
                         <Input
                           value={billData.fuelAdjustmentCost}
                           onChange={(e) => handleInputChange('fuelAdjustmentCost', e.target.value)}
                           className="bg-background"
                         />
                       </div>
                       <div>
                         <Label>Total Bill Amount (₹)</Label>
                         <Input
                           value={billData.totalBillAmount}
                           onChange={(e) => handleInputChange('totalBillAmount', e.target.value)}
                           className="bg-background"
                         />
                       </div>
                     </div>
                   </div>
 
                   <div className="flex justify-end pt-4">
                     <Button
                       onClick={proceedToConfirm}
                       disabled={!tariffCategory}
                       className="btn-primary"
                     >
                       Continue to Review
                       <ChevronRight className="ml-2 w-4 h-4" />
                     </Button>
                   </div>
                 </CardContent>
               </Card>
             </motion.div>
           )}
 
           {/* Step 3: Confirm */}
           {step === 'confirm' && (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="max-w-3xl mx-auto"
             >
               <Card>
                 <CardHeader>
                   <CardTitle>Review Your Information</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6">
                   <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-3">
                       <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Connection</h4>
                       <div className="space-y-2">
                         <div className="flex justify-between py-2 border-b">
                           <span className="text-muted-foreground">State</span>
                           <span className="font-medium">{state}</span>
                         </div>
                         <div className="flex justify-between py-2 border-b">
                           <span className="text-muted-foreground">DISCOM</span>
                           <span className="font-medium">{discom}</span>
                         </div>
                         <div className="flex justify-between py-2 border-b">
                           <span className="text-muted-foreground">Tariff</span>
                           <span className="font-medium">{tariffCategory}</span>
                         </div>
                       </div>
                     </div>
                     <div className="space-y-3">
                       <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Bill Summary</h4>
                       <div className="space-y-2">
                         <div className="flex justify-between py-2 border-b">
                           <span className="text-muted-foreground">Contract Demand</span>
                           <span className="font-medium">{billData.contractDemand} kVA</span>
                         </div>
                         <div className="flex justify-between py-2 border-b">
                           <span className="text-muted-foreground">Power Factor</span>
                           <span className="font-medium">{billData.powerFactor}</span>
                         </div>
                         <div className="flex justify-between py-2 border-b">
                           <span className="text-muted-foreground">Total Bill</span>
                           <span className="font-medium">₹{parseInt(billData.totalBillAmount).toLocaleString('en-IN')}</span>
                         </div>
                       </div>
                     </div>
                   </div>
 
                   <div className="flex gap-4 pt-4">
                     <Button variant="outline" onClick={() => setStep('details')}>
                       Back to Edit
                     </Button>
                     <Button onClick={runAnalysis} className="btn-primary flex-1">
                       {isAnalyzing ? (
                         <>
                           <motion.div
                             animate={{ rotate: 360 }}
                             transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                             className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                           />
                           Analyzing...
                         </>
                       ) : (
                         <>
                           <Zap className="mr-2 w-5 h-5" />
                           Run Analysis
                         </>
                       )}
                     </Button>
                   </div>
                 </CardContent>
               </Card>
             </motion.div>
           )}
 
           {/* Step 4: Results */}
           {step === 'results' && analysisResult && (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="max-w-5xl mx-auto space-y-8"
             >
               {/* Health Score Card */}
               <Card className="overflow-hidden">
                 <div className="bg-gradient-to-r from-primary via-primary-light to-accent p-8 text-white">
                   <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                     <div className="text-center md:text-left">
                       <p className="text-white/80 mb-2">Bill Health Score</p>
                       <div className="flex items-baseline gap-2">
                         <span className="text-6xl font-bold">{analysisResult.healthScore}</span>
                         <span className="text-2xl text-white/80">/ 100</span>
                       </div>
                       <p className="text-sm text-white/70 mt-2">
                         Based on demand efficiency, TOD exposure, power factor health, and tariff alignment.
                       </p>
                     </div>
                     <div className="text-center md:text-right">
                       <p className="text-white/80 mb-2">Estimated Monthly Savings Potential</p>
                       <p className="text-3xl font-bold">
                         {formatCurrency(analysisResult.savingsRange.min)} – {formatCurrency(analysisResult.savingsRange.max)}
                       </p>
                       <div className="flex items-center justify-center md:justify-end gap-2 mt-2">
                         <span className={`px-2 py-1 rounded text-xs font-medium ${
                           analysisResult.confidenceLevel === 'High' ? 'bg-white/20' :
                           analysisResult.confidenceLevel === 'Medium' ? 'bg-amber-400/30' : 'bg-red-400/30'
                         }`}>
                           Confidence: {analysisResult.confidenceLevel}
                         </span>
                       </div>
                     </div>
                   </div>
                 </div>
               </Card>
 
               {/* Risk Flags */}
               {analysisResult.riskFlags.length > 0 && (
                 <Card>
                   <CardHeader>
                     <CardTitle className="flex items-center gap-2 text-amber-600">
                       <AlertTriangle className="w-5 h-5" />
                       Key Risk Flags
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <ul className="space-y-2">
                       {analysisResult.riskFlags.map((flag, index) => (
                         <li key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                           <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                           <span className="text-sm">{flag}</span>
                         </li>
                       ))}
                     </ul>
                   </CardContent>
                 </Card>
               )}
 
               {/* Detailed Analysis */}
               <div className="grid md:grid-cols-3 gap-6">
                 <Card>
                   <CardHeader className="pb-3">
                     <CardTitle className="flex items-center gap-2 text-lg">
                       <Gauge className="w-5 h-5 text-primary" />
                       Demand Analysis
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <p className="text-sm text-muted-foreground">{analysisResult.demandAnalysis}</p>
                   </CardContent>
                 </Card>
 
                 <Card>
                   <CardHeader className="pb-3">
                     <CardTitle className="flex items-center gap-2 text-lg">
                       <Clock className="w-5 h-5 text-primary" />
                       TOD Analysis
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <p className="text-sm text-muted-foreground">{analysisResult.todAnalysis}</p>
                   </CardContent>
                 </Card>
 
                 <Card>
                   <CardHeader className="pb-3">
                     <CardTitle className="flex items-center gap-2 text-lg">
                       <Battery className="w-5 h-5 text-primary" />
                       Power Factor Analysis
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <p className="text-sm text-muted-foreground">{analysisResult.pfAnalysis}</p>
                   </CardContent>
                 </Card>
               </div>
 
               {/* Recommendations */}
               <Card>
                 <CardHeader>
                   <CardTitle className="flex items-center gap-2">
                     <TrendingDown className="w-5 h-5 text-primary" />
                     Top Recommendations
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <ul className="space-y-3">
                     {analysisResult.recommendations.map((rec, index) => (
                       <li key={index} className="flex items-start gap-3">
                         <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold shrink-0">
                           {index + 1}
                         </div>
                         <span>{rec}</span>
                       </li>
                     ))}
                   </ul>
                 </CardContent>
               </Card>
 
               {/* Disclaimer */}
               <Card className="bg-muted/50 border-muted">
                 <CardContent className="p-6">
                   <div className="flex items-start gap-3">
                     <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                     <div className="text-sm text-muted-foreground">
                       <p className="mb-3">
                         This is an AI-assisted analysis based on the uploaded bill and confirmed inputs. Actual savings depend on operational changes, approvals, and on-ground implementation.
                       </p>
                       <p className="font-medium text-foreground">
                         For actual bill reduction and autonomous control, explore <Link to="/product" className="text-primary hover:underline">Neev</Link> — Anvaya's AI Electricity Operator.
                       </p>
                     </div>
                   </div>
                 </CardContent>
               </Card>
 
               {/* Restart */}
               <div className="text-center">
                 <Button variant="outline" onClick={() => {
                   setStep('upload');
                   setUploadedFile(null);
                   setBillData({
                     contractDemand: '',
                     billingDemand: '',
                     totalUnits: '',
                     energyCharges: '',
                     demandCharges: '',
                     todCharges: '',
                     powerFactor: '',
                     fuelAdjustmentCost: '',
                     totalBillAmount: '',
                   });
                   setAnalysisResult(null);
                   setTariffCategory('');
                 }}>
                   <Receipt className="mr-2 w-4 h-4" />
                   Analyze Another Bill
                 </Button>
               </div>
             </motion.div>
           )}
         </div>
       </section>
 
       {/* Final CTA Section */}
       <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-accent">
         <ParticleBackground color="white" density="medium" />
         <div className="container-custom relative z-10 text-center px-4">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
               This Analysis Shows Where.
             </h2>
             <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-8">
               Neev Decides How.
             </h2>
             <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
               Move from insights to action. Let Neev autonomously optimize your building's energy consumption 24/7.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button
                 size="lg"
                 className="bg-white text-primary hover:bg-white/90 font-semibold px-10 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                 asChild
               >
                 <Link to="/pilot-program">Join Pilot Program</Link>
               </Button>
               <Button
                 size="lg"
                 variant="outline"
                 className="border-2 border-white text-white hover:bg-white/10 font-semibold px-10 py-6 text-lg"
                 asChild
               >
                 <Link to="/about#contact">Contact Us</Link>
               </Button>
             </div>
           </motion.div>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default SavingsAnalysis;