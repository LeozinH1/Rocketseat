import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm'

export default class AlterProvideFieldToProviderId1613689766665
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointment', 'provider')
        await queryRunner.addColumn(
            'appointment',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            }),
        )

        await queryRunner.createForeignKey(
            'appointment',
            new TableForeignKey({
                name: 'AppointmentProvider',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointment', 'AppointmentProvider')
        await queryRunner.dropColumn('provider', 'provider_id')
        await queryRunner.addColumn(
            'appointment',
            new TableColumn({
                name: 'provider',
                type: 'varchar',
            }),
        )
    }
}
