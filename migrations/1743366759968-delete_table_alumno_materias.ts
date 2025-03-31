import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteTableAlumnoMaterias1743366759968 implements MigrationInterface {
    name = 'DeleteTableAlumnoMaterias1743366759968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`persona_rol\`
            ADD CONSTRAINT \`FK_298a83f5ca3ada58c94d495557d\` FOREIGN KEY (\`dni_persona\`) REFERENCES \`persona\`(\`dni\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`persona_rol\`
            ADD CONSTRAINT \`FK_5ff9e387d6f9799db44a7c2a658\` FOREIGN KEY (\`id_rol\`) REFERENCES \`rol\`(\`id_rol\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`factura\`
            ADD CONSTRAINT \`FK_c3db3857781a5a9792c32f70f53\` FOREIGN KEY (\`dni_alumno\`, \`dni_alumno\`) REFERENCES \`alumno\`(\`dni_alumno\`, \`legajo\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`alumno\`
            ADD CONSTRAINT \`FK_71a96642e14978878e1d7b2a87b\` FOREIGN KEY (\`personaDni\`) REFERENCES \`persona\`(\`dni\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`materia\`
            ADD CONSTRAINT \`FK_8021df38491d00b730fc46e7625\` FOREIGN KEY (\`nombre_nivel\`) REFERENCES \`nivel\`(\`nivel\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`nota\`
            ADD CONSTRAINT \`FK_f89a32c6aa378e9dfe54aee7ab7\` FOREIGN KEY (\`nombre_materia\`) REFERENCES \`materia\`(\`nombre_materia\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`horario_clase\`
            ADD CONSTRAINT \`FK_7b2ee493510dc6d1f2b1fa84b4b\` FOREIGN KEY (\`nombre_materia\`) REFERENCES \`materia\`(\`nombre_materia\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`horario_clase\`
            ADD CONSTRAINT \`FK_d57148118c8d1b1a47c41fb6dca\` FOREIGN KEY (\`nombre_aula\`) REFERENCES \`aula\`(\`nombre\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`familiar\`
            ADD CONSTRAINT \`FK_c99b8377c659b2b458818167720\` FOREIGN KEY (\`dni_familiar\`) REFERENCES \`persona\`(\`dni\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`familiar_alumno\`
            ADD CONSTRAINT \`FK_33fcdf8b682a3eff8b8fe760ddd\` FOREIGN KEY (\`dni_familiar\`) REFERENCES \`familiar\`(\`dni_familiar\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`familiar_alumno\`
            ADD CONSTRAINT \`FK_7d20a4c90d4ea8caf31cfe6eea6\` FOREIGN KEY (\`dni_alumno\`, \`dni_alumno\`) REFERENCES \`alumno\`(\`dni_alumno\`, \`legajo\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`cuota\`
            ADD CONSTRAINT \`FK_44b5bb66ccfe93d5ae458549d4e\` FOREIGN KEY (\`dni_alumno\`, \`dni_alumno\`) REFERENCES \`alumno\`(\`dni_alumno\`, \`legajo\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`detalle_factura\`
            ADD CONSTRAINT \`FK_6afd5c2fc15b0c1564cfd2bdd89\` FOREIGN KEY (\`nro_factura\`, \`tipo_factura\`) REFERENCES \`factura\`(\`numero\`, \`tipo\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`detalle_factura\`
            ADD CONSTRAINT \`FK_ab06034ed8e6a2da3b458eb8c07\` FOREIGN KEY (\`nro_cuota\`, \`nro_cuota\`) REFERENCES \`cuota\`(\`nro_cuota\`, \`dni_alumno\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`docente\`
            ADD CONSTRAINT \`FK_9fd73426e8a78bd92c2191ee372\` FOREIGN KEY (\`dni_docente\`) REFERENCES \`persona\`(\`dni\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asistencia\`
            ADD CONSTRAINT \`FK_f95fe4b9be714ed3311da2dc9b9\` FOREIGN KEY (\`legajo_alumno\`, \`legajo_alumno\`) REFERENCES \`alumno\`(\`dni_alumno\`, \`legajo\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`materias_alumnos\`
            ADD CONSTRAINT \`FK_7db1eb0eaa5d4766a08ed40e034\` FOREIGN KEY (\`materia\`) REFERENCES \`materia\`(\`nombre_materia\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`materias_alumnos\`
            ADD CONSTRAINT \`FK_b1ae604b4dc9a45ebff7e94cee5\` FOREIGN KEY (\`legajo_alumno\`) REFERENCES \`alumno\`(\`legajo\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`materias_alumnos\` DROP FOREIGN KEY \`FK_b1ae604b4dc9a45ebff7e94cee5\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`materias_alumnos\` DROP FOREIGN KEY \`FK_7db1eb0eaa5d4766a08ed40e034\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asistencia\` DROP FOREIGN KEY \`FK_f95fe4b9be714ed3311da2dc9b9\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`docente\` DROP FOREIGN KEY \`FK_9fd73426e8a78bd92c2191ee372\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`detalle_factura\` DROP FOREIGN KEY \`FK_ab06034ed8e6a2da3b458eb8c07\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`detalle_factura\` DROP FOREIGN KEY \`FK_6afd5c2fc15b0c1564cfd2bdd89\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`cuota\` DROP FOREIGN KEY \`FK_44b5bb66ccfe93d5ae458549d4e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`familiar_alumno\` DROP FOREIGN KEY \`FK_7d20a4c90d4ea8caf31cfe6eea6\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`familiar_alumno\` DROP FOREIGN KEY \`FK_33fcdf8b682a3eff8b8fe760ddd\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`familiar\` DROP FOREIGN KEY \`FK_c99b8377c659b2b458818167720\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`horario_clase\` DROP FOREIGN KEY \`FK_d57148118c8d1b1a47c41fb6dca\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`horario_clase\` DROP FOREIGN KEY \`FK_7b2ee493510dc6d1f2b1fa84b4b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`nota\` DROP FOREIGN KEY \`FK_f89a32c6aa378e9dfe54aee7ab7\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`materia\` DROP FOREIGN KEY \`FK_8021df38491d00b730fc46e7625\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`alumno\` DROP FOREIGN KEY \`FK_71a96642e14978878e1d7b2a87b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`factura\` DROP FOREIGN KEY \`FK_c3db3857781a5a9792c32f70f53\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`persona_rol\` DROP FOREIGN KEY \`FK_5ff9e387d6f9799db44a7c2a658\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`persona_rol\` DROP FOREIGN KEY \`FK_298a83f5ca3ada58c94d495557d\`
        `);
    }

}
