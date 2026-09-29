import { Request } from 'express';

export interface AuthUserPayload {
  id: string;
  email: string;
  role: string;
  name: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUserPayload;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  meta?: {
    isDemoMode?: boolean;
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface QuestionItem {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topic: string;
}

export interface CodeTestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface CodeExecutionResult {
  status: 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'COMPILE_ERROR';
  runtimeMs: number;
  memoryKb: number;
  testCasesPassed: number;
  totalTestCases: number;
  output?: string;
  errorOutput?: string;
  details?: Array<{
    testCaseIndex: number;
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
    isHidden?: boolean;
  }>;
}
