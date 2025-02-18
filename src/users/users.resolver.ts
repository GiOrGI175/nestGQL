import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./users.service";
import { UserPayLoad } from "./dto/users.payload";
import { UserIdInput } from "./dto/user-id.input";
import { CreateUserInput } from "./dto/user.input";


@Resolver()
export class UsersResolver {
    constructor(private usersService: UserService){}

    @Query(() => String)
    getHello(@Context('req') req){
        console.log(req.headers,' headers')
        return 'hello world'
    }

    @Query(() => [UserPayLoad], {nullable: true})
    getUsers(){
        return this.usersService.getAllUsers()
    }

    @Query(() => UserPayLoad, {nullable: true})
    getUserById(@Args('id') {id}: UserIdInput){
        return this.usersService.getUserById(id)
    }

    @Mutation(() => UserPayLoad, {nullable: true})
    createUser( @Args('createUserInput') userInput: CreateUserInput){
        return this.usersService.createUser(userInput)
    }

}
