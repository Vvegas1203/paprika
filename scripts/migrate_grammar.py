#!/usr/bin/env python3
"""Migrate grammar module files from ng/ to src/grammar/"""
import os

# Map: destination -> source file (in ng/), based on file headers
FILE_MAP = {
    # core/
    "src/grammar/core/types.ts": "bwg9p5jli",
    "src/grammar/core/errors.ts": "3hevmduvr",
    "src/grammar/core/events.ts": "wyvgbkmhr",
    # content/
    "src/grammar/content/topic.types.ts": "pbqkl3k3m",
    "src/grammar/content/exercise.types.ts": "lq0nlqm2e",
    "src/grammar/content/builders.ts": "ixsgjcnpo",
    # services/
    "src/grammar/services/ProgressTracker.ts": "yvwh9awz2",
    "src/grammar/services/AnswerChecker.ts": "kdtqis90h",
    # providers/
    "src/grammar/providers/IContentProvider.ts": "09ahh8xed",
    "src/grammar/providers/BuiltInProvider.ts": "4r20xvr56",
    # root
    "src/grammar/index.ts": "h7l88ggn7",
    # a1 topics - read from index
    "src/grammar/content/a1/index.ts": "gz8upwxjk",
    "src/grammar/content/a1/01-phonetics.ts": "fc5uefugb",
    "src/grammar/content/a1/02-articles.ts": "45s5yfb0l",
    "src/grammar/content/a1/03-plural.ts": "yaqcbg95n",
    "src/grammar/content/a1/04-personal-pronouns.ts": "8kwi4t8yf",
    "src/grammar/content/a1/05-verbs-present.ts": "mr2bhgzey",
    "src/grammar/content/a1/06-modal-verbs.ts": "zbpcl5a7e",
    "src/grammar/content/a1/07-sentence-structure.ts": "uykirnzcd",
    "src/grammar/content/a1/08-negation.ts": "6pv9b22zp",
    "src/grammar/content/a1/09-cases.ts": "i78j4i21m",
    "src/grammar/content/a1/10-wechselprapositionen.ts": "hcyatevbn",
    "src/grammar/content/a1/11-time-prepositions.ts": "7lba1s8xl",
    "src/grammar/content/a1/12-perfekt.ts": "dyxdz4zp4",
    "src/grammar/content/a1/13-prateritum.ts": "leibsd3nf",
    "src/grammar/content/a1/14-adjective-declension.ts": "qiuscgc6o",
    "src/grammar/content/a1/15-possessive.ts": "t10dzwk41",
    "src/grammar/content/a1/16-reflexive.ts": "y4e311vxa",
    "src/grammar/content/a1/17-conjunctions.ts": "yeafd1m7e",
    "src/grammar/content/a1/18-imperative.ts": "a0618npu5",
    "src/grammar/content/a1/19-questions.ts": "c7iqa8utc",
    "src/grammar/content/a1/20-numbers.ts": "u4ccnmqal",
    "src/grammar/content/a1/21-comparative.ts": "ak3i3kncn",
    "src/grammar/content/a1/22-word-formation.ts": "gp29hjwlr",
    "src/grammar/content/a1/23-extra-topics.ts": "u3raau51v",
}

def migrate():
    for dest, src_id in FILE_MAP.items():
        src = f"ng/Qwen_typescript_20260707_{src_id}.ts"
        if os.path.exists(src):
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            with open(src, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            content = ''.join(lines[3:])  # Skip header
            with open(dest, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Migrated: {dest}")
        else:
            print(f"NOT FOUND: {src}")

if __name__ == "__main__":
    migrate()