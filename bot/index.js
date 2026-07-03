require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

const token = process.env.BOT_TOKEN;
const appUrl = process.env.APP_URL;

if (!token || token === 'ВАШ_ТОКЕН_БОТА_СЮДА') {
  console.error('❌ Ошибка: укажите BOT_TOKEN в файле .env');
  process.exit(1);
}

if (!appUrl) {
  console.error('❌ Ошибка: укажите APP_URL в файле .env');
  process.exit(1);
}

const bot = new Telegraf(token);

bot.start((ctx) => {
  ctx.reply(
    '👋 Добро пожаловать в приложение для изучения языков!\n\n'
    + 'Нажмите кнопку ниже, чтобы открыть приложение:',
    Markup.inlineKeyboard([
      Markup.button.webApp('📚 Открыть приложение', appUrl),
    ])
  );
});

bot.help((ctx) => {
  ctx.reply(
    '📖 Команды:\n'
    + '/start — открыть приложение\n'
    + '/help — помощь'
  );
});

bot.launch();
console.log('✅ Бот запущен!');
console.log(`🔗 Ссылка Mini App: ${appUrl}`);

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));