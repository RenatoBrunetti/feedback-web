export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbackFindData {
  id: string;
  type: string;
  comment: string;
  screenshot: string | null;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
  findById: (id: string) => Promise<FeedbackFindData | null>;
}
