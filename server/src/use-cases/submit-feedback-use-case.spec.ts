import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const findFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const feedbackRepositoryMock = {
  create: createFeedbackSpy,
  findById: findFeedbackSpy
};

const feedbackAdapterMock = {
  sendMail: sendMailSpy
};

const submitFeedback = new SubmitFeedbackUseCase(
  { ...feedbackRepositoryMock },
  { ...feedbackAdapterMock }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Comentário',
      screenshot: 'data:image/png;base64.imagem.png'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without a type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Comentário',
      screenshot: 'data:image/png;base64.imagem.png'
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without a comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64.imagem.png'
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback withootut a valid screensh', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Comentário',
      screenshot: 'imagem.png'
    })).rejects.toThrow();
  });
});
