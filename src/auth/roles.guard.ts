import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const reqRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(),
            context.getClass()
            ]
        )
        if (!reqRoles || reqRoles.length === 0) {
            return true
        }
        const { user } = context.switchToHttp().getRequest()
        if (!user || user.roles) {
            throw new ForbiddenException('Acceso denegado: no hay roles')
        }
        const hasRole = user.roles.some((role: string) =>
            reqRoles.includes(role))
        if (!hasRole) {
            throw new ForbiddenException('Acceso denegado: rol no válido')
        }
        return true
    }
}