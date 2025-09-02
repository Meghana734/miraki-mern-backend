import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BlogsModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@miraki.lkjmada.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=miraki`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
