// FILE: src/store/useSystemStore.ts
import { create } from 'zustand';

export interface Project {
  id: string;
  title: string;
  category: 'AI / Neural' | 'Full-Stack OS' | 'Systems & Infra';
  description: string;
  longDescription: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  image: string;
  liveUrl?: string;
  githubUrl: string;
}

interface SystemStore {
  activeSection: string;
  soundEnabled: boolean;
  selectedProject: Project | null;
  setActiveSection: (section: string) => void;
  toggleSound: () => void;
  setSelectedProject: (project: Project | null) => void;
}

export const useSystemStore = create<SystemStore>((set) => ({
  activeSection: 'hero',
  soundEnabled: true,
  selectedProject: null,
  setActiveSection: (activeSection) => set({ activeSection }),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  setSelectedProject: (selectedProject) => set({ selectedProject }),
}));