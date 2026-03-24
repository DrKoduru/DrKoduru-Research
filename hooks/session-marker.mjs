#!/usr/bin/env node
/**
 * session-marker.mjs
 * Auto-appends a session end marker to LEARNINGS.md
 * Triggered by Stop hook in ~/.claude/settings.json
 *
 * DrKoduru-Research plugin — Srinivas V Koduru, PhD, AI/ML
 */

import { appendFileSync, existsSync, writeFileSync } from 'fs';

const LEARNINGS_FILE = 'C:\\Users\\sreen\\Cloud-Drive\\Sync with iDrive\\Cloud_Claude_2026\\LEARNINGS.md';

const now = new Date();
const timestamp = now.toISOString().replace('T', ' ').slice(0, 19);
const date = now.toISOString().slice(0, 10);

const marker = `\n---\n**Session ended**: ${timestamp}  \n> Run \`DrKoduru-Research:update-knowledge\` if new patterns or solutions were discovered today.\n`;

try {
  if (!existsSync(LEARNINGS_FILE)) {
    // Bootstrap if file doesn't exist
    const header = `# Session Learnings Log\n> Auto-appended by Stop hook. Review and update KNOWLEDGE_BASE.md with key discoveries.\n\n**Initialized**: ${date}\n`;
    writeFileSync(LEARNINGS_FILE, header, 'utf8');
  }
  appendFileSync(LEARNINGS_FILE, marker, 'utf8');
} catch (e) {
  // Silently fail — never interrupt Claude's stop event
}
