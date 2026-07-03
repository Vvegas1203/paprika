import { Word } from './types';

export async function loadWords(): Promise<Word[]> {
  const response = await fetch('/words.csv');
  const text = await response.text();
  const lines = text.trim().split('\n');
  const words: Word[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = parseCSVLine(line);
    if (parts.length < 6) continue;

    words.push({
      id: parseInt(parts[0], 10),
      module: parts[1],
      topic: parts[2],
      word: parts[3],
      translation: parts[4],
      image: parts[5],
    });
  }

  return words;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());

  return result;
}

export function getModules(words: Word[]): string[] {
  return [...new Set(words.map((w) => w.module))].sort();
}

export function getTopics(words: Word[], moduleName: string): string[] {
  return [
    ...new Set(
      words.filter((w) => w.module === moduleName).map((w) => w.topic)
    ),
  ].sort();
}

export function getWordsByTopic(words: Word[], moduleName: string, topicName: string): Word[] {
  return words.filter((w) => w.module === moduleName && w.topic === topicName);
}