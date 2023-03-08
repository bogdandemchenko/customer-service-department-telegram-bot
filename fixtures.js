const user1 = {
    id: '123',
    isOnLine: true,
};

const marketingCompany1 = {
    id: '123',
    tries: 4,
};

const marketingCompany2 = {
    id: '1234',
    tries: 5,
};

const lead1 = {
    id: '123',
    tries: 3,
    lastCallerId: user1.id,
    marketingCompanyId: marketingCompany1.id,
};

const lead3 = {
    id: '478',
    tries: 1,
    lastCallerId: user1.id,
    marketingCompanyId: marketingCompany2.id,
};

const lead2 = {
    id: '456',
    tries: 5,
    lastCallerId: user1.id,
    marketingCompanyId: marketingCompany2.id,
};

const users = {
    [user1.id]: user1,
    ids: [user1.id],
};

const leads = {
    [lead1.id]: lead1,
    [lead2.id]: lead2,
    [lead3.id]: lead3,
    ids: [lead1.id, lead2.id, lead3.id],
};

const marketingCompanies = {
    [marketingCompany1.id]: marketingCompany1,
    [marketingCompany2.id]: marketingCompany2,
    ids: [marketingCompany1.id, marketingCompany2.id],
};

module.exports = {
    users,
    user1,
    leads,
    marketingCompanies,
};