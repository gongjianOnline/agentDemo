import { Controller, Get } from '@nestjs/common';
import {UserService} from "./user.service.js"

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/info")
  getHello(): string {
    return this.userService.getHello();
  }
}
