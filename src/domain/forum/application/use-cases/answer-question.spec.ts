import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('answer question use case', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to answer a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      questionId: '1',
      attachmentsIds: ['1', '2'],
      content: 'Answer content',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)

    expect(
      inMemoryAnswersRepository.items[0].attachments.getItems(),
    ).toHaveLength(2)

    expect(inMemoryAnswersRepository.items[0].attachments.getItems()).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
