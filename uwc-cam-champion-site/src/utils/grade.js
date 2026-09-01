// Grade bands — adjust these if your institution's actual cutoffs differ.
export const PASS_THRESHOLD = 50;
export const DISTINCTION_THRESHOLD = 75;

export const TONE_CLASSES = {
  fail: { bg: "bg-rose-100", text: "text-rose-700" },
  pass: { bg: "bg-amber-100", text: "text-amber-700" },
  merit: { bg: "bg-indigo-100", text: "text-indigo-700" },
  distinction: { bg: "bg-emerald-100", text: "text-emerald-700" },
};

export function getGrade(mark) {
  if (mark >= DISTINCTION_THRESHOLD) return { label: "Distinction", tone: "distinction" };
  if (mark >= 60) return { label: "Merit", tone: "merit" };
  if (mark >= PASS_THRESHOLD) return { label: "Pass", tone: "pass" };
  return { label: "Fail", tone: "fail" };
}

// Weighted projection using taskWeight as each task's DIRECT, ABSOLUTE
// contribution to the module total (e.g. "Practical Tests: 10% towards
// final mark" from a module outline — not a share within a category).
//
// categoryWeight is NOT used in this calculation. It's treated as a
// denormalized display-only total (e.g. showing "Practicals — 30% of
// module" as a section header), since it's just the sum of its category's
// taskWeights, repeated on every row in that category.
//
// Evidence for this over a multiplicative model (punch-list item #6):
// a real module outline lists "Practical Tests: 10%" and "SAS Project: 20%"
// as absolute percentages that sum directly to the "Practicals: 30%"
// category total — not as within-category shares (which would need to be
// 33.3%/66.7% for the multiplicative version to work). Still worth a final
// confirmation against actual stored DB values before treating as settled.
//
// `marks` maps assessmentId -> mark to use for that assessment (actual
// mark if graded, projected/slider value if pending).
export function projectCam(assessments, marks) {
  const weightOf = (a) => a.taskWeight ?? a.weight ?? 0;

  const totalWeight = assessments.reduce((sum, a) => sum + weightOf(a), 0);
  if (totalWeight === 0) return 0;

  const weightedSum = assessments.reduce((sum, a) => {
    const mark = marks[a.id] ?? 0;
    return sum + mark * weightOf(a);
  }, 0);

  return Math.round(weightedSum / totalWeight);
}