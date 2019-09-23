import { Util } from '../util/util';

var todate;
const construct = function (constructor, argsArray) {


  function F(): void {
    constructor.apply(this, argsArray);
  }
  F.prototype = constructor.prototype;
  return new F();
}

const empty = function (constructor, numArgs: number) {
  todate = Util.todate(new Date());
  const nullArgs = new Array(numArgs).fill(null);
  return construct(constructor, nullArgs);
}

// ####################################################################
// ############################## MAIN Class ##########################
// ####################################################################

export class TransactionCreateCcrDocument {
  static empty(): TransactionCreateCcrDocument {
    const emptyObj = empty(TransactionCreateCcrDocument, 5);
    return emptyObj;
  }

  static sampleSubmitSr(): TransactionCreateCcrDocument {
    const sample: TransactionCreateCcrDocument = TransactionCreateCcrDocument.empty();

    sample.remainingAmount = 0;
    sample.comment = 'ABC';

    return sample;
  }

  static SubmitSr(): TransactionCreateCcrDocument {
    const sample: TransactionCreateCcrDocument = TransactionCreateCcrDocument.empty();

    sample.remainingAmount = 0;
    sample.comment = "";

    return sample;
  }

  constructor(
    //public hospital: FieldsHospital,
    public patient: FieldsPatient,
    public physician: FieldsPhysician,
    public physicianReport: FieldsPhysicianReport,
    public receipt: FieldsReceipt,
    public remainingAmount: number,
    public comment: string
  ) { }
}

export class TransactionSaveCcrDocument {
  static empty(): TransactionSaveCcrDocument {
    const emptyObj = empty(TransactionSaveCcrDocument, 3);
    return emptyObj;
  }

  static sampleSubmitSr(): TransactionSaveCcrDocument {
    const sample: TransactionSaveCcrDocument = TransactionSaveCcrDocument.empty();

    sample.citizenID = "1234567891234";
    sample.receiptNo = '784572';

    return sample;
  }

  static SubmitSr(): TransactionSaveCcrDocument {
    const sample: TransactionSaveCcrDocument = TransactionSaveCcrDocument.empty();

    sample.citizenID = "";
    sample.receiptNo = "";

    return sample;
  }

  constructor(
    //public hospital: FieldsHospital,
    public citizenID: string,
    public receiptNo: string
  ) { }
}
// ####################################################################
// ############################## SUB Class ###########################
// ####################################################################

// export class FieldsHospital {
//   static empty(): FieldsHospital {
//     return empty(FieldsHospital, 1);
//   }

//   static sample(): FieldsHospital {
//     const sample = FieldsHospital.empty();

//     sample.firstSight = "";

//     return sample;
//   }

//   constructor (
//       public firstSight: string
//   ) {}
// }

export class FieldsPatient {
  static empty(): FieldsPatient {
    //   return empty(FieldsPatient, 3);
    const emptyObj = empty(FieldsPatient, 3);
    emptyObj['$class'] = 'com.bestedit.rpt.FieldsPatient';
    return emptyObj;
  }

  static sample(): FieldsPatient {
    const sample = FieldsPatient.empty();

    sample.citizenID = "1234567891234";
    sample.patientType = "INPATIENT DEPARTMENT";
    sample.patientID = "56847";
    sample.email = "best58050244@gmail.com"
    return sample;
  }

  static SubmitSr(): FieldsPatient {
    const sample = FieldsPatient.empty();

    sample.citizenID = "";
    sample.patientType = "";
    sample.patientID = "";
    sample.email = ""
    return sample;
  }

  constructor(
    public citizenID: string,
    public patientType: string,
    public patientID: string,
    public email: string

  ) { }
}

export class FieldsPhysician {
  static empty(): FieldsPhysician {
    return empty(FieldsPhysician, 2);
  }

  static sample(): FieldsPhysician {
    const sample = FieldsPhysician.empty();

    sample.medicalSpecialty = "Orthopedic surgeon";

    return sample;
  }

