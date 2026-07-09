import { GrammarLevel, GrammarTopic, GrammarTopicData, GrammarLesson, GrammarLesson as BaseGrammarLesson } from './grammarTypes';

// Grammar data structure
export interface GrammarData {
  topics: GrammarTopicData[];
}

export async function loadGrammarData(level: GrammarLevel): Promise<GrammarData> {
  const response = await fetch(`/grammar_${level.toLowerCase()}.json`);
  const data: GrammarData = await response.json();
  return data;
}

export function getGrammarTopics(data: GrammarData): GrammarTopic[] {
  return data.topics.map(topic => ({
    id: topic.id,
    level: topic.level,
    title: topic.title,
    icon: topic.icon,
    order: topic.order,
    description: topic.description,
    lessonsCount: topic.lessons.length
  })).sort((a, b) => a.order - b.order);
}

export function getGrammarTopicById(data: GrammarData, topicId: string): GrammarTopic | undefined {
  const topic = data.topics.find((t: GrammarTopicData) => t.id === topicId);
  if (!topic) return undefined;
  return {
    id: topic.id,
    level: topic.level,
    title: topic.title,
    icon: topic.icon,
    order: topic.order,
    description: topic.description,
    lessonsCount: topic.lessons.length
  };
}

export function getGrammarLessons(data: GrammarData, topicId: string): GrammarLesson[] {
  const topic = data.topics.find((t: GrammarTopicData) => t.id === topicId);
  if (!topic) return [];
  return [...topic.lessons].sort((a, b) => a.order - b.order);
}

export function getGrammarLessonById(data: GrammarData, lessonId: string): GrammarLesson | undefined {
  for (const topic of data.topics) {
    const lesson = topic.lessons.find((l: BaseGrammarLesson) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

// Get all available grammar levels
export function getGrammarLevels(): GrammarLevel[] {
  return ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
}

// Get lesson count for a topic
export function getLessonCount(topic: GrammarTopic): number {
  // This is used with topics from getGrammarTopics which have lessonsCount
  return topic.lessonsCount;
}

// Get total lesson count for all topics in a level
export function getTotalLessons(data: GrammarData): number {
  return data.topics.reduce((sum, topic) => sum + topic.lessons.length, 0);
}