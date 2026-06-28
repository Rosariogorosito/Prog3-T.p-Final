import PDFDocument from "pdfkit";
import * as service from "../services/reportes-service.js";

export const generarReportePDF = async (req, res) => {
  try {
    const [resumen, porObraSocial, detalle] = await Promise.all([
      service.getResumenGeneral(),
      service.getTurnosPorObraSocial(),
      service.getDetalleTurnos(),
    ]);

    const doc = new PDFDocument({ margin: 40, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=informe_turnos.pdf"
    );
    doc.pipe(res);

    // ENCABEZADO 
    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .text("Informe de Turnos Médicos", { align: "center" });

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(`Generado el: ${new Date().toLocaleString("es-AR")}`, {
        align: "center",
      });

    doc.moveDown(1.5);

    // GENERAL
    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .text("Resumen General");

    doc.moveDown(0.3);
    drawLine(doc);
    doc.moveDown(0.5);

    doc.fontSize(11).font("Helvetica");

    const resumenData = [
      ["Total de turnos", resumen?.total_turnos ?? 0],
      ["Turnos atendidos", resumen?.turnos_atendidos ?? 0],
      ["Turnos pendientes", resumen?.turnos_pendientes ?? 0],
      ["Recaudación total", `$${resumen?.recaudacion_total ?? 0}`],
    ];

    resumenData.forEach(([label, value]) => {
      doc
        .font("Helvetica-Bold")
        .text(`${label}: `, { continued: true })
        .font("Helvetica")
        .text(String(value));
    });

    doc.moveDown(1.5);

    // TURNOS POR OBRA SOCIAL 
    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .text("Turnos por Obra Social");

    doc.moveDown(0.3);
    drawLine(doc);
    doc.moveDown(0.5);

    if (porObraSocial.length === 0) {
      doc.fontSize(10).font("Helvetica").text("Sin datos.");
    } else {
      
      drawTableRow(doc, ["Obra Social", "Cantidad", "Recaudado"], true);
      porObraSocial.forEach((row) => {
        drawTableRow(doc, [
          row.obra_social,
          String(row.cantidad_turnos),
          `$${row.total_recaudado}`,
        ]);
      });
    }

    doc.moveDown(1.5);

    // DETALLE DE TURNOS 
    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .text("Detalle de Turnos");

    doc.moveDown(0.3);
    drawLine(doc);
    doc.moveDown(0.5);

    if (detalle.length === 0) {
      doc.fontSize(10).font("Helvetica").text("Sin datos.");
    } else {
      drawTableRow(
        doc,
        ["Fecha", "Paciente", "Médico", "Especialidad", "Obra Social", "Valor", "Estado"],
        true
      );
      detalle.forEach((row) => {
        const fecha = new Date(row.fecha_hora).toLocaleDateString("es-AR");
        drawTableRow(doc, [
          fecha,
          row.paciente,
          row.medico,
          row.especialidad,
          row.obra_social ?? "Particular",
          `$${row.valor_total}`,
          row.estado,
        ]);
      });
    }

    doc.end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al generar el PDF" });
  }
};

// HELPERS 

function drawLine(doc) {
  doc
    .moveTo(40, doc.y)
    .lineTo(555, doc.y)
    .strokeColor("#aaaaaa")
    .lineWidth(0.5)
    .stroke();
}

function drawTableRow(doc, cols, isHeader = false) {
  const startX = 40;
  const pageWidth = 515;
  const colWidth = pageWidth / cols.length;
  const y = doc.y;
  const rowHeight = 18;

  if (isHeader) {
    doc
      .rect(startX, y, pageWidth, rowHeight)
      .fillColor("#2c3e50")
      .fill();
  } else {
    doc
      .rect(startX, y, pageWidth, rowHeight)
      .fillColor("#f4f4f4")
      .fill();
  }

  doc.fillColor(isHeader ? "#ffffff" : "#222222");

  cols.forEach((text, i) => {
    doc
      .fontSize(isHeader ? 8 : 7.5)
      .font(isHeader ? "Helvetica-Bold" : "Helvetica")
      .text(String(text ?? ""), startX + i * colWidth + 3, y + 5, {
        width: colWidth - 6,
        lineBreak: false,
        ellipsis: true,
      });
  });

  doc.moveDown(0);
  doc.y = y + rowHeight + 2;
  doc.fillColor("#000000");
}
