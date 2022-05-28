import { FeedbacksRepository } from '../repositories/feedbacks-repository';

export class FindByIdFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository
  ) { }

  async execute(id: string) {
    return this.feedbacksRepository.findById(id);
  }
}
