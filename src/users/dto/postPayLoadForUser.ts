import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PostPayLoadForUser{

    @Field(() => String, {nullable: true})
    title: string

    @Field(() => String, {nullable: true})
    content: string
}