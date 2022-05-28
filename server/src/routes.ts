import { Request, Response, Router } from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { FindByIdFeedbackUseCase } from './use-cases/find-feedback-use-case';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const router = Router();

interface FeedbackInputType {
  type: string;
  comment: string;
  screenshot?: string;
}

router.get('/healthcheck', (req: Request, res: Response) => {
  return res.status(200).send();
});

router.post('/feedbacks', async (req: Request, res: Response) => {
  const { type, comment, screenshot }: FeedbackInputType = req.body;

  const prismaFeedbackRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  });

  return res.status(201).send();
});

router.get('/feedbacks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const prismaFeedbackRepository = new PrismaFeedbacksRepository();
  const findByIdFeedbackUseCase = new FindByIdFeedbackUseCase(prismaFeedbackRepository);

  const feedback = await findByIdFeedbackUseCase.execute(id);
  return res.status(200).json({ data: feedback });
});
