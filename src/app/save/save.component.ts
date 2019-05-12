import { Component, OnInit } from '@angular/core';
import {
  TransactionCreateCcrDocument, FieldsPatient, FieldsPhysician,
  FieldsPhysicianReport, FieldsReceipt, illnessInfo, injuryInfo,
  investigationsInfo, ListTreatment
} from '.././model';
import { CcrDocumentService } from '../service/ccrdocument.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Util } from '../../util/util';
@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})

export class SaveComponent implements OnInit {
  model: TransactionCreateCcrDocument = TransactionCreateCcrDocument.empty();
  patient: FieldsPatient = FieldsPatient.empty();
  physician: FieldsPhysician = FieldsPhysician.empty();
  physicianReport: FieldsPhysicianReport = FieldsPhysicianReport.empty();
  illness: illnessInfo = illnessInfo.empty();
  injury: injuryInfo = injuryInfo.empty();
  investigations: investigationsInfo = investigationsInfo.empty();
  receipt: FieldsReceipt = FieldsReceipt.empty();
  treatment: ListTreatment = ListTreatment.empty();
  AdmissionDate;
  DischageDate;
  InjuryDate;
  public loading = false;

  constructor(
    private service: CcrDocumentService
    // private _router: Router
  ) { }

  ngOnInit() {
    var that = this;
   
    that.model = TransactionCreateCcrDocument.sampleSubmitSr();
    that.patient = FieldsPatient.sample();
    that.physician = FieldsPhysician.sample();
    that.physicianReport = FieldsPhysicianReport.sample();
    that.illness = illnessInfo.sample();
    that.injury = injuryInfo.sample();
    that.investigations = investigationsInfo.sample();
    that.receipt = FieldsReceipt.sample();
    that.treatment = ListTreatment.sample();
    that.AdmissionDate = Util.todate(that.physicianReport.admissionDate);
    that.DischageDate = Util.todate(that.physicianReport.dischageDate);
    that.InjuryDate = Util.todate(that.injury.injuryDate);

    this.receipt.treatment = [];
    const numRecords = this.receipt.treatment.length;
    const newRecord = ListTreatment.sample();
    const newRecord2 = ListTreatment.sample2();
    newRecord.listNo = numRecords.toString();

    this.receipt.treatment.push(newRecord);
    this.receipt.treatment.push(newRecord2);

    for (let i = 0 ;i<this.receipt.treatment.length; i++) {
      this.calculateReceipt(i)
    }
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
    this.service.submitSaveCcrDocument(this.model)
      .subscribe(
        sr => {
          this.loading = false;

          let message = 'Success';
          (<HTMLInputElement>document.getElementById('status')).value = message;
          console.log('reply:' + JSON.stringify(sr));
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
}

