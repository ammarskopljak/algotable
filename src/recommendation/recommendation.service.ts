import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RecommendationService {
  constructor(private prisma: PrismaService) {}

  async getUserRecommendations(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw 'user not found';
    }
    const userInterests = user.interests;

    const simmilarUsers = await this.prisma.user.findMany({
      where: {
        id: { not: userId },
        interests: { hasSome: userInterests },
      },
    });

    const productCounts = new Map<string, number>();

    simmilarUsers.forEach((simmilarUser) => {
      simmilarUser.itemHistory.forEach((item) => {
        if (!user.itemHistory.includes(item)) {
          if (productCounts.has(item)) {
            productCounts.set(item, productCounts.get(item) + 1);
          } else {
            productCounts.set(item, 1);
          }
        }
      });
    });

    const sortedProductsRecommendations = Array.from(productCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0]);

    return sortedProductsRecommendations;
  }
}
