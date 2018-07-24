const {RuleFactory, VisitScheduleBuilder} = require('rules-config/rules');
const moment = require("moment");
const RuleHelper = require('../RuleHelper');

const DoctorVisitRule = RuleFactory("b80646b2-b74e-415f-974c-f8f48d67b27e", "VisitSchedule");

@DoctorVisitRule("55afa1bf-3c06-4a33-addf-19fa7b5a95a7", "GeneralPostDoctorVisitVisits", 10.0)
class GeneralPostDoctorVisitVisits {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        let followupDate = programEncounter.getObservationReadableValue('Followup date');
        if (!_.isNil(followupDate)) {
            RuleHelper.addSchedule(scheduleBuilder, 'Doctor visit - followup', 'Doctor visit', followupDate, 3);
        }
        RuleHelper.addSchedule(scheduleBuilder, 'Doctor Visit Followup', 'Doctor Visit Followup', moment(programEncounter.encounterDateTime).add(3, 'days').toDate(), 5);
        return scheduleBuilder.getAllUnique("encounterType");
    }
}

module.exports = {
    GeneralPostDoctorVisitVisits: GeneralPostDoctorVisitVisits
};