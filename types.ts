
export enum LabStatus {
  NORMAL = 'Normal',
  LOW = 'Low',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export interface LabResult {
  parameter: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: LabStatus;
  interpretation: string;
}

export interface ReportSummary {
  overview: string;
  keyFindings: string[];
  recommendations: string[];
  labs: LabResult[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface ReportState {
  isProcessing: boolean;
  error: string | null;
  summary: ReportSummary | null;
  history: ChatMessage[];
}
