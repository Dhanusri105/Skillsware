import {
  User,
  UserStats,
  Skill,
  SkillAssessment,
  AssessmentResult,
  Roadmap,
  Course,
  CodingProblem,
  CodeSubmission,
  CodeExecutionResult,
  Portfolio,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem('skillsware_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const json = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(json.error || json.message || `Request failed with status ${response.status}`);
      }

      return json.data !== undefined ? json.data : json;
    } catch (error: any) {
      console.warn(`API request to ${endpoint} failed:`, error.message);
      throw error;
    }
  }

  // Authentication
  async register(data: { name: string; email: string; password: string }): Promise<{ token: string; user: User }> {
    const res = await this.request<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    localStorage.setItem('skillsware_token', res.token);
    return res;
  }

  async login(data: { email: string; password: string }): Promise<{ token: string; user: User }> {
    const res = await this.request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    localStorage.setItem('skillsware_token', res.token);
    return res;
  }

  async getMe(): Promise<{ user: User }> {
    return this.request<{ user: User }>('/auth/me');
  }

  logout(): void {
    localStorage.removeItem('skillsware_token');
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  }

  // Users
  async getProfile(): Promise<User> {
    return this.request<User>('/users/profile');
  }

  async updateProfile(profileData: any): Promise<any> {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async getUserStats(): Promise<UserStats> {
    return this.request<UserStats>('/users/stats');
  }

  // Skills & DNA
  async getSkills(): Promise<Skill[]> {
    return this.request<Skill[]>('/skills');
  }

  async getSkillProfile(): Promise<{ results: AssessmentResult[]; radarData: Array<{ skill: string; proficiency: number; level: string }> }> {
    return this.request('/skills/profile');
  }

  async getAssessment(skillSlug: string): Promise<SkillAssessment> {
    return this.request<SkillAssessment>(`/skills/assessment/${skillSlug}`);
  }

  async submitAssessment(assessmentId: string, answers: Record<string, number>): Promise<AssessmentResult> {
    return this.request<AssessmentResult>('/skills/assessment', {
      method: 'POST',
      body: JSON.stringify({ assessmentId, answers }),
    });
  }

  // Learning Roadmaps
  async getRoadmaps(): Promise<Roadmap[]> {
    return this.request<Roadmap[]>('/roadmaps');
  }

  async getRoadmap(id: string): Promise<Roadmap> {
    return this.request<Roadmap>(`/roadmaps/${id}`);
  }

  async generateRoadmap(params: { careerGoal: string; currentLevel?: string; targetLevel?: string; weeklyHours?: number }): Promise<Roadmap> {
    return this.request<Roadmap>('/roadmaps/generate', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async toggleRoadmapTask(roadmapId: string, taskId: string, isCompleted: boolean): Promise<{ task: any; progressPercentage: number }> {
    return this.request(`/roadmaps/${roadmapId}/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({ isCompleted }),
    });
  }

  // Courses
  async getCourses(filters?: { category?: string; level?: string; search?: string }): Promise<Course[]> {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.level) params.append('level', filters.level);
    if (filters?.search) params.append('search', filters.search);
    return this.request<Course[]>(`/courses?${params.toString()}`);
  }

  async getCourse(slug: string): Promise<Course> {
    return this.request<Course>(`/courses/${slug}`);
  }

  async enrollCourse(courseId: string): Promise<any> {
    return this.request(`/courses/${courseId}/enroll`, {
      method: 'POST',
    });
  }

  async updateLessonProgress(courseId: string, lessonId: string, isCompleted: boolean): Promise<any> {
    return this.request(`/courses/${courseId}/progress`, {
      method: 'PUT',
      body: JSON.stringify({ lessonId, isCompleted }),
    });
  }

  // Code Arena
  async getProblems(filters?: { category?: string; difficulty?: string; search?: string }): Promise<CodingProblem[]> {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.difficulty) params.append('difficulty', filters.difficulty);
    if (filters?.search) params.append('search', filters.search);
    return this.request<CodingProblem[]>(`/problems?${params.toString()}`);
  }

  async getProblem(slug: string): Promise<CodingProblem> {
    return this.request<CodingProblem>(`/problems/${slug}`);
  }

  async runCode(problemId: string, language: string, code: string): Promise<CodeExecutionResult> {
    return this.request<CodeExecutionResult>('/code/run', {
      method: 'POST',
      body: JSON.stringify({ problemId, language, code }),
    });
  }

  async submitCode(problemId: string, language: string, code: string): Promise<{ submission: CodeSubmission; result: CodeExecutionResult }> {
    return this.request<{ submission: CodeSubmission; result: CodeExecutionResult }>('/code/submit', {
      method: 'POST',
      body: JSON.stringify({ problemId, language, code }),
    });
  }

  async getSubmissions(problemId?: string): Promise<CodeSubmission[]> {
    const query = problemId ? `?problemId=${problemId}` : '';
    return this.request<CodeSubmission[]>(`/code/submissions${query}`);
  }

  // Portfolio
  async getPortfolio(): Promise<Portfolio> {
    return this.request<Portfolio>('/portfolio');
  }

  async updatePortfolio(portfolioData: Partial<Portfolio>): Promise<Portfolio> {
    return this.request<Portfolio>('/portfolio', {
      method: 'POST',
      body: JSON.stringify(portfolioData),
    });
  }

  async getPublicPortfolio(slug: string): Promise<Portfolio> {
    return this.request<Portfolio>(`/portfolio/public/${slug}`);
  }
}

export const api = new ApiClient();
