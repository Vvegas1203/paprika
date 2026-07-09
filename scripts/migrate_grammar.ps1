# Powerscript to migrate grammar files from ng to src/grammar
# Usage: Run from project root

$ngDir = "ng"
$destDir = "src/grammar"

# Create directory structure
@('core', 'content/a1', 'providers', 'services') | ForEach-Object {
    New-Item -ItemType Directory -Force -Path "$destDir/$_" | Out-Null
}

# Map file patterns to destination
$files = @{
    "src/grammar/core/types.ts"       = "Qwen_typescript_20260707_bwg9p5jli.ts"
    "src/grammar/core/errors.ts"    = "Qwen_typescript_20260707_3hevmduvr.ts"
    "src/grammar/core/events.ts"    = "Qwen_typescript_20260707_wyvgbkmhr.ts"
    "src/grammar/content/topic.types.ts" = "Qwen_typescript_20260707_pbqkl3k3m.ts"
    "src/grammar/content/exercise.types.ts" = "Qwen_typescript_20260707_lq0nlqm2e.ts"
    "src/grammar/content/builders.ts" = "Qwen_typescript_20260707_ixsgjcnpo.ts"
    "src/grammar/services/ProgressTracker.ts" = "Qwen_typescript_20260707_yvwh9awz2.ts"
    "src/grammar/services/AnswerChecker.ts" = "Qwen_typescript_20260707_kdtqis90h.ts"
    "src/grammar/services/GrammarEngine.ts" = "Qwen_typescript_20260707_fc5uefugb.ts"
    "src/grammar/providers/IContentProvider.ts" = "Qwen_typescript_20260707_09ahh8xed.ts"
    "src/grammar/providers/BuiltInProvider.ts" = "Qwen_typescript_20260707_h7l88ggn7.ts"
    "src/grammar/index.ts" = "Qwen_typescript_20260707_h7l88ggn7.ts"
    "src/grammar/content/a1/index.ts" = "Qwen_typescript_20260707_gz8upwxjk.ts"
}

# Copy files
$files.GetEnumerator() | ForEach-Object {
    $dest = $_.Key
    $src = $_.Value
    if (Test-Path $src) {
        # Extract content without the header comment
        $content = Get-Content $src | Select-Object -Skip 3
        $content | Set-Content $dest
        Write-Host "Copied: $dest"
    }
}