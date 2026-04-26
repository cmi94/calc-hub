/**
 * 다계스탄 GA4 분석 리포트 생성기
 *
 * 사전 준비:
 * 1. Google Cloud Console에서 서비스 계정 생성
 *    https://console.cloud.google.com/ → IAM → 서비스 계정 → 키 생성(JSON)
 * 2. GA4 속성 설정 → 속성 ID 복사 (숫자, 예: 123456789)
 *    https://analytics.google.com → 관리 → 속성 → 속성 세부정보
 * 3. GA4 속성에 서비스 계정 이메일 뷰어 권한 추가
 *    GA4 → 관리 → 속성 액세스 관리 → + 추가
 * 4. 아래 환경변수 설정:
 *    GA4_PROPERTY_ID=123456789
 *    GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
 *
 * 실행:
 *    node scripts/fetch-analytics.mjs
 *    node scripts/fetch-analytics.mjs --days=7
 *    node scripts/fetch-analytics.mjs --days=30
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { writeFileSync } from 'fs';

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
if (!PROPERTY_ID) {
  console.error('❌ GA4_PROPERTY_ID 환경변수를 설정해주세요.');
  process.exit(1);
}

const days = (() => {
  const arg = process.argv.find((a) => a.startsWith('--days='));
  return arg ? parseInt(arg.split('=')[1], 10) : 30;
})();

const client = new BetaAnalyticsDataClient();
const property = `properties/${PROPERTY_ID}`;
const dateRange = [{ startDate: `${days}daysAgo`, endDate: 'today' }];

async function fetchReport() {
  const [overview, calcViews, calcSubmits, devices, sources] = await Promise.all([
    // 전체 지표
    client.runReport({
      property,
      dateRanges: dateRange,
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
      ],
    }),

    // 계산기별 조회 (calc_view 이벤트)
    client.runReport({
      property,
      dateRanges: dateRange,
      dimensions: [
        { name: 'customEvent:calc_name' },
        { name: 'customEvent:calc_category' },
        { name: 'customEvent:is_fun' },
      ],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: { fieldName: 'eventName', stringFilter: { value: 'calc_view' } },
      },
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: 20,
    }),

    // 계산기별 계산 실행 (calc_submit 이벤트)
    client.runReport({
      property,
      dateRanges: dateRange,
      dimensions: [
        { name: 'customEvent:calc_name' },
        { name: 'customEvent:calc_category' },
      ],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: { fieldName: 'eventName', stringFilter: { value: 'calc_submit' } },
      },
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
      limit: 20,
    }),

    // 디바이스 분포
    client.runReport({
      property,
      dateRanges: dateRange,
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    }),

    // 유입 채널
    client.runReport({
      property,
      dateRanges: dateRange,
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 10,
    }),
  ]);

  // 숫자 포맷
  const n = (v) => parseInt(v || '0').toLocaleString('ko-KR');
  const pct = (v) => (parseFloat(v || '0') * 100).toFixed(1) + '%';
  const sec = (v) => {
    const s = parseFloat(v || '0');
    return `${Math.floor(s / 60)}분 ${Math.round(s % 60)}초`;
  };

  const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  const ovRow = overview[0].rows?.[0]?.metricValues ?? [];

  const lines = [
    `# 다계스탄 GA4 분석 리포트`,
    `> 기간: 최근 ${days}일 | 생성: ${now}`,
    ``,
    `## 전체 지표`,
    `| 지표 | 값 |`,
    `|---|---|`,
    `| 세션 수 | ${n(ovRow[0]?.value)} |`,
    `| 활성 사용자 | ${n(ovRow[1]?.value)} |`,
    `| 페이지뷰 | ${n(ovRow[2]?.value)} |`,
    `| 이탈률 | ${pct(ovRow[3]?.value)} |`,
    `| 평균 세션 시간 | ${sec(ovRow[4]?.value)} |`,
    ``,
    `## 계산기별 조회수 TOP 20 (calc_view)`,
    `| 순위 | 계산기 | 카테고리 | 재미 | 조회 |`,
    `|---|---|---|---|---|`,
    ...(calcViews[0].rows ?? []).map((r, i) => {
      const [name, cat, fun] = r.dimensionValues?.map((d) => d.value) ?? [];
      const count = r.metricValues?.[0]?.value;
      return `| ${i + 1} | ${name} | ${cat} | ${fun === 'true' ? '✅' : '-'} | ${n(count)} |`;
    }),
    ``,
    `## 계산기별 계산 실행 TOP 20 (calc_submit)`,
    `| 순위 | 계산기 | 카테고리 | 실행 수 |`,
    `|---|---|---|---|`,
    ...(calcSubmits[0].rows ?? []).map((r, i) => {
      const [name, cat] = r.dimensionValues?.map((d) => d.value) ?? [];
      const count = r.metricValues?.[0]?.value;
      return `| ${i + 1} | ${name} | ${cat} | ${n(count)} |`;
    }),
    ``,
    `## 디바이스 분포`,
    `| 디바이스 | 세션 | 사용자 |`,
    `|---|---|---|`,
    ...(devices[0].rows ?? []).map((r) => {
      const [device] = r.dimensionValues?.map((d) => d.value) ?? [];
      const [sess, users] = r.metricValues?.map((m) => m.value) ?? [];
      const label = { mobile: '📱 모바일', desktop: '🖥 데스크톱', tablet: '📟 태블릿' }[device] ?? device;
      return `| ${label} | ${n(sess)} | ${n(users)} |`;
    }),
    ``,
    `## 유입 채널`,
    `| 채널 | 세션 | 사용자 |`,
    `|---|---|---|`,
    ...(sources[0].rows ?? []).map((r) => {
      const [channel] = r.dimensionValues?.map((d) => d.value) ?? [];
      const [sess, users] = r.metricValues?.map((m) => m.value) ?? [];
      return `| ${channel} | ${n(sess)} | ${n(users)} |`;
    }),
    ``,
    `---`,
    `*이 리포트를 Claude에게 붙여넣고 분석을 요청하세요.*`,
  ];

  const md = lines.join('\n');
  const filename = `analytics-report-${days}d.md`;
  writeFileSync(filename, md, 'utf-8');
  console.log(`\n✅ 리포트 저장: ${filename}`);
  console.log('\n--- 미리보기 ---\n');
  console.log(md);
}

fetchReport().catch((err) => {
  console.error('❌ 오류:', err.message);
  process.exit(1);
});
