import { NextFunction, Request, Response } from "express";

import UserService from "@/resources/user/userService";

import { BadRequestError } from "../error";

class IDCheck {
  private static userService: UserService = new UserService();

  public static check(req: Request, _res: Response, next: NextFunction) {
    const userId: string = req.cookies.user_id;
    const isUserIdValid: boolean = this.userService.findById({ _id: userId });
    if (!isUserIdValid) {
      throw new BadRequestError();
    } else next();
  }
}

export default IDCheck;
