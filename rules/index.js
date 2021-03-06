const _ = require('lodash');

module.exports = _.merge({},
    require('./child/childBirthHandler'),
    require('./child/childEnrolmentHandler'),
    require('./child/childHomeVisit'),
    require('./child/pncHandler'),
    require('./child/pncDoctorCheckupHandler'),
    require('./general/doctorVisitFollowupHandler'),
    require('./general/labTestHandler'),
    require('./general/DoctorVisitFormHandler'),
    require('./general/registrationHandler'),
    require('./general/doctorVisitCancelFormHandler'),
    require('./mother/enrolmentHandler'),
    require('./mother/motherHomeVisitHandler'),
    require('./pregnancy/ANCDoctorVisitHandler'),
    require('./pregnancy/ANCGmpHandler'),
    require('./pregnancy/PostAbortionHandler'),
    require('./pregnancy/ANCHomeVisitFilterHandler'),
    require('./pregnancy/ANCHomeVisitDecisions'),
    require('./pregnancy/DeliveryFilterHandler'),
    require('./pregnancy/EnrolmentFilter'),
    require('./pregnancy/PNCFormHandler'),
    require('./sesHandler'),
    require('./visitSchedule'),
    require('./encounterCancelHandler'),
    require('./pregnancy/AbortionHandler')
);
