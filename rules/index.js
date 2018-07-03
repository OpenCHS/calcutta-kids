const _ = require('lodash');

module.exports = _.merge({},
    require('./child/childBirthHandler'),
    require('./child/childEnrolmentHandler'),
    require('./child/childHomeVisit'),
    require('./general/doctorVisitFollowupHandler'),
    require('./general/DoctorVisitFormHandler'),
    require('./general/pregnancyTestFollowupFormHandler'),
    require('./mother/motherHomeVisitHandler'),
    require('./pregnancy/ANCDoctorVisitHandler'),
    require('./pregnancy/ANCGmpHandler'),
    require('./pregnancy/ANCHomeVisitFilterHandler'),
    require('./pregnancy/ANCHomeVisitDecisions'),
    require('./pregnancy/DeliveryFilterHandler'),
    require('./pregnancy/EnrolmentFilter'),
    require('./pregnancy/PNCFormHandler'),
    require('./sesHandler'),
    require('./visitSchedule'));
