import csv
import os

CSV_PATH = 'public/words.csv'
SVG_DIR = 'public/images/material'

# 20 clean topic categories with word->topic mapping
# Each topic has a display emoji
TOPIC_EMOJI = {
    'People & Family': '👨‍👩‍👧‍👦',
    'Home & Living': '🏠',
    'Food & Drinks': '🍽️',
    'Transport & Travel': '🚗',
    'Work & Career': '💼',
    'School & Learning': '📚',
    'Shopping & Money': '🛒',
    'Health & Body': '🏥',
    'Clothing & Style': '👕',
    'Nature & Weather': '🌤️',
    'Communication': '📱',
    'Leisure & Sport': '⚽',
    'Time & Dates': '📅',
    'Places & Directions': '📍',
    'Emotions & Feelings': '😊',
    'Adjectives & Description': '🎨',
    'Verbs & Actions': '🏃',
    'Grammar Basics': '📖',
    'Numbers & Quantities': '🔢',
    'Questions & Conjunctions': '❓',
}

# Map each word_id to its new topic based on the current topic/meaning
WORD_TOPIC_MAP = {}

# Read current CSV to get all rows
with open(CSV_PATH, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

# Build topic mapping from current topics
current_topic_map = {}
for row in rows:
    word_id = int(row['id'])
    current_topic_map[word_id] = row['topic']

# Manual mapping: current topic -> new topic
topic_remap = {
    'People': 'People & Family',
    'Family': 'People & Family',
    'Body': 'Health & Body',
    'Health': 'Health & Body',
    'Food': 'Food & Drinks',
    'Drinks': 'Food & Drinks',
    'Clothing': 'Clothing & Style',
    'Home': 'Home & Living',
    'Housing': 'Home & Living',
    'Furniture': 'Home & Living',
    'Transport': 'Transport & Travel',
    'Travel': 'Transport & Travel',
    'Work': 'Work & Career',
    'Education': 'School & Learning',
    'School': 'School & Learning',
    'Learning': 'School & Learning',
    'Shopping': 'Shopping & Money',
    'Finance': 'Shopping & Money',
    'Money': 'Shopping & Money',
    'Nature': 'Nature & Weather',
    'Weather': 'Nature & Weather',
    'Communication': 'Communication',
    'Media': 'Communication',
    'Technology': 'Communication',
    'Computer': 'Communication',
    'Office': 'Work & Career',
    'Documents': 'Shopping & Money',
    'Personal': 'People & Family',
    'Questions': 'Questions & Conjunctions',
    'Conjunctions': 'Questions & Conjunctions',
    'Pronouns': 'Grammar Basics',
    'Prepositions': 'Grammar Basics',
    'Adjectives': 'Adjectives & Description',
    'Description': 'Adjectives & Description',
    'Emotions': 'Emotions & Feelings',
    'Feelings': 'Emotions & Feelings',
    'Leisure': 'Leisure & Sport',
    'Sport': 'Leisure & Sport',
    'Time': 'Time & Dates',
    'Dates': 'Time & Dates',
    'Places': 'Places & Directions',
    'Directions': 'Places & Directions',
    'Geography': 'Places & Directions',
    'Languages': 'School & Learning',
    'Animals': 'Nature & Weather',
    'Institutions': 'Places & Directions',
    'General': 'Verbs & Actions',
    'Actions': 'Verbs & Actions',
    'Adjectives': 'Adjectives & Description',
}

for row in rows:
    word_id = int(row['id'])
    old_topic = row['topic']
    new_topic = topic_remap.get(old_topic, 'Verbs & Actions')
    WORD_TOPIC_MAP[word_id] = new_topic

# Write the updated CSV
with open(CSV_PATH, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f, quoting=csv.QUOTE_ALL)
    writer.writerow(['id', 'module', 'topic', 'word', 'translation', 'image'])
    
    for row in rows:
        word_id = int(row['id'])
        new_topic = WORD_TOPIC_MAP.get(word_id, 'Verbs & Actions')
        writer.writerow([
            row['id'],
            row['module'],
            new_topic,
            row['word'],
            row['translation'],
            row['image']
        ])

print("CSV updated successfully!")
print(f"Total words: {len(rows)}")
print(f"Topics ({len(TOPIC_EMOJI)}):")
for t, emoji in TOPIC_EMOJI.items():
    count = sum(1 for wid, topic in WORD_TOPIC_MAP.items() if topic == t)
    print(f"  {emoji} {t}: {count} words")