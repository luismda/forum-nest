import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { z } from 'zod'

import { CurrentUser } from '@/auth/current-user-docorator'
import { UserPayload } from '@/auth/jwt.strategy'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'

const createQuestionBodySchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createQuestionBodySchema))
  async handle(
    @Body() body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const userId = user.sub

    const slug = this.createSlugFromTitle(title)

    await this.prisma.question.create({
      data: {
        authorId: userId,
        slug,
        title,
        content,
      },
    })
  }

  private createSlugFromTitle(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u836f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }
}
