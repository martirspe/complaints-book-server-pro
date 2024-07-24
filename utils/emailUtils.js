const moment = require('moment');

exports.formatDate = (date) => moment(date).format('DD/MM/YYYY - hh:mmA');

exports.prepareEmailData = (reclamo) => {
  const { 
    code,
    order_number,
    claimed_amount,
    description,
    detail,
    request,
    Customer,
    ConsumptionType,
    ClaimType
  } = reclamo;

  return {
    claimCode: code,
    customerFirstName: Customer.first_name,
    customerLastName: Customer.last_name,
    consumptionType: ConsumptionType.name,
    claimType: ClaimType.name,
    orderNumber: order_number,
    claimedAmount: claimed_amount,
    claimDescription: description,
    claimDetail: detail,
    claimRequest: request,
  };
};