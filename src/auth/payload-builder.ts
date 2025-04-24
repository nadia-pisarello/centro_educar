import { Persona } from "src/persona/entities/persona.entity";

export function buildPayload(user: Persona): Record<string, any> {
    const basePayload = {
        sub: user.dni,
        username: user.email ?? user.nombre_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        roles: user.roles.map(rol => rol.rol),
    }
    return {
        ...basePayload,
    }

}