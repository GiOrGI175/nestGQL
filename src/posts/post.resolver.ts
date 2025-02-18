import { Context, Query, Resolver } from "@nestjs/graphql";
import { PostsService } from "./posts.service";
import { PostPayLoad } from "./dto/post.payload";
import { UseGuards } from "@nestjs/common";
import { IsAuthGuard } from "./isAuth.guard";

@Resolver()
export class PostResolver{
    constructor(private postService: PostsService){}

    @UseGuards(IsAuthGuard)
    @Query(()=> [PostPayLoad], {nullable: true})
    getPosts(@Context('req') req){
        console.log(req.userId, "userIddd")
        return this.postService.getAllPosts()
    }
}