  static SubmitSr(): FieldsPhysician {
    const sample = FieldsPhysician.empty();

    sample.medicalSpecialty = "";

    return sample;
  }

  constructor(
    public medicalSpecialty: string
  ) { }
}




export class FieldsPhysicianReport {
  static empty(): FieldsPhysicianReport {
    return empty(FieldsPhysicianReport, 16);
  }

  static sample(): FieldsPhysicianReport {
    const sample = FieldsPhysicianReport.empty();
    sample.admissionDate = new Date('2018-02-20');
    sample.dischageDate = new Date('2018-05-02');
    sample.vitalSignsT = "37";
    sample.vitalSignsBP = "100/65";
    sample.vitalSignsP = "75";
    sample.vitalSignsRP = "15";
    sample.clinicalFinding = "Damage from accident and rain";
    sample.underlyingDiseases = "High Blood Pressure";
    sample.illnesRelatedAddiction = "-";
    sample.patientPregnant = "NO";
    sample.gestationAge = "-";
    sample.HIV = "NO";
    sample.HIVResult = "-";

    return sample;
  }

  static SubmitSr(): FieldsPhysicianReport {
    const sample = FieldsPhysicianReport.empty();
    sample.admissionDate = new Date('');
    sample.dischageDate = new Date('');
    sample.vitalSignsT = "";
    sample.vitalSignsBP = "";
    sample.vitalSignsP = "";
    sample.vitalSignsRP = "";
    sample.clinicalFinding = "";
    sample.underlyingDiseases = "";
    sample.illnesRelatedAddiction = "";
    sample.patientPregnant = "";
    sample.gestationAge = "";
    sample.HIV = "";
    sample.HIVResult = "";

    return sample;
  }

  constructor(
    public admissionDate: Date,
    public dischageDate: Date,
    public vitalSignsT: string,
    public vitalSignsBP: string,
    public vitalSignsP: string,
    public vitalSignsRP: string,
    public illness: illnessInfo,
    public injury: injuryInfo,
    public clinicalFinding: string,
    public underlyingDiseases: string,
    public investigations: investigationsInfo,
    public illnesRelatedAddiction: string,
    public patientPregnant: string,
    public gestationAge: string,
    public HIV: string,
    public HIVResult: string
  ) { }
}

export class illnessInfo {
  static empty(): illnessInfo {
    return empty(illnessInfo, 2);
  }

  static sample(): illnessInfo {
    const sample = illnessInfo.empty();

    sample.firstSight = "Feverish";
    sample.currentSymptoms = "Cough and sore throat";

    return sample;
  }

  static SubmitSr(): illnessInfo {
    const sample = illnessInfo.empty();

    sample.firstSight = "";
    sample.currentSymptoms = "";

    return sample;
  }


  constructor(
    public firstSight: string,
    public currentSymptoms: string
  ) { }
}

export class injuryInfo {
  static empty(): injuryInfo {
    return empty(injuryInfo, 8);
  }

  static sample(): injuryInfo {
    const sample = injuryInfo.empty();

    sample.injuryDate = new Date('2018-02-02');
    sample.firstSight = "Unconscious";
    sample.cause = "Car accident";
    sample.woundOrgans = "Right Rib 2 Less";
    sample.smellAlcohol = "YES";
    sample.LVconsciousness = "COMA";
    sample.drugs = "NO";
    sample.nameTypeMedicine = "-";

    return sample;
  }

  static SubmitSr(): injuryInfo {
    const sample = injuryInfo.empty();

    sample.injuryDate = new Date('');
    sample.firstSight = "";
    sample.cause = "";
    sample.woundOrgans = "";
    sample.smellAlcohol = "";
    sample.LVconsciousness = "";
    sample.drugs = "";
    sample.nameTypeMedicine = "";

    return sample;
  }

