import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [RecommendationController],
  providers: [PrismaService, RecommendationService],
})
export class RecommendationModule {}
