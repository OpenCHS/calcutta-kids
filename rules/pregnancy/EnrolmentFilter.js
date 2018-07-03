const { RuleFactory, FormElementStatus, FormElementsStatusHelper } = require('rules-config/rules');

const RuleHelper = require('../RuleHelper');
const ObservationMatcherAnnotationFactory = require('../ObservationMatcherAnnotationFactory');
const CodedObservationMatcher = ObservationMatcherAnnotationFactory(RuleHelper.Scope.Enrolment, 'containsAnyAnswerConceptName')(['programEnrolment', 'formElement']);

const ViewFilter = RuleFactory('026e2f5c-8670-4e4b-9a54-cb03bbf3093d', 'ViewFilter');

const _gravidaBreakup = [
    'Number of miscarriages',
    'Number of abortions',
    'Number of stillbirths',
    'Number of child deaths',
    'Number of living children'
];
const _computeGravida = (programEnrolment) => _gravidaBreakup.map((cn) => programEnrolment.getObservationValue(cn))
    .filter(Number.isFinite)
    .reduce((a, b) => a + b, 1);

@ViewFilter('40202177-7142-45c1-bf70-3d3b432799c0', 'Pregnancy enrolment view handler', 100.0, {})
class PregnancyEnrolmentViewFilterHandler {

    @CodedObservationMatcher('Is this your first pregnancy?', ['No'])
    ageAtFirstPregnancy() { }

    @CodedObservationMatcher('Is this your first pregnancy?', ['No'])
    numberOfMiscarriages() { }

    @CodedObservationMatcher('Is this your first pregnancy?', ['No'])
    numberOfMedicallyTerminatedPregnancies() { }

    @CodedObservationMatcher('Is this your first pregnancy?', ['No'])
    numberOfStillbirths() { }

    @CodedObservationMatcher('Is this your first pregnancy?', ['No'])
    numberOfChildDeaths() { }

    @CodedObservationMatcher('Is this your first pregnancy?', ['No'])
    numberOfLivingChildren() { }

    @CodedObservationMatcher('Family history', ['Other'])
    otherFamilyHistory() { }

    bmi(programEnrolment, formElement, today) {
        let value;
        let height = programEnrolment.findLatestObservationInEntireEnrolment("Height", programEnrolment);
        let weight = programEnrolment.findLatestObservationInEntireEnrolment("Weight", programEnrolment);
        return RuleHelper.createBMIFormElementStatus(height, weight, formElement);
    }

    gravida(programEnrolment, formElement) {
        const isFirstPregnancy = programEnrolment.getObservationReadableValue('Is this your first pregnancy?') === 'Yes';
        return new FormElementStatus(formElement.uuid, true, isFirstPregnancy ? 1 : _computeGravida(programEnrolment));
    }

    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new PregnancyEnrolmentViewFilterHandler(), programEncounter, formElementGroup, today);
    }
}

module.exports = { PregnancyEnrolmentViewFilterHandler };