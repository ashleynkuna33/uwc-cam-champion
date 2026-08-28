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

// Generic weighted-average projection: every assessment in the module
// contributes to one final CAM. `marks` maps assessmentId -> mark to use
// for that assessment (actual mark if graded, projected/slider value if
// pending). `assessments` supplies the weights.
export function projectCam(assessments, marks) {
  const totalWeight = assessments.reduce((sum, a) => sum + a.weight, 0);
  if (totalWeight === 0) return 0;
  const weightedSum = assessments.reduce(
    (sum, a) => sum + (marks[a.id] ?? 0) * a.weight,
    0
  );
  return Math.round(weightedSum / totalWeight);
}