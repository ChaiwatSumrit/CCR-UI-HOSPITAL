
import { Component, OnInit } from '@angular/core';
import {
  TransactionCreateCcrDocument, FieldsPatient, FieldsPhysician,
  FieldsPhysicianReport, FieldsReceipt, illnessInfo, injuryInfo,
  investigationsInfo, ListTreatment, TransactionSaveCcrDocument
} from '.././model';
import { ProxyCcrDocumentService } from '../service/proxyccrdocument.service';
import { forEach } from '@angular/router/src/utils/collection';

import { Util } from '../../util/util';
@Component({
  selector: 'app-proxy.create',
  templateUrl: './proxy.create.component.html',
  styleUrls: ['./proxy.create.component.css']
})

export class ProxyCreateComponent implements OnInit {
  model: TransactionCreateCcrDocument = TransactionCreateCcrDocument.empty();
  patient: FieldsPatient = FieldsPatient.empty();
  physician: FieldsPhysician = FieldsPhysician.empty();
  physicianReport: FieldsPhysicianReport = FieldsPhysicianReport.empty();
  illness: illnessInfo = illnessInfo.empty();
  injury: injuryInfo = injuryInfo.empty();
  investigations: investigationsInfo = investigationsInfo.empty();
  receipt: FieldsReceipt = FieldsReceipt.empty();
  treatment: ListTreatment = ListTreatment.empty();
  save: TransactionSaveCcrDocument = TransactionSaveCcrDocument.empty();
  AdmissionDate;
  DischageDate;
  InjuryDate;
  public loading = false;

  constructor(
    private service: ProxyCcrDocumentService
    // private _router: Router
  ) { }

  ngOnInit() {
    var that = this;
    // setTimeout(function(){
    that.model = TransactionCreateCcrDocument.SubmitSr();
    that.patient = FieldsPatient.SubmitSr();
    that.physician = FieldsPhysician.SubmitSr();
    that.physicianReport = FieldsPhysicianReport.SubmitSr();
    that.illness = illnessInfo.SubmitSr();
    that.injury = injuryInfo.SubmitSr();
    that.investigations = investigationsInfo.SubmitSr();
    that.receipt = FieldsReceipt.SubmitSr();
    that.treatment = ListTreatment.SubmitSr();
    that.save = TransactionSaveCcrDocument.SubmitSr();


  }

