"use client";

export interface ShareCardInput {
  caseTitle: string;
  rankLabel: string;
  points: number;
  correct: boolean;
  reason: "suclama" | "sure-doldu" | "vazgecildi";
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function generateShareCard(input: ShareCardInput): Promise<Blob | null> {
  const W = 1200;
  const H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const bg = "#141212";
  const paper = "#ede6d6";
  const paperInk = "#241f1a";
  const gold = "#d4af37";
  const red = "#b3231c";

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 140; i++) {
    const x = (i * 197) % W;
    const y = (i * 149) % H;
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = red;
  ctx.fillRect(0, 0, W, 10);

  ctx.textAlign = "center";
  ctx.fillStyle = gold;
  ctx.font = "600 22px Georgia, serif";
  ctx.textBaseline = "alphabetic";
  ctx.save();
  ctx.font = "600 18px 'Courier New', monospace";
  ctx.fillText("D İ J İ T A L   D E D E K T İ F L İ K   O Y U N U", W / 2, 90);
  ctx.restore();

  ctx.fillStyle = "#f2ede4";
  ctx.font = "900 64px Georgia, serif";
  ctx.fillText("ŞÜPHELİ", W / 2, 165);

  // vaka paper card
  const cardX = 140;
  const cardY = 210;
  const cardW = W - cardX * 2;
  const cardH = 300;
  ctx.fillStyle = paper;
  ctx.fillRect(cardX, cardY, cardW, cardH);
  ctx.strokeStyle = "rgba(36,31,26,0.15)";
  ctx.lineWidth = 2;
  ctx.strokeRect(cardX, cardY, cardW, cardH);

  const stampText = input.correct
    ? "ÇÖZÜLDÜ"
    : input.reason === "sure-doldu"
      ? "SÜRE DOLDU"
      : input.reason === "vazgecildi"
        ? "VAZGEÇİLDİ"
        : "YANLIŞ ŞÜPHELİ";
  const stampColor = input.correct ? gold : red;

  ctx.save();
  ctx.translate(cardX + cardW - 130, cardY + 55);
  ctx.rotate((-8 * Math.PI) / 180);
  ctx.strokeStyle = stampColor;
  ctx.lineWidth = 4;
  ctx.font = "700 22px Georgia, serif";
  ctx.textAlign = "center";
  const stampW = ctx.measureText(stampText).width + 36;
  ctx.strokeRect(-stampW / 2, -26, stampW, 44);
  ctx.fillStyle = stampColor;
  ctx.fillText(stampText, 0, 3);
  ctx.restore();

  ctx.textAlign = "left";
  ctx.fillStyle = paperInk;
  ctx.font = "700 44px Georgia, serif";
  const titleLines = wrapText(ctx, input.caseTitle, cardW - 80);
  titleLines.forEach((line, i) => {
    ctx.fillText(line, cardX + 40, cardY + 115 + i * 52);
  });

  const rankY = cardY + 115 + titleLines.length * 52 + 50;
  ctx.fillStyle = red;
  ctx.font = "600 18px 'Courier New', monospace";
  ctx.fillText("DEDEKTİF RÜTBESİ", cardX + 40, rankY);

  ctx.fillStyle = paperInk;
  ctx.font = "700 34px Georgia, serif";
  ctx.fillText(`${input.rankLabel} · ${input.points} puan`, cardX + 40, rankY + 42);

  ctx.textAlign = "center";
  ctx.fillStyle = "#b8afa2";
  ctx.font = "italic 20px Georgia, serif";
  ctx.fillText("“Herkes bir şey saklıyor.”", W / 2, H - 40);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}
