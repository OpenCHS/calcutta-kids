const {RuleFactory, FormElementStatusBuilder, FormElementsStatusHelper} = require('rules-config/rules');
const DeliveryFilter = RuleFactory("cc6a3c6a-c3cc-488d-a46c-d9d538fcc9c2", 'ViewFilter');
const RuleHelper = require('RuleHelper');

@DeliveryFilter('39f152ec-4b3a-4b08-b4cd-49c569d8a404', 'Skip logic for delivery form')
class DeliveryFilterHandler {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new DeliveryFilterHandler(), programEncounter, formElementGroup, today);
    }

    constructor() {
        this.otherPlaceOfDelivery = (programEncounter, formElement) => {
            return RuleHelper.encounterCodedObsHas(programEncounter, formElement, 'Place of delivery', 'Other');
        };
        this.whyDidYouChooseToHaveABirthAtHome = (programEncounter, formElement) => {
            let formElementStatusBuilder = new FormElementStatusBuilder({programEncounter, formElement});
            formElementStatusBuilder.show().when.valueInEncounter('Place of delivery').containsAnyAnswerConceptName('Home in FB', 'Home outside FB');
            return formElementStatusBuilder.build();
        };
        this.otherReasonToHaveBirthAtHome = (programEncounter, formElement) => {
            return RuleHelper.encounterCodedObsHas(programEncounter, formElement, 'Reason to have birth at home', 'Other');
        };
        this.didYouReceiveJsy = (programEncounter, formElement) => {
            return RuleHelper.encounterCodedObsHas(programEncounter, formElement, 'Place of delivery', 'Government Hospital');
        };
        this.labourTime = (programEncounter, formElement) => {
            return RuleHelper.encounterCodedObsHas(programEncounter, formElement, 'Place of delivery', 'Private hospital');
        };
        this.dateOfDischarge = (programEncounter, formElement) => {
            return new FormElementStatusBuilder({programEncounter, formElement}).show().when.valueInEncounter('Place of delivery').not.containsAnyAnswerConceptName('Home in FB', 'Home outside FB').build();
        };
    }
}

module.exports = DeliveryFilterHandler;