  onSubmit() {
    // this.model.inv_no=this.model.inv_no.trim();
    // this.model.inv_date=this.model.inv_date.trim();
    // this.model.inv_tax_seller=this.model.inv_tax_seller.trim();

    this.loading = true;
    if (this.patient.citizenID.length != 13) {
      alert("Citizen ID length must be exactly 13 characters")
      this.loading = false;
      return ;
    }
    //@1 patient
    this.patient.citizenID = this.patient.citizenID
    this.model.patient = FieldsPatient.empty();
    this.model.patient.citizenID = this.patient.citizenID.trim();
    this.model.patient.patientType = this.patient.patientType.trim();
    this.model.patient.patientID = this.patient.patientID.trim();
    this.model.patient.email = this.patient.email.trim();
    //@2
    this.model.physician = FieldsPhysician.empty();
    this.model.physician.medicalSpecialty = this.physician.medicalSpecialty.trim();
    //@3
    this.model.physicianReport = FieldsPhysicianReport.empty();
    this.model.physicianReport.admissionDate = new Date(this.AdmissionDate);
    this.model.physicianReport.dischageDate = new Date(this.DischageDate);
    this.model.physicianReport.vitalSignsT = this.physicianReport.vitalSignsT.trim();
    this.model.physicianReport.vitalSignsBP = this.physicianReport.vitalSignsBP.trim();
    this.model.physicianReport.vitalSignsP = this.physicianReport.vitalSignsP.trim();
    this.model.physicianReport.vitalSignsRP = this.physicianReport.vitalSignsRP.trim();
    this.model.physicianReport.illness = illnessInfo.empty();
    this.model.physicianReport.illness.firstSight = this.illness.firstSight.trim();
    this.model.physicianReport.illness.currentSymptoms = this.illness.currentSymptoms.trim();
    this.model.physicianReport.injury = injuryInfo.empty();
    this.model.physicianReport.injury.injuryDate = new Date(this.InjuryDate);
    this.model.physicianReport.injury.firstSight = this.injury.firstSight.trim();
    this.model.physicianReport.injury.cause = this.injury.cause.trim();
    this.model.physicianReport.injury.woundOrgans = this.injury.woundOrgans.trim();
    this.model.physicianReport.injury.smellAlcohol = this.injury.smellAlcohol.trim();
    this.model.physicianReport.injury.LVconsciousness = this.injury.LVconsciousness.trim();
    this.model.physicianReport.injury.drugs = this.injury.drugs.trim();
    this.model.physicianReport.injury.nameTypeMedicine = this.injury.nameTypeMedicine.trim();
    this.model.physicianReport.clinicalFinding = this.physicianReport.clinicalFinding.trim();
    this.model.physicianReport.underlyingDiseases = this.physicianReport.underlyingDiseases.trim();
    this.model.physicianReport.investigations = investigationsInfo.empty();
    this.model.physicianReport.investigations.interview = this.investigations.interview.trim();
    this.model.physicianReport.investigations.diagnosis = this.investigations.diagnosis.trim();
    this.model.physicianReport.investigations.ICD10 = this.investigations.ICD10.trim();
    this.model.physicianReport.investigations.treatment = this.investigations.treatment.trim();
    this.model.physicianReport.investigations.surger = this.investigations.surger.trim();
    this.model.physicianReport.investigations.result = this.investigations.result.trim();
    this.model.physicianReport.illnesRelatedAddiction = this.physicianReport.illnesRelatedAddiction.trim();
    this.model.physicianReport.patientPregnant = this.physicianReport.patientPregnant.trim();
    this.model.physicianReport.gestationAge = this.physicianReport.gestationAge.trim();
    this.model.physicianReport.HIV = this.physicianReport.HIV.trim();
    this.model.physicianReport.HIVResult = this.physicianReport.HIVResult.trim();
    //@4
    this.model.receipt = FieldsReceipt.empty();
    this.model.receipt.receiptNo = this.receipt.receiptNo.trim();
    this.model.receipt.treatment = this.receipt.treatment
    this.model.receipt.total = this.receipt.total;
    //@5
    this.model.remainingAmount = this.model.remainingAmount;
    //@6
    this.model.comment = this.model.comment.trim();


    console.log('uilog save');
    console.log('saving draft ' + JSON.stringify(this.model));
   
    this.service.submitCreateCcrDocument(this.model)
      .subscribe(
        result => {
          this.loading = false;
          let message = 'Success';
          (<HTMLInputElement>document.getElementById('status')).value = message;
          console.log('reply:' + JSON.stringify(result));
          document.getElementById("statusfield").style.display = "block";

        },
        error => {
          this.loading = false;
          let header = 'Error';
          let message = error;
          (<HTMLInputElement>document.getElementById('status')).value = message;
          console.log('Error:' + message);
          document.getElementById("statusfield").style.display = "block";

        });
  }
  // receiptTreatment(Info: Info) {
  //   // console.log(JSON.stringify(fileInfo));
  //   const rowIndex = number(Info);
  //   this.model.receipt.treatment[rowIndex].item
  //   this.model.receipt.treatment[rowIndex].quantity
  //   this.model.receipt.treatment[rowIndex].price
  //   this.model.receipt.treatment[rowIndex].amount
  // }
  addReceiptTreatment() {

    if (this.receipt.treatment === null) {
      this.receipt.treatment = [];
    }

    const numRecords = this.receipt.treatment.length;
    const newRecord = ListTreatment.SubmitSr();
    newRecord.listNo = numRecords.toString();
    this.receipt.treatment.push(newRecord);
  }

  deleteReceiptTreatment(i: number): void {
    this.receipt.treatment.splice(i, 1);
  }

  calculateReceipt(i: number): void {
    //console.log('index:' + this.receipt.treatment[i].quantity*this.receipt.treatment[i].price);
    this.receipt.treatment[i].amount = this.receipt.treatment[i].quantity * this.receipt.treatment[i].price
    var amount = 0;
    this.receipt.treatment.forEach(element => {
      //console.log('element.amount'+element.amount);
      amount = amount + element.amount

    })
    this.receipt.total = amount;
    this.model.remainingAmount = amount;
  }