  constructor(
    public injuryDate: Date,
    public firstSight: string,
    public cause: string,
    public woundOrgans: string,
    public smellAlcohol: string,
    public LVconsciousness: string,
    public drugs: string,
    public nameTypeMedicine: string
  ) { }
}

export class investigationsInfo {
  static empty(): investigationsInfo {
    return empty(investigationsInfo, 6);
  }

  static sample(): investigationsInfo {
    const sample = investigationsInfo.empty();

    sample.interview = "Sore and sore throat";
    sample.diagnosis = "Weak mussle";
    sample.ICD10 = "Physical therapy";
    sample.treatment = "treatment B";
    sample.surger = "surger B";
    sample.result = "result B";

    return sample;
  }

  static SubmitSr(): investigationsInfo {
    const sample = investigationsInfo.empty();

    sample.interview = "";
    sample.diagnosis = "";
    sample.ICD10 = "";
    sample.treatment = "";
    sample.surger = "";
    sample.result = "";

    return sample;
  }

  constructor(
    public interview: string,
    public diagnosis: string,
    public ICD10: string,
    public treatment: string,
    public surger: string,
    public result: string
  ) { }
}


export class FieldsReceipt {
  static empty(): FieldsReceipt {
    return empty(FieldsReceipt, 3);
  }

  static sample(): FieldsReceipt {
    const sample = FieldsReceipt.empty();
    sample.receiptNo = "784572";
    sample.treatment = new Array();
    sample.total = 0;

    sample.treatment.push(ListTreatment.sample());
    return sample;
  }

  static SubmitSr(): FieldsReceipt {
    const sample = FieldsReceipt.empty();
    sample.receiptNo = "";
    sample.treatment = new Array();
    sample.total = 0;

    sample.treatment.push(ListTreatment.sample());
    return sample;
  }

  constructor(
    public receiptNo: string,
    public treatment: Array<ListTreatment>,
    public total: number
  ) { }
}


export class ListTreatment {
  static empty(): ListTreatment {
    return empty(ListTreatment, 5);
  }

  static sample(): ListTreatment {
    const sample = ListTreatment.empty();

    sample.listNo = '0';
    sample.item = 'itemA';
    sample.quantity = 3;
    sample.price = 60;
    sample.amount = 180;

    return sample;
  }
  static sample2(): ListTreatment {
    const sample = ListTreatment.empty();

    sample.listNo = '1';
    sample.item = 'LAB G';
    sample.quantity = 1;
    sample.price = 210;
    sample.amount = 210;

    return sample;
  }

  static SubmitSr(): ListTreatment {
    const sample = ListTreatment.empty();

    sample.listNo = '0';
    sample.item = 'item';
    sample.quantity ;
    sample.price ;
    sample.amount = 0;

    return sample;
  }

  constructor(
    public listNo: string,
    public item: string,
    public quantity: number,
    public price: number,
    public amount: number
  ) { }
}


export class InquireCcrDocumentByKeyFields {
  static empty(): InquireCcrDocumentByKeyFields {
    const emptyObj =  empty(InquireCcrDocumentByKeyFields, 2);
    return emptyObj;
  }

  static sampleSubmitSr(): InquireCcrDocumentByKeyFields {
    const sample: InquireCcrDocumentByKeyFields = InquireCcrDocumentByKeyFields.empty();
 
    sample.citizenID = '';
    sample.receiptNo = '';

    return sample;
  }

  constructor (
      public citizenID: string,
      public receiptNo: string
  ) {}
}

///////////////////////////////////////////////////////////////////

// import { Util } from '../util/util';

// import { Injectable } from '@angular/core';

// var todate;
// const construct = function (constructor, argsArray) {


//   function F(): void {
//     constructor.apply(this, argsArray);
//   }
//   F.prototype = constructor.prototype;
//   return new F();
// }

// const empty = function (constructor, numArgs: number) {
//   todate = Util.todate();
//   const nullArgs = new Array(numArgs).fill(null);
//   return construct(constructor, nullArgs);
// }

