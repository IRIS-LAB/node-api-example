import Sequelize from 'sequelize'

export default database => {
  // Mapping smart_group
  const Groups = database.define(
    'smart_group',
    {
      id: { type: Sequelize.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true },
      code: { type: Sequelize.STRING, allowNull: false },
      label: { type: Sequelize.STRING, allowNull: false },
      roleAdmin: { type: Sequelize.STRING, allowNull: false, field: 'role_admin' }
    },
    { tableName: 'smart_group', createdAt: false, updatedAt: false }
  )
  return { Groups }
}
