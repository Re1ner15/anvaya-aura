import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface NotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  marketName: string;
}

const NotifyModal = ({ isOpen, onClose, marketName }: NotifyModalProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: fnError } = await supabase.functions.invoke('send-notify-email', {
        body: { email, marketName },
      });

      if (fnError) throw fnError;

      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setEmail('');
        setLoading(false);
      }, 2000);
    } catch (err: any) {
      console.error('Notify error:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-near-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-card border border-border/50 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {!submitted ? (
          <>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Get notified when {marketName} launches
            </h3>
            <p className="text-muted-foreground mb-6">
              Be the first to know when we launch energy solutions for {marketName.toLowerCase()}.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-4 py-3 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : 'Notify Me'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <Bell className="w-8 h-8 text-primary" />
            </motion.div>
            <h3 className="text-xl font-semibold text-foreground mb-2">You're on the list!</h3>
            <p className="text-muted-foreground">We'll notify you when we launch.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default NotifyModal;
