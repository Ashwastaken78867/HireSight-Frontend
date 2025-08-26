// src/types/index.ts
export interface IJobApplication {
  _id: string;
  candidateName: string;
  role: string;
  experience: number;
  resumeLink: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  createdAt: string;
}
