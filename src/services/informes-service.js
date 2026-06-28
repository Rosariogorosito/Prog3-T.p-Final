import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const reportePorEspecialidades = async (datos) => {
  const plantillaPath = path.join(
    __dirname,
    "../utils/handlebars/turnosPorEspecialidad.hbs"
  );

  const plantillaHtml = fs.readFileSync(plantillaPath, "utf-8");

  const template = Handlebars.compile(plantillaHtml);
  console.log("DATOS INFORME:", datos);

  const html = template({
    especialidades: datos
  });

  const browser = await puppeteer.launch();

  const pagina = await browser.newPage();

  await pagina.setContent(html);

  const pdf = await pagina.pdf({
    format: "A4",
    printBackground: true
  });

  await browser.close();

  return pdf;
};