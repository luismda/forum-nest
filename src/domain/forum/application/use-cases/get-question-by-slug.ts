import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/use-cases/resource-not-found-error'

import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface GetQuestionBySlugUseCaseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCaseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseCaseRequest): Promise<GetQuestionBySlugUseCaseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({
      question,
    })
  }
}