  FineCcrDocInLocal() {
    this.save.citizenID = this.patient.citizenID;
    this.save.receiptNo = this.receipt.receiptNo;

    this.loading = true;
    if (this.patient.citizenID.length != 13) {
      alert("Citizen ID length must be exactly 13 characters")
      this.loading = false;
      return ;
    }
    console.log('saving draft ' + JSON.stringify(this.save));
    this.service.submitFineCcrDocument(this.save)
      .subscribe(
        result => {

          this.loading = false;
          document.getElementById("inputfield").style.display = "block";
          let message = 'Success';
          console.log('reply:' + JSON.stringify(result));
          // console.log('patientID:' + result[2].patientID);
          if (result != false) {


            //@1 patient
            this.patient = FieldsPatient.empty();
            this.patient.citizenID = this.save.citizenID
            this.patient.patientType = result[2].patientType;
            this.patient.patientID = result[2].patientID;
            this.patient.email = result[2].email;
            //@2
            this.physician = FieldsPhysician.empty();
            this.physician.medicalSpecialty = result[3].medicalSpecialty;
            //@3
            this.physicianReport = FieldsPhysicianReport.empty();
            this.AdmissionDate = (String(result[4].admissionDate).substr(0, 10));
            this.DischageDate = (String(result[4].dischageDate).substr(0, 10));
            this.physicianReport.vitalSignsT = result[4].vitalSignsT;
            this.physicianReport.vitalSignsBP = result[4].vitalSignsBP;
            this.physicianReport.vitalSignsP = result[4].vitalSignsP;
            this.physicianReport.vitalSignsRP = result[4].vitalSignsRP;
            this.illness = illnessInfo.empty();
            this.illness.firstSight = result[4].illness.firstSight;
            this.illness.currentSymptoms = result[4].illness.currentSymptoms;
            this.injury = injuryInfo.empty();
            this.InjuryDate = (String(result[4].injury.injuryDate).substr(0, 10));
            this.injury.firstSight = result[4].injury.firstSight;
            this.injury.cause = result[4].injury.cause;
            this.injury.woundOrgans = result[4].injury.woundOrgans;
            this.injury.smellAlcohol = result[4].injury.smellAlcohol;
            this.injury.LVconsciousness = result[4].injury.LVconsciousness;
            this.injury.drugs = result[4].injury.drugs;
            this.injury.nameTypeMedicine = result[4].injury.nameTypeMedicine;
            this.physicianReport.clinicalFinding = result[4].clinicalFinding;
            this.physicianReport.underlyingDiseases = result[4].underlyingDiseases;
            this.investigations = investigationsInfo.empty();
            this.investigations.interview = result[4].investigations.interview;
            this.investigations.diagnosis = result[4].investigations.diagnosis;
            this.investigations.ICD10 = result[4].investigations.ICD10;
            this.investigations.treatment = result[4].investigations.treatment;
            this.investigations.surger = result[4].investigations.surger;
            this.investigations.result = result[4].investigations.result;
            this.physicianReport.illnesRelatedAddiction = result[4].illnesRelatedAddiction;
            this.physicianReport.patientPregnant = result[4].patientPregnant;
            this.physicianReport.gestationAge = result[4].gestationAge;
            this.physicianReport.HIV = result[4].HIV;
            this.physicianReport.HIVResult = result[4].HIVResult;
            //@4
            this.receipt = FieldsReceipt.empty();
            this.receipt.receiptNo = result[5].receiptNo;
            this.receipt.treatment = result[5].treatment;
            this.receipt.total = result[5].total;
            //@5
            this.model.remainingAmount = result[6];
            //@6
            this.model.comment = result[7];
          } else {
            this.loading = false;
            //var that = this;

            //@1 patient
            this.patient = FieldsPatient.empty();
            this.patient.citizenID = this.save.citizenID
            this.patient.patientType = "";
            this.patient.patientID = "";
            this.patient.email = "";
            //@2
            this.physician = FieldsPhysician.empty();
            this.physician.medicalSpecialty = "";
            //@3
            this.physicianReport = FieldsPhysicianReport.empty();
            this.physicianReport.admissionDate = new Date();
            this.physicianReport.dischageDate = new Date();
            this.physicianReport.vitalSignsT = "";
            this.physicianReport.vitalSignsBP = "";
            this.physicianReport.vitalSignsP = "";
            this.physicianReport.vitalSignsRP = "";
            this.illness = illnessInfo.empty();
            this.illness.firstSight = "";
            this.illness.currentSymptoms = "";
            this.injury = injuryInfo.empty();
            this.injury.injuryDate = new Date();
            
            this.injury.firstSight = "";
            this.injury.cause = "";
            this.injury.woundOrgans = "";
            this.injury.smellAlcohol = "";
            this.injury.LVconsciousness = "";
            this.injury.drugs = "";
            this.injury.nameTypeMedicine = "";
            this.physicianReport.clinicalFinding = "";
            this.physicianReport.underlyingDiseases = "";
            this.investigations = investigationsInfo.empty();
            this.investigations.interview = "";
            this.investigations.diagnosis = "";
            this.investigations.ICD10 = "";
            this.investigations.treatment = "";
            this.investigations.surger = "";
            this.investigations.result = "";
            this.physicianReport.illnesRelatedAddiction = "";
            this.physicianReport.patientPregnant = "";
            this.physicianReport.gestationAge = "";
            this.physicianReport.HIV = "";
            this.physicianReport.HIVResult = "";
            //@4
            this.receipt = FieldsReceipt.empty();
            this.receipt.receiptNo = "";
            this.receipt.treatment = [];

            const numRecords = this.receipt.treatment.length;
            const newRecord = ListTreatment.SubmitSr();
            newRecord.listNo = numRecords.toString();
            this.receipt.treatment.push(newRecord);

            this.receipt.total = 0;
            //@5
            this.model.remainingAmount = 0;
            //@6
            this.model.comment = "";
            this.addReceiptTreatment();
          }
          document.getElementById("inputfield").style.display = "block";

        },
        error => {

          this.loading = false;
          //var that = this;

          //@1 patient
          this.patient = FieldsPatient.empty();
          this.patient.citizenID = this.save.citizenID
          this.patient.patientType = "";
          this.patient.patientID = "";
          this.patient.email = "";
          //@2
          this.physician = FieldsPhysician.empty();
          this.physician.medicalSpecialty = "";
          //@3
          this.physicianReport = FieldsPhysicianReport.empty();
          this.AdmissionDate = new Date();
          this.DischageDate = new Date();
          this.physicianReport.vitalSignsT = "";
          this.physicianReport.vitalSignsBP = "";
          this.physicianReport.vitalSignsP = "";
          this.physicianReport.vitalSignsRP = "";
          this.illness = illnessInfo.empty();
          this.illness.firstSight = "";
          this.illness.currentSymptoms = "";
          this.injury = injuryInfo.empty();
          this.InjuryDate = new Date();
          this.injury.firstSight = "";
          this.injury.cause = "";
          this.injury.woundOrgans = "";
          this.injury.smellAlcohol = "";
          this.injury.LVconsciousness = "";
          this.injury.drugs = "";
          this.injury.nameTypeMedicine = "";
          this.physicianReport.clinicalFinding = "";
          this.physicianReport.underlyingDiseases = "";
          this.investigations = investigationsInfo.empty();
          this.investigations.interview = "";
          this.investigations.diagnosis = "";
          this.investigations.ICD10 = "";
          this.investigations.treatment = "";
          this.investigations.surger = "";
          this.investigations.result = "";
          this.physicianReport.illnesRelatedAddiction = "";
          this.physicianReport.patientPregnant = "";
          this.physicianReport.gestationAge = "";
          this.physicianReport.HIV = "";
          this.physicianReport.HIVResult = "";
          //@4
          this.receipt = FieldsReceipt.empty();
          this.receipt.receiptNo = "";;
          this.receipt.treatment = [];
          this.receipt.total = 0;
          //@5
          this.model = TransactionCreateCcrDocument.empty();
          this.model.remainingAmount = 0;
          //@6
          this.model.comment = "";

          //let message = error;

          // (<HTMLInputElement>document.getElementById('status')).value = message;
          // console.log('Error:' + message);

          document.getElementById("inputfield").style.display = "block";

        });

  }
}

