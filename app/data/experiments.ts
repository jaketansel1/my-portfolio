export type ExperimentId = "ask" | "play" | "surprise";

export type Experiment = {
  id: ExperimentId;
  number: string;
  symbol: string;
  title: string;
  description: string;
  /** "soon" shows the option without making it interactive. */
  status: "available" | "soon";
  /** Call to action shown when the experiment is available. */
  action: string;
};

// The "Try something different" panel. To launch an experiment, flip its status
// and register its view in components/experiments/ExperimentPanel.tsx.
export const experiments: Experiment[] = [
  {
    id: "ask",
    number: "01",
    symbol: "✦",
    title: "Ask My Portfolio",
    description: "Ask about my work, experience or skills.",
    status: "soon",
    action: "Ask a question",
  },
  {
    id: "play",
    number: "02",
    symbol: "▶",
    title: "Play My Portfolio",
    description: "Make the product decisions I had to make.",
    status: "soon",
    action: "Start playing",
  },
  {
    id: "surprise",
    number: "03",
    symbol: "◈",
    title: "Surprise Me",
    description: "Take me somewhere interesting.",
    status: "available",
    action: "Surprise me",
  },
];