// // ####################################################################
// // ############################## MAIN Class ##########################
// // ####################################################################

// export class TransactionCreateCcrDocument {
//   static empty(): TransactionCreateCcrDocument {
//     const emptyObj = empty(TransactionCreateCcrDocument, 5);
//     return emptyObj;
//   }

//   static sampleSubmitSr(): TransactionCreateCcrDocument {
//     const sample: TransactionCreateCcrDocument = TransactionCreateCcrDocument.empty();

//     sample.remainingAmount = 0;
//     sample.comment = 'ABC';

//     return sample;
//   }

//   constructor(
//     //public hospital: FieldsHospital,
//     public patient: FieldsPatient,
//     public physician: FieldsPhysician,
//     public physicianReport: FieldsPhysicianReport,
//     public receipt: FieldsReceipt,
//     public remainingAmount: number,
//     public comment: string
//   ) { }
// }

// export class TransactionSaveCcrDocument {
//   static empty(): TransactionSaveCcrDocument {
//     const emptyObj = empty(TransactionSaveCcrDocument, 3);
//     return emptyObj;
//   }

//   static sampleSubmitSr(): TransactionSaveCcrDocument {
//     const sample: TransactionSaveCcrDocument = TransactionSaveCcrDocument.empty();

//     sample.citizenID = "B";
//     sample.receiptNo = '784572';

//     return sample;
//   }

//   constructor(
//     //public hospital: FieldsHospital,
//     public citizenID: string,
//     public receiptNo: string
//   ) { }
// }
// // ####################################################################
// // ############################## SUB Class ###########################
// // ####################################################################

// // export class FieldsHospital {
// //   static empty(): FieldsHospital {
// //     return empty(FieldsHospital, 1);
// //   }

// //   static sample(): FieldsHospital {
// //     const sample = FieldsHospital.empty();

// //     sample.firstSight = "";

// //     return sample;
// //   }

// //   constructor (
// //       public firstSight: string
// //   ) {}
// // }

// export class FieldsPatient {
//   static empty(): FieldsPatient {
//     //   return empty(FieldsPatient, 3);
//     const emptyObj = empty(FieldsPatient, 3);
//     emptyObj['$class'] = 'com.bestedit.rpt.FieldsPatient';
//     return emptyObj;
//   }

//   static sample(): FieldsPatient {
//     const sample = FieldsPatient.empty();

//     sample.citizenID = "15487592561548";
//     sample.patientType = "INPATIENT DEPARTMENT";
//     sample.patientID = "56847";
//     sample.email = "best58050244@gmail.com"
//     return sample;
//   }

//   constructor(
//     public citizenID: string,
//     public patientType: string,
//     public patientID: string,
//     public email: string

//   ) { }
// }

// export class FieldsPhysician {
//   static empty(): FieldsPhysician {
//     return empty(FieldsPhysician, 2);
//   }

//   static sample(): FieldsPhysician {
//     const sample = FieldsPhysician.empty();

//     sample.medicalSpecialty = "Orthopedic surgeon";

//     return sample;
//   }

//   constructor(
//     public medicalSpecialty: string
//   ) { }
// }




// export class FieldsPhysicianReport {
//   static empty(): FieldsPhysicianReport {
//     return empty(FieldsPhysicianReport, 16);
//   }

//   static sample(): FieldsPhysicianReport {
//     const sample = FieldsPhysicianReport.empty();
//     sample.admissionDate = new Date('2018-11-12');
//     sample.dischageDate = new Date('2018-12-12');
//     sample.vitalSignsT = "37";
//     sample.vitalSignsBP = "100/65";
//     sample.vitalSignsP = "75";
//     sample.vitalSignsRP = "15";
//     sample.clinicalFinding = "Damage from accident and rain";
//     sample.underlyingDiseases = "High Blood Pressure";
//     sample.illnesRelatedAddiction = "-";
//     sample.patientPregnant = "NO";
//     sample.gestationAge = "-";
//     sample.HIV = "NO";
//     sample.HIVResult = "-";

