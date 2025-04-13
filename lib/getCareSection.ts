// lib/getCareSection.ts

export async function getCareSection(title: string): Promise<string | null> {
  try {
    // 1️⃣ ページのセクションを取得
    const sectionRes = await fetch(
      `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(
        title
      )}&prop=sections&format=json&origin=*`
    );
    const sectionData = await sectionRes.json();

    const sections = sectionData?.parse?.sections;
    if (!sections) return null;

    // 2️⃣ 育て方っぽいセクションを探す
    const targetSection = sections.find((section: any) => {
      const line = section.line.toLowerCase();
      return (
        line.includes("cultivation") ||
        line.includes("care") ||
        line.includes("growing") ||
        line.includes("propagation")
      );
    });

    if (!targetSection) return null;

    // 3️⃣ セクションIDを使って本文を取得
    const contentRes = await fetch(
      `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(
        title
      )}&section=${targetSection.index}&prop=text&format=json&origin=*`
    );
    const contentData = await contentRes.json();
    const html = contentData?.parse?.text?.["*"];

    if (!html) return null;

    // 4️⃣ HTMLタグをざっくり取り除いてテキストに変換（簡易版）
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || "";

    return text.trim();
  } catch (error) {
    console.error("📛 Wikipedia care section error:", error);
    return null;
  }
}
