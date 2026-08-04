// FILE: src/components/sections/Contact.tsx
import { useState, type FormEvent } from 'react';
import { MagneticButton } from '../ui/MagneticButton';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen w-full bg-[#030308] py-32 px-6 md:px-12 border-t border-white/5 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 font-mono text-xs text-[#00f0ff] uppercase tracking-widest mb-3 glass-panel px-4 py-1.5 rounded-full border-white/10">
            <span className="h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
            05 // ENCRYPTED TRANSMISSION
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white mt-4">
            Initiate <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.6)]">Contact</span>
          </h2>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-3xl border-white/15 relative overflow-hidden">
          {submitted ? (
            <div className="text-center py-12">
              <div className="font-mono text-xl text-[#00f0ff] mb-4">
                [ TRANSMISSION RECEIVED ]
              </div>
              <p className="text-white/70 font-sans">
                Thank you. Your dispatch has been logged in the system queue. Expect a response within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs text-white/50 uppercase mb-2">
                    IDENTIFIER // NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff] transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-white/50 uppercase mb-2">
                    DISPATCH ADDRESS // EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff] transition-colors font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-white/50 uppercase mb-2">
                  TRANSMISSION PAYLOAD // MESSAGE
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Detail project specifications or inquiry..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff] transition-colors font-mono resize-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <MagneticButton strength={30}>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-[#00f0ff] text-[#030308] font-mono text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                  >
                    SEND TRANSMISSION &rarr;
                  </button>
                </MagneticButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}