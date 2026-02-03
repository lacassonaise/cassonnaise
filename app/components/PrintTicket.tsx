"use client";

export default function PrintTicket({ order }: any) {
  function print() {
    const win = window.open("", "PRINT", "height=600,width=400");
    if (!win) return;
    win.document.write("...");
    win.print();
  }

  return <button onClick={print}>🖨️ Ticket</button>;
}


