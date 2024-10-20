import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { UserAlreadyExistsException } from "src/common/exceptions/user-already-exists.exception";
import { Response } from 'express';

@Catch(UserAlreadyExistsException)
export class UserAlreadyExistsExceptionFilter implements ExceptionFilter {
    catch(exception: UserAlreadyExistsException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();  // Corrected this line to get the response object

        response.status(HttpStatus.BAD_REQUEST).send({
            statusCode: HttpStatus.BAD_REQUEST,  // Use the appropriate status code
            message: exception.message,
        });
    }
}