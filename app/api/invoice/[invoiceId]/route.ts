import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import jsPDF from 'jspdf'
export async function GET(request:Request,{ params }: { params: Promise<{ invoiceId: string }> }) {
  const { invoiceId } = await params;
  const data=await prisma.invoice.findUnique({
    where:{
      id:invoiceId
    },
    select:{
      invoiceName:true,
      invoiceNumber:true,
      currency:true,
      fromName:true,
      fromEmail:true,
      fromAddress:true,
      clientName:true,
      clientEmail:true,
      clientAddress:true,
      total:true,
      date:true,
      dueDate:true,
      invoiceItemDescription:true,
      invoiceItemQuantity:true,
      invoiceItemRate:true,
      note:true,

    }
  })

  if(!data){
    return NextResponse.json({error:"Invoice not found"},{status:404}) 
  }

  const pdf=new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  function formatCurrency(amount:number,currency:string){
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount)
  }
  pdf.setFont("helvetica");
  pdf.setFontSize(24);
  pdf.text(data.invoiceName,20,20);
// From sectip
  pdf.setFontSize(12);
  pdf.text("From",20,40);
  pdf.setFontSize(10);
  pdf.text([data.fromName,data.fromEmail,data.fromAddress].join("\n"),20,50);


  // Client section

  pdf.setFontSize(12);
  pdf.text("Bill To",20,70);
  pdf.setFontSize(10);
  pdf.text([data.clientName,data.clientEmail,data.clientAddress].join("\n"),20,80);

  // Invoice section
  pdf.setFontSize(12);
  pdf.text(`Invoice Number: ${data.invoiceNumber}`,120,40);
  pdf.text(`Date: ${new Intl.DateTimeFormat("en-US",{
    year:"numeric",
    month:"short",
    day:"2-digit"
  }).format(new Date(data.date))}`,120,50);
  pdf.text(`Due Date: ${new Intl.DateTimeFormat("en-US",{
    year:"numeric",
    month:"short",
    day:"2-digit"
  }).format(new Date(data.dueDate))}`,120,60);

   // Invoice Items
    pdf.setFontSize(12);
    pdf.setFont("helvetica","bold");
    pdf.text("Description",20,100);
    pdf.text("Quantity",100,100)
    pdf.text("Rate",130,100)
    pdf.text("Amount",160,100)

  //draw line
  pdf.line(20,105,190,105)


  pdf.setFont("helvetica","normal");
  pdf.text(data.invoiceItemDescription,20,110);
  pdf.text(data.invoiceItemQuantity.toString(),100,110);
  pdf.text(formatCurrency(data.invoiceItemRate,data.currency),130,110);
  pdf.text(formatCurrency(data.invoiceItemQuantity*data.invoiceItemRate,data.currency),160,110);

//Total Sectiom
pdf.line(20,115,190,115)

pdf.setFont("helvetica","bold");
pdf.text(`Total(${data.currency})`,130,130 )
pdf.text(`${formatCurrency(data.total,data.currency)}`,160,130);

//additional notes

if(data.note){
  pdf.setFont("helvetica","normal");
  pdf.setFontSize(10)
  pdf.text("Note:",20,150) 
  pdf.text(data.note,20,155)

}

  // generate pdf as buffer
  const pdfbuffer=Buffer.from(pdf.output('arraybuffer'));

  return new NextResponse(pdfbuffer,{
    headers:{
      'Content-Type':'application/pdf',
      'Content-Disposition':"inline"
    }
  })

}