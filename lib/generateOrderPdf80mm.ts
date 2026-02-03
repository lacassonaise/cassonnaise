import { PDFDocument, StandardFonts } from "pdf-lib";

export async function generateOrderPdf80mm(order: any, items: any[]) {
  const width = 226; // ≈ 80mm
  const baseHeight = 300 + items.length * 20;

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([width, baseHeight]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  let y = baseHeight - 20;
  const line = (text: string, size = 10) => {
    page.drawText(text, { x: 10, y, size, font });
    y -= size + 6;
  };

  line("NOUVELLE COMMANDE", 12);
  line("-----------------------");

  line(
    order.delivery_type === "delivery"
      ? "🚚 LIVRAISON"
      : "🍴 À EMPORTER",
    11
  );

  if (order.delivery_type === "delivery") {
    line("");
    line("Adresse :", 10);
    line(order.delivery_address, 9);
  }

  line("");
  line(`Téléphone : ${order.phone}`, 10);

  line("");
  line("ARTICLES :", 11);
  items.forEach((i: any) => {
    line(`${i.quantity} x ${i.name_snapshot}`, 10);
  });

  line("");
  line("-----------------------");
  line(`TOTAL : ${(order.total_cents / 100).toFixed(2)} €`, 12);

  if (order.note) {
    line("");
    line("NOTE :", 10);
    line(order.note, 9);
  }

  line("");
  line(new Date(order.created_at).toLocaleString("fr-FR"), 8);

  const pdfBytes = await pdf.save();
  return Buffer.from(pdfBytes);
}
