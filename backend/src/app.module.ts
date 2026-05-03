import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'maraluna2026',
  database: 'gestion_proyectos',
  autoLoadEntities: true,
  synchronize: false,
  }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
