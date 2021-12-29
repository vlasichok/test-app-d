const { sequelize } = require('../../model');
const { PROFILE_TYPE } = require('../../shared/contants')

class AdminService {

  static async getBestProfession(startDate, endDate) {
    try {
      return await sequelize.query(
        `select max(totalPaid) as paid, profession from 
            (select sum(price) as totalPaid, P.profession from Jobs
                left join Contracts C on Jobs.ContractId = C.id
                left join Profiles P on C.ContractorId = P.id
            where Jobs.paid is not null
                and P.type = ?
                and C.createdAt between ? and ?
            group by ContractId)`,
        {
          replacements: [PROFILE_TYPE.CONTRACTOR, startDate, endDate],
          plain: true
        });
    } catch (error) {
      console.error(`[admin.service.getBestProfession] ${error.message}`);
      throw error;
    }
  }

  static async getBestClients(startDate, endDate, limit = 2) {
    try {
      return await sequelize.query(
        `select sum(price) as totalPaid, P.firstName || ' ' || P.lastName as fullName, P.id from Jobs
          left join Contracts C on Jobs.ContractId = C.id
          left join Profiles P on C.ClientId = P.id
        where Jobs.paid is not null
          and P.type = ?
          and C.createdAt between ? and ?
        group by ClientId
        limit ?`,
        {
          replacements: [PROFILE_TYPE.CLIENT, startDate, endDate, limit],
          plain: false
        }).then(result => result[0]);
    } catch (error) {
      console.error(`[admin.service.getBestClients] ${error.message}`);
      throw error;
    }
  }

}

module.exports = AdminService;