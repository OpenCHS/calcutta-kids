const {RuleFactory, FormElementStatusBuilder, FormElementsStatusHelper, complicationsBuilder} = require('rules-config/rules');

const childBirthFilter = RuleFactory("901e2f48-2fb8-402b-9073-ee2fac33fce4", "ViewFilter");

@childBirthFilter("36df512b-d2dd-4ece-b64b-09b09420b4e0", "Child Birth form rules [CK]", 100.0, {})
class BirthFormRules {
    afterHowManyDaysDidTheChildStartBreastfeeding(programEncounter, formElement) {
        const statusBuilder = this._statusBuilder(programEncounter, formElement);
        statusBuilder.show().when.valueInEncounter("Child was first breast fed")
            .containsAnswerConceptName("After a day");
        return statusBuilder.build();
    }

    whyDidTheBabyNotReceiveColostrum(programEncounter, formElement) {
        const statusBuilder = this._statusBuilder(programEncounter, formElement);
        statusBuilder.show().when.valueInEncounter("Did the baby receive colostrums (first milk)?")
            .containsAnswerConceptName("No");
        return statusBuilder.build();
    }

    whatOtherReasonForBabyNotReceivingColostrum(programEncounter, formElement) {
        const statusBuilder = this._statusBuilder(programEncounter, formElement);
        statusBuilder.show().when.valueInEncounter("Baby did not receive colostrum because")
            .containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    whichOfTheseWasBabyGivenBeforeBreastfeeding(programEncounter, formElement) {
        const statusBuilder = this._statusBuilder(programEncounter, formElement);
        statusBuilder.show().when.valueInEncounter("Was the baby fed anything else before breastfeeding?")
            .containsAnswerConceptName("Yes");
        return statusBuilder.build();
    }

    whatOtherThingsWasBabyFedBeforeBreastfeeding(programEncounter, formElement) {
        const statusBuilder = this._statusBuilder(programEncounter, formElement);
        statusBuilder.show().when.valueInEncounter("Other things baby was fed before breastfeeding")
            .containsAnswerConceptName("Other");
        return statusBuilder.build();
    }

    _statusBuilder(programEncounter, formElement) {
        return new FormElementStatusBuilder({
            programEncounter: programEncounter,
            formElement: formElement
        });
    }

    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper.getFormElementsStatusesWithoutDefaults(new BirthFormRules(), programEncounter, formElementGroup, today)
    }
}


module.exports = BirthFormRules;