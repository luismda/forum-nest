import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'

import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CommentPresenter } from '../presenters/comment-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions/:questionId/comments')
export class FetchQuestionCommentsController {
  constructor(private fetchQuestionComments: FetchQuestionCommentsUseCase) {}

  @Get()
  async handle(
    @Param('questionId') questionId: string,
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const result = await this.fetchQuestionComments.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { questionComments } = result.value

    return { comments: questionComments.map(CommentPresenter.toHttp) }
  }
}
