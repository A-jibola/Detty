const Handlebars = require('handlebars');
const PDFDocument = require('pdfkit');
const getStream = require('get-stream');

const templateString = `
SERVICE ID: {{serviceId}}
SERVICE NAME: {{serviceName}}
PRICE PAID: {{price}}
RESERVED BY: {{userEmail}}
DATE: {{dateOfCreation}}
PAYMENT STATUS: {{paymentStatus}}

{{#if singleDateBooked}}
DATE BOOKED:
{{singleDateBooked}}
{{/if}}
{{#if multipleDateBooked}}
DATES BOOKED:
{{#each multipleDateBooked}}
    {{this}}
{{/each}}
{{/if}}
{{#if durationBooked.startDate}}
DURATION BOOKED:
    START DATE: {{durationBooked.startDate}}
    END DATE: {{durationBooked.endDate}}
{{/if}}

CONTACT INFORMATION: 
{{#each contactInfo}}
    {{this}}
{{/each}}

TERMS & CONDITIONS:
{{#each terms}}
    {{this}}
{{/each}}
`

const receiptManager = {
    createReceipt: async(reservation, serviceName, userEmail)=>{
        try{
            const template = Handlebars.compile(templateString);
            const receiptRaw = template({
                serviceId: reservation.serviceNumber,
                serviceName: serviceName,
                price: reservation.price ,
                userEmail: userEmail ,
                dateOfCreation: reservation.dateCreated,
                paymentStatus: reservation.paymentStatus,
                singleDateBooked: reservation.singleDateBooked,
                multipleDateBooked: reservation.multipleDatesBooked,
                durationBooked: reservation.durationBooked,
                contactInfo: reservation.contactInfo,
                terms: reservation.terms
            })
            const receiptPdf = new PDFDocument();
            receiptPdf.text(receiptRaw)
            receiptPdf.end();
            const receiptStream = await getStream.buffer(receiptPdf)
            const base64 = receiptStream.toString('base64')
            return base64;
        }
        catch(error){
            return 'Error';
        }
    }
}

module.exports = receiptManager;