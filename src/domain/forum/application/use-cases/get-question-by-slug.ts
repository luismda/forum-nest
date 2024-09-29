import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/use-cases/resource-not-found-error'

import { QuestionDetails } from '../../enterprise/entities/value-objects/question-details'
import { QuestionsRepository } from '../repositories/questions-repository'

interface GetQuestionBySlugUseCaseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: QuestionDetails
  }
>

@Injectable()
export class GetQuestionBySlugUseCaseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseCaseRequest): Promise<GetQuestionBySlugUseCaseCaseResponse> {
    const question = await this.questionsRepository.findDetailsBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({
      question,
    })
  }
}
