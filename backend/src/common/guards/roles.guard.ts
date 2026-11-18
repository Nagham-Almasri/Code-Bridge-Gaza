import {CanActivate ,ExecutionContext , ForbiddenException , Injectable} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator.js';
import { UserRole } from '../enums/index.js';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly _reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
            const requiredRoles = this._reflector.getAllAndOverride<UserRole[]>(
                ROLES_KEY,
                [context.getHandler(), context.getClass()],
            );

            if(!requiredRoles || requiredRoles.length ===0) return true;

            const user = context.switchToHttp().getRequest().user;
            if(!user || !requiredRoles.includes(user.role))
                throw new ForbiddenException("You do not have permission");
            return true;
            }
    }