//     return sample;
//   }

//   constructor(
//     public admissionDate: Date,
//     public dischageDate: Date,
//     public vitalSignsT: string,
//     public vitalSignsBP: string,
//     public vitalSignsP: string,
//     public vitalSignsRP: string,
//     public illness: illnessInfo,
//     public injury: injuryInfo,
//     public clinicalFinding: string,
//     public underlyingDiseases: string,
//     public investigations: investigationsInfo,
//     public illnesRelatedAddiction: string,
//     public patientPregnant: string,
//     public gestationAge: string,
//     public HIV: string,
//     public HIVResult: string
//   ) { }
// }

// export class illnessInfo {
//   static empty(): illnessInfo {
//     return empty(illnessInfo, 2);
//   }

//   static sample(): illnessInfo {
//     const sample = illnessInfo.empty();

//     sample.firstSight = "Feverish";
//     sample.currentSymptoms = "Cough and sore throat";

//     return sample;
//   }

//   constructor(
//     public firstSight: string,
//     public currentSymptoms: string
//   ) { }
// }

// export class injuryInfo {
//   static empty(): injuryInfo {
//     return empty(injuryInfo, 8);
//   }

//   static sample(): injuryInfo {
//     const sample = injuryInfo.empty();

//     sample.injuryDate = new Date(2018-11-12);
//     sample.firstSight = "Unconscious";
//     sample.cause = "Car accident";
//     sample.woundOrgans = "Right Rib 2 Less";
//     sample.smellAlcohol = "YES";
//     sample.LVconsciousness = "COMA";
//     sample.drugs = "NO";
//     sample.nameTypeMedicine = "-";

//     return sample;
//   }

//   constructor(
//     public injuryDate: Date,
//     public firstSight: string,
//     public cause: string,
//     public woundOrgans: string,
//     public smellAlcohol: string,
//     public LVconsciousness: string,
//     public drugs: string,
//     public nameTypeMedicine: string
//   ) { }
// }

// export class investigationsInfo {
//   static empty(): investigationsInfo {
//     return empty(investigationsInfo, 6);
//   }

//   static sample(): investigationsInfo {
//     const sample = investigationsInfo.empty();

//     sample.interview = "Sore and sore throat";
//     sample.diagnosis = "Weak mussle";
//     sample.ICD10 = "Physical therapy";
//     sample.treatment = "treatment B";
//     sample.surger = "surger B";
//     sample.result = "result B";

//     return sample;
//   }

//   constructor(
//     public interview: string,
//     public diagnosis: string,
//     public ICD10: string,
//     public treatment: string,
//     public surger: string,
//     public result: string
//   ) { }
// }


// export class FieldsReceipt {
//   static empty(): FieldsReceipt {
//     return empty(FieldsReceipt, 3);
//   }

//   static sample(): FieldsReceipt {
//     const sample = FieldsReceipt.empty();
//     sample.receiptNo = "784572";
//     sample.treatment = new Array();
//     sample.total = 0;

//     sample.treatment.push(ListTreatment.sample());
//     return sample;
//   }

//   constructor(
//     public receiptNo: string,
//     public treatment: Array<ListTreatment>,
//     public total: number
//   ) { }
// }


// export class ListTreatment {
//   static empty(): ListTreatment {
//     return empty(ListTreatment, 5);
//   }

//   static sample(): ListTreatment {
//     const sample = ListTreatment.empty();

//     sample.listNo = '0';
//     sample.item = 'item';
//     sample.quantity = 0;
//     sample.price = 0;
//     sample.amount = 0;

//     return sample;
//   }

//   constructor(
//     public listNo: string,
//     public item: string,
//     public quantity: number,
//     public price: number,
//     public amount: number
//   ) { }
// }