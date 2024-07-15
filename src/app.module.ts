import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RecommendationModule } from './recommendation/recommendation.module';

@Module({
  imports: [UserModule, RecommendationModule],
})
export class AppModule {}
