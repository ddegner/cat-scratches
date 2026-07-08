// Shared scoring primitives. Semantics are identical to score.mjs /
// ab-selectors.mjs: token-set recall/precision/F1 over lowercased
// alphanumeric runs >=3 chars (stopword-free), plus block-level
// missing/extra counts (<30% token overlap).

const STOP = new Set(
  "the a an and or but if then of to in on at for by with from as is are was were be been being this that these those it its it's i you he she we they them his her our your my"
    .split(/\s+/),
);

// Markdown link targets are presentation, not content: expected.md baselines
// are written without them, so strip `(url)` from links/images and bare
// autolinks on BOTH sides before comparing, keeping only the visible text.
export const stripLinkTargets = (s) =>
  (s || "")
    .replace(/(!?\[[^\]]*\])\([^)]*\)/g, "$1")
    .replace(/<https?:\/\/[^>\s]+>/g, " ");

export const tokens = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 3 && !STOP.has(t));

export const blocks = (s) =>
  (s || "")
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter((b) => b.length > 0 && !/^#{1,6}\s/.test(b));

export const overlap = (a, b) => {
  const B = b instanceof Set ? b : new Set(b);
  let hit = 0;
  for (const t of a) if (B.has(t)) hit++;
  return a.length === 0 ? 0 : hit / a.length;
};

// Fraction of tokens in `a` (array) that also appear in `b` (array or Set).
export const containment = overlap;

export function scoreText(extractedRaw, expectedRaw) {
  const extracted = stripLinkTargets(extractedRaw);
  const expected = stripLinkTargets(expectedRaw);
  const et = tokens(extracted);
  const xt = tokens(expected);
  const ets = new Set(et);
  const xts = new Set(xt);
  const inter = [...xts].filter((t) => ets.has(t)).length;
  const recall = xts.size ? inter / xts.size : 0;
  const precision = ets.size ? inter / ets.size : 0;
  const f1 = recall + precision ? (2 * recall * precision) / (recall + precision) : 0;

  const expBlocks = blocks(expected).map(tokens);
  const extBlocks = blocks(extracted).map(tokens);
  const missing = expBlocks.filter((b) => overlap(b, ets) < 0.3).length;
  const extra = extBlocks.filter((b) => overlap(b, xts) < 0.3).length;

  return {
    f1,
    recall,
    precision,
    lenRatio: expected.length ? extracted.length / expected.length : 0,
    missing,
    extra,
  };
}

// Same objective as ab-selectors.mjs: F1 dominates, precision/recall break
// ties, length drift and block noise are small penalties.
export function summarize(rows) {
  const mean = (key) => rows.reduce((sum, row) => sum + (row[key] || 0), 0) / (rows.length || 1);
  const lenCloseness =
    rows.reduce((sum, row) => sum + Math.abs(Math.log(row.lenRatio || 0.0001)), 0) /
    (rows.length || 1);
  const summary = {
    pages: rows.length,
    f1: mean("f1"),
    recall: mean("recall"),
    precision: mean("precision"),
    lenRatio: mean("lenRatio"),
    lenCloseness,
    missing: mean("missing"),
    extra: mean("extra"),
  };
  summary.objective =
    summary.f1 * 1_000_000 +
    summary.precision * 20_000 +
    summary.recall * 2_000 -
    summary.lenCloseness * 500 -
    summary.missing * 10 -
    summary.extra * 10;
  return summary;
}

export const round = (n, d = 4) => +Number(n || 0).toFixed(d);
