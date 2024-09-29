import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'

import { AttachmentPresenter } from './attachment-presenter'

export class QuestionDetailsPresenter {
  static toHttp(questionDetails: QuestionDetails) {
    return {
      questionId: questionDetails.questionId.toString(),
      authorId: questionDetails.authorId.toString(),
      bestAnswerId: questionDetails.bestAnswerId?.toString() ?? null,
      attachments: questionDetails.attachments.map(AttachmentPresenter.toHttp),
      authorName: questionDetails.author,
      title: questionDetails.title,
      slug: questionDetails.slug.value,
      content: questionDetails.content,
      createdAt: questionDetails.createdAt,
      updatedAt: questionDetails.updatedAt,
    }
  }
}
