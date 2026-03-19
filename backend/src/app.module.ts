import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { StudentsModule } from './students/students.module';
import { DatabaseModule } from './database/database.module';
import configuration from './config/configuration';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    
    // Rate limiting
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 100,
    }]),
    
    // Feature modules
    StudentsModule,
    DatabaseModule,
  ],
})
export class AppModule {}