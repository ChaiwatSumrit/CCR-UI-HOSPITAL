import { Component, OnInit } from '@angular/core';
import { InquireCcrDocumentByKeyFields } from '.././model';
import { ProxyCcrDocumentService } from '../service/proxyccrdocument.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


const HOSPITAL_NAME = "ABC HOSPITAL";
@Component({
  selector: 'app-proxy.inquire',
  templateUrl: './proxy.inquire.component.html',
  styleUrls: ['./proxy.inquire.component.css']
})
export class ProxyInquireComponent implements OnInit {
  model: InquireCcrDocumentByKeyFields = InquireCcrDocumentByKeyFields.empty();
  JSONtree
  responseValue
  responseValueItem
  public loading = false;
  docDefinition
  constructor(
    private service: ProxyCcrDocumentService

  ) {


  }

  dowloadPdf() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(this.docDefinition).download();
  }

  ngOnInit() {
    var that = this;

    that.model = InquireCcrDocumentByKeyFields.sampleSubmitSr();
  }

  onSubmit() {

    this.loading = true;
    if (this.model.citizenID.length != 13) {
      alert("Citizen ID length must be exactly 13 characters")
      this.loading = false;
      return ;
    }
    this.service.submitInquireCcrDocument(this.model)
      .subscribe(result => {
        this.loading = false;
        console.log('result : ' + JSON.stringify(result.message));
        // this.JSONtree = JSON.stringify(result.INVOICE);
        this.responseValue = []; //new Array(result.INVOICE)
        let body = {
          "DocumentIdentity": result.message.docID,
          "CreateDate": (String(result.message.createDate).substr(0, 19)),
          "State": (result.message.state),
          "ReceiptAmount": (result.message.remainingAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
          "RemainingAmount": (result.message.remainingAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
          "Comment": result.message.comment,
          "RequestIdentity": result.message.ccrRequestIdentity,
          "Patient": {
            "PatientType": result.message.patient.patientType
          },
          "Physician": {
            "MedicalSpecialty": result.message.physician.medicalSpecialty
          },
          "PhysicianReport": {
            "AdmissionDate": (String(result.message.physicianReport.admissionDate).substr(0, 19)),
            "DischageDate": (String(result.message.physicianReport.dischageDate).substr(0, 19)),
            "VitalSignsT": result.message.physicianReport.vitalSignsT,
            "VitalSignsBP": result.message.physicianReport.vitalSignsBP,
            "VitalSignsP": result.message.physicianReport.vitalSignsP,
            "VitalSignsRP": result.message.physicianReport.vitalSignsRP,
            "Illness": {
              "FirstSight": result.message.physicianReport.illness.firstSight,
              "CurrentSymptoms": result.message.physicianReport.illness.currentSymptoms
            },
            "Injury": {
              "InjuryDate": (String(result.message.physicianReport.injury.injuryDate).substr(0, 19)),
              "FirstSight": result.message.physicianReport.injury.firstSight,
              "Cause": result.message.physicianReport.injury.cause,
              "WoundOrgans": result.message.physicianReport.injury.woundOrgans,
              "SmellAlcohol": result.message.physicianReport.injury.smellAlcohol,
              "LVconsciousness": result.message.physicianReport.injury.LVconsciousness,
              "Drugs": result.message.physicianReport.injury.drugs,
              "NameTypeMedicine": result.message.physicianReport.injury.nameTypeMedicine
            },
            "ClinicalFinding": result.message.physicianReport.clinicalFinding,
            "UnderlyingDiseases": result.message.physicianReport.underlyingDiseases,
            "Investigations": {
              "Interview": result.message.physicianReport.investigations.interview,
              "Diagnosis": result.message.physicianReport.investigations.diagnosis,
              "ICD10": result.message.physicianReport.investigations.ICD10,
              "Treatment": result.message.physicianReport.investigations.treatment,
              "Surger": result.message.physicianReport.investigations.surger,
              "Result": result.message.physicianReport.investigations.result
            },
            "IllnesRelatedAddiction": result.message.physicianReport.illnesRelatedAddiction,
            "PatientPregnant": result.message.physicianReport.patientPregnant,
            "GestationAge": result.message.physicianReport.gestationAge,
            "HIV": result.message.physicianReport.HIV,
            "HIVResult": result.message.physicianReport.HIVResult,
          },
          "Receipt": {
            "receiptNo": result.message.receipt.receiptNo,
            "total": (result.message.receipt.total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
          }
        }
        this.responseValue.push(body);

        this.responseValueItem = [];
        // let numFIN = 0;
        for (var rows = 0; rows < result.message.receipt.treatment.length; rows++) {
          let body = {
            "Item": result.message.receipt.treatment[rows].item,
            "Quantity": result.message.receipt.treatment[rows].quantity,
            "Price": (result.message.receipt.treatment[rows].price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" THB",
            "Amount": (result.message.receipt.treatment[rows].amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" THB"
          }
          this.responseValueItem.push(body);
        }
        // //document.getElementById("result").style.display = "block";
        // (<HTMLInputElement>document.getElementById("numEN")).value = String(result.message.EndorsementList.length);
        // (<HTMLInputElement>document.getElementById("numFIN")).value = String(numFIN);
        document.getElementById("result").style.display = "block";

        //PDF
        this.docDefinition = {
          pageSize: 'A4',
          pageOrientation: 'portrait',
          pageMargins: [40, 60, 40, 60],
          content: [
            { text: `${HOSPITAL_NAME}`, style: 'header' },
            // {image: '../../assets/images/ic_delete_gray.png',
            // width: 150,
            // height: 150},
            // ],
            '----------------------------------------------------------------------------------------------------------------------------------------------------------',
            'Patient Profile',
            {
              style: 'tableExample',
              table: {
                widths: ['*', '*', '*'],
                headerRows: 1,
                body: [
                  [{ text: 'Citizen ID', style: 'tableHeader' }, { text: 'Name', style: 'tableHeader', }, { text: 'Type', style: 'tableHeader' }],
                  [`${this.model.citizenID}`, 'Another onehere', `${result.message.patient.patientType}`]
                ]
              },
              layout: 'noBorders'
            },

            { text: 'Certificate Medical', style: 'subheader' },
            {
              style: 'tableExample',
              table: {
                widths: ['*', '*', '*'],
                headerRows: 1,
                body: [
                  [{ text: 'Create Date', style: 'tableHeader', alignment: 'center' }, { text: 'State', style: 'tableHeader', alignment: 'center' }, { text: 'Medical Specialty', style: 'tableHeader', alignment: 'center' }],
                  [{ text: `${(String(result.message.createDate).substr(0, 19))}`, alignment: 'center' }, { text: `${result.message.state}`, alignment: 'center' }, { text: `${result.message.physician.medicalSpecialty}`, alignment: 'center' }],
                ]
              }
            },
            { text: 'Physician Report', style: 'subheader' },
            {
              style: 'tableExample',
              table: {
                widths: ['*', '*'],
                heights: [15, 25, 15, 25, 15, 25],
                headerRows: 1,
                body: [
                  [{ text: 'Admission Date', style: 'tableHeader', alignment: 'center' }, { text: 'Vital Signs', style: 'tableHeader', alignment: 'center' }],
                  [{ text: `${(String(result.message.physicianReport.admissionDate).substr(0, 19))}`, alignment: 'center' },
                  {
                    stack: [
                      {
                        ul: [
                          ` Vital Signs T  : ${result.message.physicianReport.vitalSignsT}`,
                          ` Vital Signs BP : ${result.message.physicianReport.vitalSignsBP}`,
                          ` Vital Signs P  : ${result.message.physicianReport.vitalSignsP}`,
                          ` Vital Signs RP : ${result.message.physicianReport.vitalSignsRP}`
                        ]
                      }
                    ],
                    rowSpan: 3,

                  }

                  ],
                  [{ text: 'Dischage Date', style: 'tableHeader', alignment: 'center' }],
                  [{ text: `${(String(result.message.physicianReport.dischageDate).substr(0, 19))}`, alignment: 'center' }],
                  [{ text: 'Clinical Finding', style: 'tableHeader', alignment: 'center' }, { text: 'Underlying Diseases', style: 'tableHeader', alignment: 'center' }],
                  [{ text: `${result.message.physicianReport.clinicalFinding}`, alignment: 'center' }, { text: `${result.message.physicianReport.underlyingDiseases}`, alignment: 'center' }]

                ]
              }
            },
            {
              style: 'tableExample',
              table: {
                widths: [170, '*', '*', '*', '*'],
                heights: [15, 25],
                headerRows: 1,
                body: [
                  [{ text: 'Illnes Related Addiction', style: 'tableHeader', alignment: 'center' }, { text: 'Patient Pregnant', style: 'tableHeader', alignment: 'center' }, { text: 'Gestation Age', style: 'tableHeader', alignment: 'center' }, { text: 'HIV', style: 'tableHeader', alignment: 'center' }, { text: 'HIV Result', style: 'tableHeader', alignment: 'center' }],
                  [{ text: `${result.message.physicianReport.illnesRelatedAddiction}`, alignment: 'center' }, { text: `${result.message.physicianReport.patientPregnant}`, alignment: 'center' }, { text: `${result.message.physicianReport.gestationAge}`, alignment: 'center' }, { text: `${result.message.physicianReport.HIV}`, alignment: 'center' }, { text: `${result.message.physicianReport.HIVResult}`, alignment: 'center' }],
                ]
              }
            },
            'Illness',
            {
              style: 'tableExample',
              table: {
                widths: ['*', '*'],
                heights: [15, 25],
                headerRows: 1,
                body: [
                  [{ text: 'First Sight', style: 'tableHeader', alignment: 'center' }, { text: 'Current Symptoms', style: 'tableHeader', alignment: 'center' }],
                  [{ text: `${result.message.physicianReport.illness.firstSight}`, alignment: 'center' }, { text: `${result.message.physicianReport.illness.CurrentSymptoms}`, alignment: 'center' }],
                ]
              }
            },
            'Injury',
            {
              style: 'tableExample',
              table: {
                widths: ['*', '*', '*', '*'],
                heights: [15, 25, 15, 25],
                headerRows: 1,
                body: [
                  [{ text: 'Injury Date', style: 'tableHeader', alignment: 'center' }, { text: 'First Sight', style: 'tableHeader', alignment: 'center' }, { text: 'Cause', style: 'tableHeader', alignment: 'center' }, { text: 'Wound Organs', style: 'tableHeader', alignment: 'center' }],
                  [{ text: `${(String(result.message.physicianReport.injury.injuryDate).substr(0, 19))}`, alignment: 'center' }, { text: `${result.message.physicianReport.injury.firstSight}`, alignment: 'center' }, { text: `${result.message.physicianReport.injury.cause}`, alignment: 'center' }, { text: `${result.message.physicianReport.injury.woundOrgans}`, alignment: 'center' }],
                  [{ text: 'Smell Alcohol', style: 'tableHeader', alignment: 'center' }, { text: 'LV consciousness', style: 'tableHeader', alignment: 'center' }, { text: 'Drugs', style: 'tableHeader', alignment: 'center' }, { text: 'Name Type Medicine', style: 'tableHeader', alignment: 'center' }],
                  [{ text: `${result.message.physicianReport.injury.smellAlcohol}`, alignment: 'center' }, { text: `${result.message.physicianReport.injury.LVconsciousness}`, alignment: 'center' }, { text: `${result.message.physicianReport.injury.drugs}`, alignment: 'center' }, { text: `${result.message.physicianReport.injury.nameTypeMedicine}`, alignment: 'center' }],
                ]
              }
            },
            'Investigations',
            {
              style: 'tableExample',
              table: {
                widths: ['*', '*', '*'],
                heights: [15, 25, 15, 25],
                headerRows: 1,
                body: [
                  [{ text: 'Interview', style: 'tableHeader', alignment: 'center' }, { text: 'Diagnosis', style: 'tableHeader', alignment: 'center' }, { text: 'ICD10', style: 'tableHeader', alignment: 'center' }],
                  [{ text: `${result.message.physicianReport.investigations.Interview}`, alignment: 'center' }, { text: `${result.message.physicianReport.investigations.diagnosis}`, alignment: 'center' }, { text: `${result.message.physicianReport.investigations.ICD10}`, alignment: 'center' }],
                  [{ text: 'Treatment', style: 'tableHeader', alignment: 'center' }, { text: 'Surger', style: 'tableHeader', alignment: 'center' }, { text: 'Result', style: 'tableHeader', alignment: 'center' }],
                  [{ text: `${result.message.physicianReport.investigations.treatment}`, alignment: 'center' }, { text: `${result.message.physicianReport.investigations.surger}`, alignment: 'center' }, { text: `${result.message.physicianReport.investigations.result}`, alignment: 'center' }],
                ]
              }
            },
            `Comment : ${result.message.comment}`,
            '----------------------------------------------------------------------------------------------------------------------------------------------------------',
            { text: 'Receipt', style: 'subheader' },
            `Receipt No : ${result.message.receipt.receiptNo}`,
            this.table(this.responseValueItem, ['Item', 'Quantity','Price','Amount']),
            { text: `Total : ${(result.message.receipt.total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} THB`, style: 'tableHeader', alignment: 'right' },
            // {
            //   style: 'tableExample',
            //   table: {
            //     widths: ['*', '*', '*', '*'],
            //     headerRows: 1,
            //     body: [
            //       [{ text: 'Item', style: 'tableHeader', alignment: 'center' }, { text: 'Quantity', style: 'tableHeader', alignment: 'center' }, { text: 'Price', style: 'tableHeader', alignment: 'center' }, { text: 'Amount', style: 'tableHeader', alignment: 'center' }],
            //       [{ text: `${result.message.receipt.treatment[0].item}`, alignment: 'center' }, { text: `${result.message.receipt.treatment[0].quantity}`, alignment: 'center' }, { text: `${result.message.receipt.treatment[0].price} THB`, alignment: 'center' }, { text: `${result.message.receipt.treatment[0].amount} THB`, style: 'tableHeader', alignment: 'center' }],

            //       [{ text: `Total : ${result.message.receipt.total} THB`, alignment: 'right', colSpan: 4 }]
            //     ]
            //   }
            // },
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10]
            },
            subheader: {
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 5]
            },
            tableExample: {
              margin: [0, 5, 0, 15]
            },
            tableHeader: {
              bold: true,
              fontSize: 13,
              color: 'black'
            }
          }
        };
        document.getElementById("error").style.display = "none";
        console.log('treatment' + JSON.stringify(result.message.receipt.treatment));
      },
        (error) => {
          this.loading = false;
          let header = 'Error';
          let message = error;
          (<HTMLInputElement>document.getElementById('status')).value = message;
          console.log('Error:' + message);
          document.getElementById("error").style.display = "block";
          document.getElementById("result").style.display = "none";
        });
  }

  buildTableBody(data, columns) {
    var body = [];

    body.push(columns);

    data.forEach(function (row) {
      var dataRow = [];

      columns.forEach(function (column) {
        dataRow.push(row[column]);
      })

      body.push(dataRow);
    });

    return body;
  }

  table(data, columns) {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
        headerRows: 1,
        body: this.buildTableBody(data, columns)
      }
    };
  }


}
