const {RuleFactory} = require('rules-config/rules');
const moment = require("moment");
const EnrolmentRule = RuleFactory("1608c2c0-0334-41a6-aab0-5c61ea1eb069", "VisitSchedule");
const PNCRule = RuleFactory("e09dddeb-ed72-40c4-ae8d-112d8893f18b", "VisitSchedule");
const HomeVisitRule = RuleFactory("35aa9007-fe7a-4a59-b985-0a1c038df889", "VisitSchedule");
const HomeVisitCancelRule = RuleFactory("", "VisitSchedule");
const RuleHelper = require('../RuleHelper');

@EnrolmentRule("0bdfd933-1ba5-4fc1-989f-b4226ae010bd", "ChildPostChildEnrolmentVisits", 10.0)
class ChildPostChildEnrolmentVisits {
    static exec(programEnrolment, visitSchedule = []) {
        let scheduleBuilder = RuleHelper.createEnrolmentScheduleBuilder(programEnrolment, visitSchedule);
        RuleHelper.addSchedule(scheduleBuilder, 'Birth', 'Birth', programEnrolment.enrolmentDateTime, 0);
        if (moment(programEnrolment.individual.dateOfBirth).add(2, 'days').isSameOrBefore(programEnrolment.enrolmentDateTime))
            RuleHelper.addSchedule(scheduleBuilder, 'Child PNC 1', 'Child PNC', programEnrolment.enrolmentDateTime, 0);
        else if (moment(programEnrolment.individual.dateOfBirth).add(10, 'days').isSameOrBefore(programEnrolment.enrolmentDateTime))
            RuleHelper.addSchedule(scheduleBuilder, 'Child PNC 2', 'Child PNC', programEnrolment.enrolmentDateTime, 0);
        return scheduleBuilder.getAllUnique("encounterType");
    }
}

@PNCRule("2f21603a-0bdb-4732-b8fb-cb0bb58cbdc1", "ChildPostPNCVisits", 10.0)
class ChildPostPNCVisits {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        if (programEncounter.name === 'Child PNC 2') {
            return RuleHelper.scheduleOneVisit(scheduleBuilder, 'Child Home Visit', 'Child Home Visit', moment(programEncounter.programEnrolment.individual.dateOfBirth).add(1, 'month').toDate(), 21);
        } else if (programEncounter.name === 'Child PNC 1') {
            return RuleHelper.scheduleOneVisit(scheduleBuilder, 'Child PNC 2', 'Child PNC', moment(programEncounter.programEnrolment.individual.dateOfBirth).add(7, 'days').toDate(), 3);
        } else {
            return visitSchedule;
        }
    }
}

@HomeVisitRule('702f6b57-f46b-47cb-a413-7e609468402e', 'ChildPostHomeVisitVisits', 10.0)
class ChildPostHomeVisitVisits {
    static exec(programEncounter, visitSchedule = []) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        return RuleHelper.scheduleOneVisit(scheduleBuilder, 'Child Home Visit', 'Child Home Visit', moment(programEncounter.encounterDateTime).add(1, 'months').toDate());
    }
}

module.exports = {
    ChildPostChildEnrolmentVisits: ChildPostChildEnrolmentVisits,
    ChildPostPNCVisits: ChildPostPNCVisits,
    ChildPostHomeVisitVisits: ChildPostHomeVisitVisits
};