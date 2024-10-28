import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stats } from './entities/stats.entity';

@Injectable()
export class PersistenceService {
  constructor(
    @InjectRepository(Stats) private statsRepository: Repository<Stats>
  ) {}

  async addStats(won: string, lost: string) {
    // Find the user who won
    const wonUserStats = await this.statsRepository.findOne({ where: { username: won } });

    // Find the user who lost
    const lostUserStats = await this.statsRepository.findOne({ where: { username: lost } });
    
    // Check if the user who won exists
    if (!wonUserStats) {
      throw new Error(`User with username ${won} not found`);
    }
        
    // Check if the user who lost exists
    if (!lostUserStats) {
      throw new Error(`User with username ${lost} not found`);
    }
    
    // Increment the won count for the winner
    wonUserStats.won += 1;
    
    // Increment the lost count for the loser
    lostUserStats.lost += 1;
    
    // Save the updated stats for both users
    await this.statsRepository.save([wonUserStats, lostUserStats]);
  }

  async createStats(username: string) {
    const userStat = await this.statsRepository.findOne({ where: {username} });
    if (!userStat) {
      return await this.statsRepository.save({username, won: 0, lost: 0}); 
    }
  }

  async userStats(username: string) {
    return await this.statsRepository.findOne({ where: {username} });
  }

  async bestStats(): Promise<Stats[]> {
    // Get the top 10 players with the most wins
    const topPlayers = await this.statsRepository.find({
      order: {
        won: 'DESC', // Order by 'won' in descending order
      },
      take: 10, // Limit to 10 results
    });

    return topPlayers; // Return the list of top players
  }
}
