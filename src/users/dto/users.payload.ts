import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "src/posts/schema/post.schema";
import { PostPayLoadForUser } from "./postPayLoadForUser";

@ObjectType()
export class UserPayLoad{

    @Field(() => ID)
    _id: string

    @Field()
    fullName: string

    @Field()
    email: string

    @Field(() => Int)
    age: number

    @Field(() => [PostPayLoadForUser], {nullable: true})
    posts: Post[]
}