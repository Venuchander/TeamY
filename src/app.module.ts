import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module'; // Adjust the path if necessary

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
