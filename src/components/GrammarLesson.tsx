import { useLanguage } from '../contexts/LanguageContext';
import type { GrammarTopic } from '../grammar';

interface Props {
  topic: GrammarTopic;
  completed: boolean;
  onNext: () => void;
  onBack: () => void;
}

const getText = (localized: any, lang: string): string => {
  if (!localized) return '';
  return localized[lang] ?? localized.ru ?? Object.values(localized)[0] ?? '';
};

export default function GrammarLessonComponent({ topic, completed, onNext, onBack }: Props) {
  const { t, language } = useLanguage();
  const lang = language;

  const title = getText(topic.title, lang);
  const intro = getText(topic.introduction, lang);

  return (
    <div className="screen grammar-lesson-screen">
      <button className="btn btn-nav-back" onClick={onBack}>
        {t.back}
      </button>

      <div className="grammar-lesson-container">
        <div className="grammar-lesson-header">
          <h2 className="grammar-lesson-title">{title}</h2>
          <div className="grammar-lesson-badge">{completed ? '✓' : ''}</div>
        </div>

        {intro && (
          <div className="grammar-section">
            <p className="grammar-explanation">{intro}</p>
          </div>
        )}

        {topic.rules && topic.rules.length > 0 && (
          <div className="grammar-section">
            <h3 className="grammar-section-title">{getText({ ru: 'Правила', en: 'Rules', ar: 'قواعد' }, lang)}</h3>
            <div className="grammar-rules-list">
              {topic.rules.map((rule) => {
                const ruleTitle = getText(rule.title, lang);
                const ruleText = getText(rule.explanation, lang);
                return (
                  <div key={rule.id} className="grammar-rule-item">
                    <div className="grammar-rule-text">
                      <strong>{ruleTitle}: </strong>
                      {ruleText}
                    </div>
                    {rule.formula && (
                      <div className="grammar-rule-formula">{rule.formula}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {topic.examples && topic.examples.length > 0 && (
          <div className="grammar-section">
            <h3 className="grammar-section-title">{getText({ ru: 'Примеры', en: 'Examples', ar: 'أمثلة' }, lang)}</h3>
            <div className="grammar-examples-list">
              {topic.examples.map((ex, idx) => {
                const translation = getText(ex.translation, lang);
                const literal = ex.literal ? getText(ex.literal, lang) : '';
                return (
                  <div key={idx} className="grammar-example-card">
                    <span className="german-text-bold">{ex.german}</span>
                    <span className="english-text">{translation}</span>
                    {literal && <span className="german-literal">({literal})</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {topic.mistakes && topic.mistakes.length > 0 && (
          <div className="grammar-section">
            <h3 className="grammar-section-title">{getText({ ru: 'Частые ошибки', en: 'Common mistakes', ar: 'أخطاء شائعة' }, lang)}</h3>
            <div className="grammar-mistakes-list">
              {topic.mistakes.map((m, idx) => {
                const wrongText = getText(m.wrong, lang);
                const correctText = getText(m.correct, lang);
                const explanation = getText(m.explanation, lang);
                return (
                  <div key={idx} className="grammar-mistake-item">
                    <div>
                      <span className="german-text-wrong">❌ {wrongText}</span>
                      <br />
                      <span className="german-text-correct">✅ {correctText}</span>
                    </div>
                    <div className="german-explanation">{explanation}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {topic.cheatsheet && (
          <div className="grammar-section">
            <h3 className="grammar-section-title">{getText({ ru: 'Шпаргалка', en: 'Cheat sheet', ar: 'ملخّص' }, lang)}</h3>
            <div className="grammar-cheatsheet">
              {Object.entries(topic.cheatsheet).map(([key, values], idx) => (
                <div key={idx} className="grammar-cheatsheet-item">
                  <strong>{key}:</strong> {values.join(', ')}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grammar-section summary-section">
          <h3 className="grammar-section-title">{getText({ ru: 'Итого', en: 'Summary', ar: 'ملخّص' }, lang)}</h3>
          <div className="grammar-summary-content">
            <p>{title}</p>
            <p>
              {topic.rules?.length ?? 0} {t.theory} • {topic.examples?.length ?? 0} {t.examples} • {topic.mistakes?.length ?? 0} {t.commonMistakes}
            </p>
          </div>
        </div>

        <button className="btn btn-start-practice" onClick={onNext}>
          {completed
            ? getText({ ru: 'Завершено', en: 'Completed', ar: 'مكتمل' }, lang)
            : getText({ ru: 'Практика', en: 'Practice', ar: 'تمرين' }, lang)}
        </button>
      </div>
    </div>
  );
}