import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { z } from 'zod'

import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const userFromEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!userFromEmail) {
      throw new UnauthorizedException('User credentials does not match.')
    }

    const isPasswordValid = await compare(password, userFromEmail.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials does not match.')
    }

    const accessToken = this.jwt.sign({ sub: userFromEmail.id })

    return {
      access_token: accessToken,
    }
  }
}
