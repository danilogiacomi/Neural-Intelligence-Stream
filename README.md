# ⚡ Neural Intelligence Stream

An elegant, high-fidelity developer dashboard aggregating live AI research, technical breakthroughs, model releases, and open-source updates in real-time. Designed with a premium pitch-black cyber-emerald aesthetic, local caching, parallel RSS feed ingestion, and client-side search.

🌐 **Live Feed Dashboard**: Combines Hacker News (AI), OpenAI, Hugging Face, Google Research, TechCrunch, The Verge, MIT Technology Review, and Ars Technica into a single, unified stream.

👉 **[Open the live dashboard](https://danilogiacomi.github.io/Neural-Intelligence-Stream/)**

---

## ✨ Features

- 🛰️ **Parallel Client-side RSS Aggregation**: Polls multiple developer and tech publications simultaneously using native `Promise.allSettled` to recover gracefully from feed outages.
- 🧪 **Premium Cyber-Emerald Palette**: Beautiful pitch-black depth contrast paired with high-performance emerald green (`oklch(76% 0.18 150)`) accents and dynamic glassmorphism panels.
- 🌓 **Theme Synchronization**: Implements system-preference-aware dark and light themes with state persistence via `localStorage` and a blocking inline script to prevent Flash of Unstyled Content (FOUC).
- 🏷️ **Custom Visual Badges**: Assigns distinctive colors to publishers (including custom brand colors like Google Green) and shows stylized category icons (Code, Brain, Cpu) if articles lack images.
- 🔍 **Real-time Filter & Search**: Instantly filter by category tags (Developer, Research, General, Industry), multi-select publishers, or run client-side debounced search queries.
- 💾 **Persistent Bookmarks Sidebar Drawer**: Permits bookmarking complete articles, facilitating offline retrieval even if feeds drop out of active cache.
- 🏎️ **Optimized Caching & Deduplication**: Features robust multi-dimensional deduplication and a 5-minute local caching strategy to comply with RSS rate limits.

---

## 🛠️ Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Vanilla CSS (CSS Variables, HSL/OKLCH coordinates, container-queries)
- **Icons**: Lucide React
- **Engine**: Client-side RSS-to-JSON API proxy
