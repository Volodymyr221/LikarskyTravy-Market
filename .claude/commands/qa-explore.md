# /qa-explore — браузерний смоук-тест (Playwright)

## Що це
Claude сам збирає застосунок локально, запускає headless Chromium (браузер без вікна) через Playwright (бібліотека автоматизації браузера) і проходить екранами як живий користувач — ловить падіння, помилки консолі, биту верстку. Скріншоти + короткий звіт.
**НЕ замінює** ручний тест на телефоні: свайпи, гумовий скрол, встановлений застосунок, push-сповіщення, реальні платежі.

## Рівні
- **Quick** — головний екран + 1 зачеплена сторінка (дрібний фікс).
- **Standard** — усі зачеплені екрани + ключові дії/модалки (3–6).
- **Exhaustive** — усі розділи + повний шлях покупця (каталог → картка → кошик → оформлення), перед великим релізом.

## Передумови
1. `npm i -D playwright` (або `@playwright/test`). Якщо в середовищі є готовий Chromium — `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` і `ls /opt/pw-browsers/` → використати як `executablePath`.
2. Якщо Playwright шукає браузер в іншому місці — симлінк у scratchpad (тимчасову теку сесії) або явний `executablePath`.

## Прогін
1. Зібрати і підняти **локально** (НЕ прод): `npm run build` ; `{{SERVE_CMD}}` у фоні → `{{SERVE_URL}}`.
2. Прочитати **реальний** код навігації / роутера — список сторінок і як між ними перейти. Не хардкодити з памʼяті.
3. **Разовий** скрипт у scratchpad (НЕ в репо):
```js
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  const p = await b.newPage({ viewport: { width: 390, height: 844 } }); // телефон
  const errs = [];
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  p.on('console', m => m.type() === 'error' && errs.push('console: ' + m.text()));
  for (const path of ['/', /* сторінки з роутера */]) {
    await p.goto('{{SERVE_URL}}'.replace(/\/$/, '') + path, { waitUntil: 'networkidle' });
    await p.screenshot({ path: `shot${path.replace(/\W/g, '_') || '_home'}.png`, fullPage: true });
  }
  console.log(errs.length ? errs.join('\n') : 'CLEAN');
  await b.close();
  process.exit(errs.length ? 1 : 0);
})();
```
4. За рівнем — відкрити модалки, натиснути ключові кнопки, заповнити форму тестовими даними (**ніколи — реальні платежі / бойова база**).

## Звіт
Один рядок: `🔍 Браузер-смоук [рівень]: N екранів · 0 падінь · консоль чиста · верстка ок`. Проблемні скріншоти показати Вові. Перевірене позначити «✅ браузер-смоук».
🔴 «Консоль чиста» — тільки якщо скрипт вийшов з кодом 0 і надрукував `CLEAN`.

## Fail-soft
Chromium не запускається — НЕ блокувати. Звіт: «браузер-смоук недоступний; зроблено npx tsc --noEmit + npm test; перевір вручну на телефоні». Браузер-тест — помічник, не ворота.
