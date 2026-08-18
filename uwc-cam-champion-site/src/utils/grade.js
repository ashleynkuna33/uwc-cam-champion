

export const CURRENT_CAM = 63;    

export const LOCKED_WEIGHT = 70;     

export const ASSIGNMENT2_WEIGHT = 10;  
export const FINAL_EXAM_WEIGHT = 20;   

export const REMAINING_WEIGHT = ASSIGNMENT2_WEIGHT + FINAL_EXAM_WEIGHT;
export const DISTINCTION_THRESHOLD = 75;

export const LOCKED_CONTRIBUTION = (CURRENT_CAM / 100) * LOCKED_WEIGHT;

export function projectCam(assignment2Score, examScore) {
 
        const a2Contrib = (assignment2Score / 100) * ASSIGNMENT2_WEIGHT;
    const examContrib = (examScore / 100) * FINAL_EXAM_WEIGHT;
    const value = LOCKED_CONTRIBUTION + a2Contrib + examContrib;
  return Math.round(Math.min(100, Math.max(0, value)));
}

export function getGrade(cam) {
            if (cam >= DISTINCTION_THRESHOLD) return { label: "Distinction", tone: "emerald" };
            if (cam >= 60) return { label: "Merit", tone: "indigo" };
        if (cam >= 50) return { label: "Pass", tone: "amber" };
    return { label: "Fail", tone: "red" };
}

export const TONE_CLASSES = {
  emerald: { bg: "bg-emerald-100", text: "text-emerald-700" },
        indigo: { bg: "bg-indigo-100", text: "text-indigo-700" },
        amber: { bg: "bg-amber-100", text: "text-amber-700" },
  red: { bg: "bg-red-100", text: "text-red-700" },
};