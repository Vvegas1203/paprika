import type { GrammarTopic } from '../grammar';
import type { Exercise } from '../grammar';
import type { TaskCollection, Task, TaskItem } from '../grammar/content/task.types';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

interface Props {
  topic: GrammarTopic;
  exercises: Exercise[];
  taskCollection?: TaskCollection;
  onBack: () => void;
  onFinish: () => void;
}

const getText = (localized: any, lang: string): string => {
  if (!localized) return '';
  return localized[lang] ?? localized.ru ?? Object.values(localized)[0] ?? '';
};

/** Autodetect the type of a task item */
function getItemKind(item: TaskItem): string {
  if ('options' in item && 'scenario' in item) return 'scenario';
  if ('options' in item && 'correct' in item) return 'choice';
  if ('answer' in item && 'words' in item) return 'word-order';
  if ('parts' in item) return 'parts-order';
  if ('base' in item && 'comp' in item) return 'comparison';
  if ('statement' in item) return 'transform';
  if ('words' in item) return 'word-order';
  if ('answer' in item) return 'fill';
  return 'fill';
}

export default function GrammarPractice({ topic, exercises, taskCollection, onBack, onFinish }: Props) {
  const { language } = useLanguage();
  const lang = language;

  // Current task index (within taskCollection)
  const [currentTaskIdx, setCurrentTaskIdx] = useState(0);
  // Current item index within a task
  const [currentItemIdx, setCurrentItemIdx] = useState(0);
  // Flow: 'tasks' (using taskCollection) or 'exercises' (old style)
  const [mode] = useState<'tasks' | 'exercises'>(taskCollection ? 'tasks' : 'exercises');

  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentTask: Task | null = mode === 'tasks' && taskCollection
    ? taskCollection.tasks[currentTaskIdx] ?? null
    : null;
  const currentItem: TaskItem | null = currentTask?.items[currentItemIdx] ?? null;
  const currentExercise = !taskCollection ? exercises[currentTaskIdx] ?? null : null;

  const title = taskCollection
    ? getText(taskCollection.title, lang)
    : getText(topic.title, lang);

  // Calculate total count: items across all tasks (in tasks mode) or exercises count
  const totalSteps = taskCollection
    ? taskCollection.tasks.reduce((sum, t) => sum + t.items.length, 0)
    : exercises.length;

  // Calculate current step: sum of items from previous tasks + current item index
  const currentStep = (() => {
    if (!taskCollection || !currentTask) return currentTaskIdx + 1;
    let steps = 0;
    for (let i = 0; i < currentTaskIdx; i++) {
      steps += taskCollection.tasks[i].items.length;
    }
    steps += currentItemIdx + 1;
    return steps;
  })();

  function checkAnswer(userValue: string): boolean {
    if (!currentItem) return false;
    const kind = getItemKind(currentItem);
    const normalizedUser = String(userValue ?? '').trim().toLowerCase();

    if (kind === 'choice' || kind === 'scenario') {
      return normalizedUser === String((currentItem as any).correct).toLowerCase();
    }
    if (kind === 'fill' || kind === 'word-order' || kind === 'parts-order' || kind === 'transform') {
      const expected = String((currentItem as any).correct ?? (currentItem as any).answer ?? '');
      return expected.toLowerCase() === normalizedUser;
    }
    if (kind === 'comparison') {
      return normalizedUser === String((currentItem as any).comp).toLowerCase();
    }
    return false;
  }

  function handleCheck() {
    if (!currentItem) return;

    // For choice/scenario: get the actual option text that was selected
    let userAnswer = answer;
    if (selectedOption !== null) {
      const item = currentItem as any;
      const options: string[] = item.options ?? [];
      userAnswer = options[selectedOption] ?? '';
    }

    const isCorrect = mode === 'tasks'
      ? checkAnswer(userAnswer)
      : false;

    // For choice/scenario, also auto-select based on index matching correct string
    if (isCorrect || ((currentItem as any).options && selectedOption !== null)) {
      setStatus(isCorrect ? 'correct' : 'incorrect');
      setFeedback(
        isCorrect
          ? getText({ ru: 'Верно!', en: 'Correct!', ar: 'صحيح!' }, lang)
          : getText({ ru: 'Неправильно', en: 'Incorrect', ar: 'خطأ' }, lang)
      );
    }
  }

  function handleNext() {
    if (currentTask && currentItemIdx < currentTask.items.length - 1) {
      setCurrentItemIdx((i) => i + 1);
    } else if (taskCollection && currentTaskIdx < taskCollection.tasks.length - 1) {
      setCurrentTaskIdx((i) => i + 1);
      setCurrentItemIdx(0);
    } else if (mode === 'exercises' && currentTaskIdx < exercises.length - 1) {
      setCurrentTaskIdx((i) => i + 1);
    } else {
      onFinish();
      return;
    }
    setAnswer('');
    setSelectedOption(null);
    setStatus('idle');
    setFeedback('');
  }

  // Render current task item
  const renderTaskItem = () => {
    if (!currentItem) return null;
    const kind = getItemKind(currentItem);
    const instruction = currentTask ? getText(currentTask.instruction, lang) : '';

    return (
      <div className="grammar-practice-question">
        <div className="grammar-practice-instruction">{instruction}</div>

        {/* Choice / Scenario */}
        {(kind === 'choice' || kind === 'scenario') && (
          <>
            <p className="grammar-practice-question-text">
              {(currentItem as any).scenario || (currentItem as any).question}
            </p>
            <div className="grammar-practice-options">
              {((currentItem as any).options ?? []).map((opt: string, idx: number) => (
                <button
                  key={idx}
                  className={`btn btn-option ${selectedOption === idx ? 'selected' : ''}`}
                  onClick={() => { setSelectedOption(idx); setAnswer(''); setStatus('idle'); setFeedback(''); }}
                  disabled={status !== 'idle'}
                >
                  {opt}
                </button>
              ))}
            </div>
            {/* Show Check button when an option is selected and status is idle */}
            {selectedOption !== null && status === 'idle' && (
              <button className="btn btn-check btn-check-full" onClick={handleCheck}>
                {getText({ ru: 'Проверить', en: 'Check', ar: 'تحقق' }, lang)}
              </button>
            )}
          </>
        )}

        {/* Fill / Word order / Parts order / Transform */}
        {(kind === 'fill' || kind === 'word-order' || kind === 'parts-order' || kind === 'transform') && (
          <>
            <p className="grammar-practice-question-text">{currentItem.question}</p>
            {kind === 'word-order' && (currentItem as any).words && (
              <div className="grammar-practice-hint">
                {getText({ ru: 'Слова: ', en: 'Words: ', ar: 'الكلمات: ' }, lang)}
                {(currentItem as any).words.join(', ')}
              </div>
            )}
            {kind === 'parts-order' && (currentItem as any).parts && (
              <div className="grammar-practice-hint">
                {getText({ ru: 'Части: ', en: 'Parts: ', ar: 'الأجزاء: ' }, lang)}
                {(currentItem as any).parts.join(', ')}
              </div>
            )}
            <div className="grammar-practice-input-row">
              <input
                className="grammar-practice-input"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={getText({ ru: 'Введите ответ...', en: 'Type answer...', ar: 'أدخل الجواب...' }, lang)}
                disabled={status !== 'idle'}
              />
              <button className="btn btn-check" onClick={handleCheck} disabled={status !== 'idle'}>
                {getText({ ru: 'Проверить', en: 'Check', ar: 'تحقق' }, lang)}
              </button>
            </div>
          </>
        )}

        {/* Comparison (reference table, no check needed) */}
        {kind === 'comparison' && (
          <>
            <p className="grammar-practice-question-text">{getText({ ru: 'Степени сравнения', en: 'Degrees of comparison', ar: 'درجات المقارنة' }, lang)}</p>
            <div className="grammar-comparison-table">
              <div className="grammar-comparison-row">
                <span className="grammar-comparison-label">{getText({ ru: 'Основа:', en: 'Base:', ar: 'الأساس:' }, lang)}</span>
                <span className="grammar-comparison-value">{(currentItem as any).base}</span>
              </div>
              <div className="grammar-comparison-row">
                <span className="grammar-comparison-label">{getText({ ru: 'Сравнительная:', en: 'Comparative:', ar: 'المقارن:' }, lang)}</span>
                <span className="grammar-comparison-value">{(currentItem as any).comp}</span>
              </div>
              <div className="grammar-comparison-row">
                <span className="grammar-comparison-label">{getText({ ru: 'Превосходная:', en: 'Superlative:', ar: 'التفضيل:' }, lang)}</span>
                <span className="grammar-comparison-value">{(currentItem as any).sup}</span>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // Render old-style exercise (fallback - empty now)
  const renderExercise = () => {
    if (!currentExercise) return null;
    return (
      <div className="grammar-practice-question">
        <p>{(currentExercise as any).question ? getText((currentExercise as any).question, lang) : ''}</p>
        {(currentExercise as any).options ? (
          <div className="grammar-practice-options">
            {((currentExercise as any).options ?? []).map((opt: string, idx: number) => (
              <button key={idx} className="btn btn-option" onClick={() => { setAnswer(String(idx)); handleCheckLegacy(); }}>
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <div className="grammar-practice-input-row">
            <input
              className="grammar-practice-input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={getText({ ru: 'Введите ответ...', en: 'Type answer...', ar: 'أدخل الجواب...' }, lang)}
            />
            <button className="btn btn-check" onClick={handleCheckLegacy}>
              {getText({ ru: 'Проверить', en: 'Check', ar: 'تحقق' }, lang)}
            </button>
          </div>
        )}
      </div>
    );
  };

  function handleCheckLegacy() {
    if (!currentExercise) return;
    const normalizedUser = String(answer ?? '').trim();
    let isCorrect = false;
    if (currentExercise.kind === 'choice') {
      const idx = Number(normalizedUser);
      isCorrect = Array.isArray(currentExercise.correct)
        ? currentExercise.correct.includes(idx)
        : currentExercise.correct === idx;
    } else {
      const expected = String((currentExercise as any).answer ?? '');
      const alternatives: string[] = (currentExercise as any).alternatives ?? [];
      isCorrect = [expected, ...alternatives].some((a) => a.toLowerCase() === normalizedUser.toLowerCase());
    }
    setStatus(isCorrect ? 'correct' : 'incorrect');
    setFeedback(
      isCorrect
        ? getText({ ru: 'Верно!', en: 'Correct!', ar: 'صحيح!' }, lang)
        : getText({ ru: 'Неправильно', en: 'Incorrect', ar: 'خطأ' }, lang)
    );
  }

  return (
    <div className="screen grammar-practice-screen">
      <button className="btn btn-nav-back" onClick={onBack}>
        {getText({ ru: 'Назад', en: 'Back', ar: 'رجوع' }, lang)}
      </button>

      <div className="grammar-practice-container">
        <div className="grammar-practice-header">
          <h2 className="grammar-practice-title">{title}</h2>
          {currentTask && (
            <div className="grammar-practice-subtitle">
              {getText(currentTask.title, lang)}
            </div>
          )}
          <div className="grammar-practice-counter">
            {currentStep} / {totalSteps}
          </div>
        </div>

        {mode === 'tasks' ? renderTaskItem() : renderExercise()}

        {feedback && (
          <div className={`grammar-practice-feedback ${status}`}>
            {feedback}
            {status === 'incorrect' && (
              <div className="grammar-correct-answer">
                {getText({ ru: 'Правильный ответ: ', en: 'Correct answer: ', ar: 'الإجابة الصحيحة: ' }, lang)}
                <strong>
                  {currentItem
                    ? String((currentItem as any).correct ?? (currentItem as any).answer ?? '')
                    : currentExercise
                      ? String((currentExercise as any).answer ?? (currentExercise as any).correct ?? '')
                      : ''}
                </strong>
              </div>
            )}
          </div>
        )}

        {(status !== 'idle' || (mode === 'tasks' && currentItem && getItemKind(currentItem) === 'comparison')) && (
          <button className="btn btn-start-practice" onClick={handleNext}>
            {currentStep < totalSteps
              ? getText({ ru: 'Далее', en: 'Next', ar: 'التالي' }, lang)
              : getText({ ru: 'Завершить', en: 'Finish', ar: 'إنهاء' }, lang)}
          </button>
        )}
      </div>
    </div>
  );
}