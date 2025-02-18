import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/sign-up.dto';
import { signInDto } from './dto/sign-in.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/schema/users.schema';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async signUp(@Args('input') signUpInput: signUpDto): Promise<string> {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => String)
  async signIn(
    @Args('input') signInInput: signInDto,
  ): Promise<{ accesToken: string }> {
    return this.authService.signIn(signInInput);
  }

  @Query(() => User)
  async getCurrentUser(@CurrentUser() userId: string): Promise<User> {
    return this.authService.getCurrentUser(userId);
  }
}
