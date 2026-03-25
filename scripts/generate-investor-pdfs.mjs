import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { writeFileSync, mkdirSync } from "fs";

// ─── Brand Colours ───
const TEAL = rgb(45 / 255, 212 / 255, 191 / 255);
const NAVY = rgb(10 / 255, 15 / 255, 28 / 255);
const DARK_NAVY = rgb(6 / 255, 10 / 255, 20 / 255);
const GREY = rgb(148 / 255, 163 / 255, 184 / 255);
const LIGHT_GREY = rgb(0.55, 0.58, 0.63);
const WHITE = rgb(1, 1, 1);
const PAGE_BG = rgb(0.98, 0.98, 0.99);
const TEXT_DARK = rgb(0.12, 0.13, 0.18);
const TEXT_BODY = rgb(0.2, 0.22, 0.28);
const RED_MUTED = rgb(0.7, 0.25, 0.25);

// ─── Page Dimensions ───
const W = 612;
const H = 792;
const MARGIN = 60;
const CONTENT_W = W - MARGIN * 2;
const FOOTER_Y = 50;
const HEADER_H = 50;
const CONTENT_TOP = H - HEADER_H - 40;
const CONTENT_BOTTOM = FOOTER_Y + 30;

const VERSION = "v1.0";
const DATE = "February 2026";

// ─── Helper: Wrap Text ───
function wrapText(text, font, size, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (font.widthOfTextAtSize(testLine, size) > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// ─── PDF Builder Class ───
class PDFBuilder {
  constructor(doc, fonts, docTitle) {
    this.doc = doc;
    this.fonts = fonts;
    this.docTitle = docTitle;
    this.page = null;
    this.y = CONTENT_TOP;
    this.pageNum = 0;
    this.pages = [];
  }

  newContentPage() {
    this.page = this.doc.addPage([W, H]);
    this.pageNum++;
    this.pages.push(this.page);

    // Background
    this.page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: PAGE_BG });

    // Header bar
    this.page.drawRectangle({ x: 0, y: H - HEADER_H, width: W, height: HEADER_H, color: NAVY });
    this.page.drawText("METABRAIN LABS", {
      x: MARGIN, y: H - 33, font: this.fonts.bold, size: 9, color: TEAL,
    });
    const headerRight = `${this.docTitle.toUpperCase()}  |  ${VERSION}`;
    const hrW = this.fonts.regular.widthOfTextAtSize(headerRight, 7);
    this.page.drawText(headerRight, {
      x: W - MARGIN - hrW, y: H - 33, font: this.fonts.regular, size: 7, color: GREY,
    });

    // Footer bar
    this.page.drawRectangle({ x: 0, y: 0, width: W, height: 40, color: NAVY });
    this.page.drawText(`CONFIDENTIAL  |  MetaBrain Labs Ltd  |  ${DATE}`, {
      x: MARGIN, y: 14, font: this.fonts.regular, size: 7, color: GREY,
    });

    this.y = CONTENT_TOP;
    return this;
  }

  ensureSpace(needed) {
    if (this.y - needed < CONTENT_BOTTOM) {
      this.newContentPage();
    }
  }

  drawSectionTitle(text) {
    this.ensureSpace(50);
    this.page.drawText(text, {
      x: MARGIN, y: this.y, font: this.fonts.serifBold, size: 20, color: NAVY,
    });
    this.y -= 8;
    this.page.drawRectangle({ x: MARGIN, y: this.y, width: 40, height: 2, color: TEAL });
    this.y -= 24;
  }

  drawSubheading(text) {
    this.ensureSpace(35);
    this.page.drawText(text, {
      x: MARGIN, y: this.y, font: this.fonts.bold, size: 12, color: NAVY,
    });
    this.y -= 20;
  }

  drawParagraph(text, opts = {}) {
    const font = opts.font || this.fonts.regular;
    const size = opts.size || 10;
    const color = opts.color || TEXT_BODY;
    const indent = opts.indent || 0;
    const lineHeight = opts.lineHeight || 16;
    const lines = wrapText(text, font, size, CONTENT_W - indent);

    for (const line of lines) {
      this.ensureSpace(lineHeight + 2);
      this.page.drawText(line, {
        x: MARGIN + indent, y: this.y, font, size, color,
      });
      this.y -= lineHeight;
    }
    this.y -= 6;
  }

  drawBullet(text, opts = {}) {
    const font = opts.font || this.fonts.regular;
    const size = opts.size || 10;
    const color = opts.color || TEXT_BODY;
    const bulletIndent = 14;
    const textIndent = 28;

    this.ensureSpace(18);
    this.page.drawText("\u2022", {
      x: MARGIN + bulletIndent, y: this.y, font: this.fonts.regular, size: 10, color: TEAL,
    });

    const lines = wrapText(text, font, size, CONTENT_W - textIndent);
    for (const line of lines) {
      this.ensureSpace(16);
      this.page.drawText(line, {
        x: MARGIN + textIndent, y: this.y, font, size, color,
      });
      this.y -= 16;
    }
    this.y -= 3;
  }

  drawKeyValue(key, value) {
    this.ensureSpace(18);
    const keyWidth = this.fonts.bold.widthOfTextAtSize(key + ": ", 10);
    this.page.drawText(key + ": ", {
      x: MARGIN + 14, y: this.y, font: this.fonts.bold, size: 10, color: NAVY,
    });
    const valLines = wrapText(value, this.fonts.regular, 10, CONTENT_W - 14 - keyWidth);
    let first = true;
    for (const line of valLines) {
      this.page.drawText(line, {
        x: MARGIN + 14 + (first ? keyWidth : 0),
        y: this.y,
        font: this.fonts.regular, size: 10, color: TEXT_BODY,
      });
      this.y -= 16;
      first = false;
    }
    this.y -= 2;
  }

  drawSpacer(px = 12) {
    this.y -= px;
  }

  drawHorizontalRule() {
    this.ensureSpace(16);
    this.page.drawRectangle({
      x: MARGIN, y: this.y, width: CONTENT_W, height: 0.5, color: rgb(0.82, 0.84, 0.88),
    });
    this.y -= 16;
  }

  drawTableRow(cols, widths, opts = {}) {
    const font = opts.font || this.fonts.regular;
    const size = opts.size || 9;
    const color = opts.color || TEXT_BODY;
    this.ensureSpace(16);
    let x = MARGIN;
    for (let i = 0; i < cols.length; i++) {
      this.page.drawText(cols[i], { x, y: this.y, font, size, color });
      x += widths[i];
    }
    this.y -= 15;
  }

  addPageNumbers() {
    const total = this.pages.length;
    for (let i = 0; i < total; i++) {
      const numText = `${i + 1} / ${total}`;
      const nw = this.fonts.regular.widthOfTextAtSize(numText, 7);
      this.pages[i].drawText(numText, {
        x: W - MARGIN - nw, y: 14, font: this.fonts.regular, size: 7, color: GREY,
      });
    }
  }
}

// ─── Cover Page Generator ───
function drawCoverPage(doc, fonts, { title, subtitle, docType }) {
  const cover = doc.addPage([W, H]);
  cover.drawRectangle({ x: 0, y: 0, width: W, height: H, color: NAVY });

  // Subtle decorative elements
  cover.drawRectangle({ x: MARGIN, y: H - 100, width: 60, height: 3, color: TEAL });
  cover.drawRectangle({ x: MARGIN, y: H - 108, width: 30, height: 1, color: rgb(45/255, 212/255, 191/255, 0.4) });

  // Company name
  cover.drawText("METABRAIN LABS", {
    x: MARGIN, y: H - 145, font: fonts.bold, size: 12, color: TEAL,
  });

  // Doc type tag
  if (docType) {
    cover.drawText(docType.toUpperCase(), {
      x: MARGIN, y: H - 165, font: fonts.regular, size: 9, color: GREY,
    });
  }

  // Title
  const titleLines = wrapText(title, fonts.serifBold, 30, CONTENT_W);
  let y = H - 220;
  for (const line of titleLines) {
    cover.drawText(line, { x: MARGIN, y, font: fonts.serifBold, size: 30, color: WHITE });
    y -= 38;
  }

  // Subtitle
  if (subtitle) {
    y -= 8;
    const subLines = wrapText(subtitle, fonts.regular, 12, CONTENT_W);
    for (const line of subLines) {
      cover.drawText(line, { x: MARGIN, y, font: fonts.regular, size: 12, color: GREY });
      y -= 18;
    }
  }

  // Version & Date
  y -= 20;
  cover.drawText(`${VERSION}  |  ${DATE}`, {
    x: MARGIN, y, font: fonts.regular, size: 10, color: TEAL,
  });

  // Footer section
  cover.drawRectangle({ x: 0, y: 0, width: W, height: 110, color: DARK_NAVY });

  cover.drawText("CONFIDENTIAL", {
    x: MARGIN, y: 85, font: fonts.bold, size: 10, color: TEAL,
  });
  cover.drawText("This document is confidential and intended solely for the named recipient.", {
    x: MARGIN, y: 68, font: fonts.regular, size: 8, color: GREY,
  });
  cover.drawText("It should not be distributed, reproduced, or relied upon without written consent.", {
    x: MARGIN, y: 56, font: fonts.regular, size: 8, color: GREY,
  });

  cover.drawRectangle({ x: MARGIN, y: 42, width: CONTENT_W, height: 0.5, color: rgb(0.3, 0.35, 0.45) });

  cover.drawText("MetaBrain Labs Ltd  |  United Kingdom  |  metabrainlabs.com", {
    x: MARGIN, y: 28, font: fonts.regular, size: 8, color: GREY,
  });
  cover.drawText("Contact: investors@metabrainlabs.com", {
    x: MARGIN, y: 16, font: fonts.regular, size: 8, color: GREY,
  });
}

// ─── FCA Disclaimer Page ───
function drawFCAPage(builder) {
  builder.newContentPage();
  builder.drawSectionTitle("Important Notices & Disclaimers");
  builder.drawSpacer(4);

  builder.drawSubheading("FCA Financial Promotion Disclaimer");
  builder.drawParagraph(
    "This document has not been approved by an authorised person within the meaning of the Financial Services and Markets Act 2000 (FSMA). This document is exempt from the general restriction in section 21 FSMA on the communication of invitations or inducements to engage in investment activity on the grounds that it is made only to and directed at persons who are (a) investment professionals falling within article 19(5) of the Financial Services and Markets Act 2000 (Financial Promotion) Order 2005 (the \"Order\"), (b) high net worth companies, unincorporated associations and partnerships falling within article 49(2)(a) to (d) of the Order, or (c) persons to whom it may otherwise lawfully be communicated."
  );
  builder.drawParagraph(
    "The investments to which this document relates are available only to such persons, and any invitation, offer, or agreement to subscribe, purchase, or otherwise acquire such investments will be engaged in only with such persons. Any person who is not such a person should not act or rely on this document or any of its contents."
  );
  builder.drawSpacer(8);

  builder.drawSubheading("Risk Warning");
  builder.drawParagraph(
    "MetaBrain Labs Ltd is a pre-revenue, early-stage research and development company. Investment in early-stage companies carries substantial risk, including the risk of total loss of capital. Past performance is not indicative of future results. The value of investments can fall as well as rise, and investors may not recover the amount originally invested."
  );
  builder.drawParagraph(
    "Prospective investors should seek independent financial, legal, and tax advice before making any investment decision. This document does not constitute an offer to sell or a solicitation of an offer to buy securities. Any such offer would only be made pursuant to a formal offering document."
  );
  builder.drawSpacer(8);

  builder.drawSubheading("Forward-Looking Statements");
  builder.drawParagraph(
    "This document contains forward-looking statements that involve risks and uncertainties. These statements relate to future events, future performance, and projected financial outcomes that are based on current expectations and assumptions. Actual results may differ materially from those anticipated in these forward-looking statements due to various factors including, but not limited to, market conditions, scientific outcomes, regulatory changes, and competitive dynamics."
  );
  builder.drawSpacer(8);

  builder.drawSubheading("Related-Party Disclosure");
  builder.drawParagraph(
    "MetaBrain Labs Ltd engages Pixelette Technologies Ltd for research and development execution services. Pixelette Technologies is a related party: both entities share common founding leadership. Mr Asif Hussain Rana serves as Founder & CEO of MetaBrain Labs and is also the founder of Pixelette Technologies. All related-party transactions are conducted at arm's-length terms and subject to independent board review. A detailed related-party transaction register is maintained and available to investors upon request."
  );
  builder.drawSpacer(8);

  builder.drawSubheading("Intellectual Property");
  builder.drawParagraph(
    "All intellectual property developed by Pixelette Technologies in execution of MetaBrain Labs research programmes is assigned to MetaBrain Labs Ltd under formal IP assignment agreements. MetaBrain Labs maintains full ownership of all platform technology, research outputs, and associated intellectual property."
  );
  builder.drawSpacer(8);

  builder.drawSubheading("Contact Information");
  builder.drawParagraph("MetaBrain Labs Ltd");
  builder.drawParagraph("Registered in England and Wales");
  builder.drawParagraph("Investor enquiries: investors@metabrainlabs.com");
  builder.drawParagraph("General enquiries: contact@metabrainlabs.com");
  builder.drawParagraph("Website: metabrainlabs.com");
}

// ─── Document Content: Executive Summary ───
function buildExecutiveSummary(builder) {
  // Page 1: Company Overview
  builder.newContentPage();
  builder.drawSectionTitle("1. Company Overview");
  builder.drawParagraph(
    "MetaBrain Labs is a UK-headquartered neuroscience and artificial intelligence company building integrated infrastructure for safe, ethical cognitive enhancement. The company is developing systems designed to measurably improve human memory, learning, focus, and decision-making through the application of established neuroscience, adaptive artificial intelligence, and privacy-preserving identity technology."
  );
  builder.drawParagraph(
    "Founded by Mr Asif Hussain Rana, MetaBrain Labs operates from two locations: corporate headquarters in London (United Kingdom) for governance, regulatory affairs, and institutional partnerships; and a research & development centre in Pakistan (Lahore/Islamabad) for core research, engineering, and prototype development. R&D execution is delivered through Pixelette Technologies, a related-party entity under common founding leadership (see Related-Party Disclosure in the Disclaimers section)."
  );
  builder.drawParagraph(
    "The company is currently in Phase I — foundational research, team assembly, and initial prototype development. MetaBrain Labs is a pre-revenue entity. All financial projections, market estimates, and technology descriptions in this document represent planned capabilities and should be understood in the context of the company's early-stage status."
  );
  builder.drawSpacer(8);
  builder.drawSubheading("Corporate Structure");
  builder.drawBullet("Legal entity: MetaBrain Labs Ltd, registered in England and Wales");
  builder.drawBullet("Stage: Pre-revenue, Phase I (research & development)");
  builder.drawBullet("Headquarters: London, United Kingdom");
  builder.drawBullet("R&D centre: Lahore/Islamabad, Pakistan (operated via Pixelette Technologies)");
  builder.drawBullet("Founded by: Mr Asif Hussain Rana (Founder & CEO)");

  // Page 2: The Opportunity
  builder.newContentPage();
  builder.drawSectionTitle("2. The Opportunity");
  builder.drawParagraph(
    "Artificial intelligence is advancing at an unprecedented rate. Within the next decade, AI systems are projected to exceed human performance in an increasing number of measurable cognitive domains. This trajectory creates a fundamental and widening asymmetry: machine intelligence is compounding while human biological cognition remains largely static."
  );
  builder.drawParagraph(
    "This intelligence gap has implications across every sector of the economy. Defence organisations require personnel who can process information faster and make decisions under increasing cognitive load. Educational institutions face students whose attention and retention patterns are shaped by digital environments. Healthcare systems manage growing populations with age-related cognitive decline. Enterprise organisations demand cognitive performance from knowledge workers operating in environments of accelerating complexity."
  );
  builder.drawParagraph(
    "The global cognitive enhancement market is experiencing significant growth driven by these structural pressures. Market research estimates from Grand View Research and Allied Market Research project the neurotechnology and cognitive enhancement sector to grow substantially through the end of the decade, with estimates ranging from $10 billion to $20 billion depending on market definition and scope. MetaBrain Labs references a composite figure of $15 billion by 2030, which represents a mid-range estimate across these third-party sources."
  );
  builder.drawSpacer(6);
  builder.drawSubheading("Market Drivers");
  builder.drawBullet("AI capability acceleration creating institutional demand for human cognitive parity");
  builder.drawBullet("Neuroscience research maturity enabling evidence-based intervention design");
  builder.drawBullet("Hardware miniaturisation making neural sensing viable outside laboratory settings");
  builder.drawBullet("Regulatory frameworks beginning to address neurotechnology governance");
  builder.drawBullet("Institutional demand from defence, education, healthcare, and enterprise sectors");

  builder.drawSpacer(6);
  builder.drawSubheading("The Gap in the Market");
  builder.drawParagraph(
    "Current cognitive enhancement solutions are fragmented and limited: consumer meditation applications (Calm, Headspace) offer relaxation but not measurable cognitive improvement; nootropic supplements lack rigorous clinical validation; basic neurofeedback devices (Muse, Emotiv) capture limited signals without adaptive AI enhancement; and pharmaceutical interventions carry significant side-effect profiles. No organisation has built the integrated, governance-first infrastructure required for safe, measurable, and sustained cognitive enhancement."
  );

  // Page 3: Platform Architecture
  builder.newContentPage();
  builder.drawSectionTitle("3. Platform Architecture");
  builder.drawParagraph(
    "MetaBrain Labs is designing a full-stack cognitive enhancement platform comprising five integrated technology layers operating as a continuous closed-loop system. The platform is designed to measure cognitive state, process that information in real-time, deliver precisely targeted interventions, and measure the effect — continuously optimising enhancement for each individual user."
  );
  builder.drawParagraph(
    "The architecture is designed so that each layer enhances the others, creating compounding improvements over time. The following describes the planned platform architecture. Development is in early stages, and specific capabilities will be validated through the Phase I research programme."
  );
  builder.drawSpacer(6);

  builder.drawSubheading("Layer 01 — Neural Signal Acquisition");
  builder.drawParagraph(
    "High-fidelity capture of cognitive signals through multi-modal sensor arrays. The acquisition layer targets research-grade accuracy while maintaining usability outside laboratory settings. Signal modalities under investigation include electroencephalography (EEG), functional near-infrared spectroscopy (fNIRS), and physiological markers including heart rate variability, galvanic skin response, and eye tracking."
  );

  builder.drawSubheading("Layer 02 — Cognitive Signal Processing");
  builder.drawParagraph(
    "Signal processing algorithms designed to transform raw neural data into structured cognitive events. This layer bridges the gap between raw biological signals and actionable cognitive intelligence. The processing pipeline is designed to include artifact removal, feature extraction, cognitive state classification, and event generation — all operating within the latency requirements for closed-loop enhancement."
  );

  builder.drawSubheading("Layer 03 — MetaBrain Cognitive Engine");
  builder.drawParagraph(
    "A hybrid neuro-symbolic AI architecture designed to learn individual cognitive patterns and optimise enhancement in real-time. The engine builds personalised cognitive profiles that improve over time, combining neural network pattern recognition with symbolic reasoning for explainable, auditable cognitive models."
  );

  builder.drawSubheading("Layer 04 — Learning Acceleration Engine");
  builder.drawParagraph(
    "Transforms enhanced cognitive states into measurable performance improvements through precisely timed interventions optimised for individual cognitive profiles. Target domains include memory enhancement (encoding and recall), learning acceleration (compressed skill acquisition), focus optimisation (attention and distraction management), and decision-making clarity (cognitive load management)."
  );

  builder.drawSubheading("Layer 05 — Blockchain Neural Identity (BNID)");
  builder.drawParagraph(
    "Decentralised cognitive identity infrastructure ensuring absolute user ownership of all cognitive data. Designed on zero-knowledge proof architecture with post-quantum cryptographic security. The BNID system ensures that users own their cognitive data absolutely, no entity can access data without cryptographic consent, and identity is portable and user-controlled."
  );

  // Page 4: Market Opportunity
  builder.newContentPage();
  builder.drawSectionTitle("4. Market Opportunity & Demand Sectors");
  builder.drawParagraph(
    "The cognitive enhancement market spans multiple high-value sectors with structural institutional demand. MetaBrain Labs' platform architecture is designed to serve institutional clients across these sectors, with consumer applications as a longer-term secondary market. The following represents the company's assessment of addressable market sectors."
  );
  builder.drawSpacer(4);

  builder.drawSubheading("Defence & Intelligence");
  builder.drawParagraph(
    "Military and intelligence organisations require personnel capable of accelerated information processing, enhanced situational awareness, and improved decision-making under extreme cognitive load. Cognitive enhancement represents a force multiplier that does not require additional personnel. Major defence agencies in the US, UK, and allied nations have active programmes investigating cognitive performance improvement."
  );

  builder.drawSubheading("Education & Training");
  builder.drawParagraph(
    "Educational institutions face a fundamental challenge: human learning processes have not evolved to match the pace and complexity of modern knowledge requirements. Personalised cognitive enhancement can accelerate skill acquisition, improve information retention, and enable adaptive learning pathways tailored to individual cognitive profiles."
  );

  builder.drawSubheading("Healthcare & Rehabilitation");
  builder.drawParagraph(
    "Age-related cognitive decline affects a growing proportion of the global population. Neurodegenerative conditions including Alzheimer's disease, Parkinson's disease, and age-related cognitive impairment represent a significant healthcare burden. Cognitive enhancement infrastructure has potential applications in rehabilitation, cognitive maintenance, and early intervention."
  );

  builder.drawSubheading("Enterprise & Professional");
  builder.drawParagraph(
    "Knowledge workers operate in environments of accelerating complexity and information density. Executive cognitive performance, professional training acceleration, and workforce productivity represent a significant enterprise market. Early adopters are expected to be high-value professional services, financial services, and technology organisations."
  );

  // Page 5: Governance Framework
  builder.newContentPage();
  builder.drawSectionTitle("5. Governance Framework");
  builder.drawParagraph(
    "MetaBrain Labs is committed to institutional-grade governance from inception. The company is establishing four independent oversight bodies to ensure that all research and development meets the highest standards of scientific rigour, ethical responsibility, and regulatory compliance. These governance bodies are being assembled as part of the Phase I programme; specific board members will be announced as appointments are confirmed."
  );
  builder.drawSpacer(4);

  builder.drawSubheading("Scientific Advisory Board (Planned)");
  builder.drawParagraph(
    "Will comprise leading neuroscientists, cognitive psychologists, and AI researchers providing rigorous peer review of all research methodologies, experimental designs, and enhancement protocols. The SAB will review and approve all research programmes before initiation and provide ongoing scientific oversight."
  );

  builder.drawSubheading("Ethics & Neurorights Council (Planned)");
  builder.drawParagraph(
    "Will comprise bioethicists, human rights experts, and legal scholars ensuring all cognitive enhancement work respects autonomy, informed consent, cognitive liberty, and equitable access. The Council will develop and maintain the MetaBrain Neurorights Framework."
  );

  builder.drawSubheading("Clinical Oversight Committee (Planned)");
  builder.drawParagraph(
    "Will comprise medical professionals and clinical trial specialists overseeing safety protocols, adverse event monitoring, participant welfare, and regulatory compliance for all human-subjects research."
  );

  builder.drawSubheading("Security & Identity Board (Planned)");
  builder.drawParagraph(
    "Will comprise cybersecurity experts and blockchain architects safeguarding cognitive data sovereignty, ensuring tamper-proof identity infrastructure, and maintaining the security posture of the BNID system."
  );

  builder.drawSpacer(6);
  builder.drawSubheading("Research Standards");
  builder.drawBullet("Pre-registered study designs with published protocols");
  builder.drawBullet("Adequate statistical power and appropriate controls");
  builder.drawBullet("Open publication of results regardless of outcome");
  builder.drawBullet("Independent replication before any performance claim");
  builder.drawBullet("Peer review through established scientific channels");
  builder.drawBullet("Full IRB/ethics committee approval for all human-subjects research");

  // Page 6: Team & Leadership
  builder.newContentPage();
  builder.drawSectionTitle("6. Team & Leadership");

  builder.drawSubheading("Founder & Chief Executive Officer");
  builder.drawParagraph(
    "Mr Asif Hussain Rana is the founder and CEO of MetaBrain Labs. With a background spanning AI systems, enterprise technology, and a research interest in neuroscience-AI convergence, he identified the structural gap between accelerating machine intelligence and static human cognition. He founded MetaBrain Labs to build the infrastructure required to close that gap — responsibly, ethically, and at scale."
  );
  builder.drawParagraph(
    "Mr Rana is also the founder of Pixelette Technologies, which provides R&D execution services to MetaBrain Labs. This related-party relationship is disclosed in full in the Disclaimers section of this document. All related-party transactions are conducted at arm's-length terms."
  );
  builder.drawSpacer(4);

  builder.drawSubheading("Founding Team Recruitment (Phase I Priority)");
  builder.drawParagraph(
    "A primary objective of Phase I capital deployment is the recruitment of a world-class founding scientific team. Key positions being recruited include:"
  );
  builder.drawBullet("Chief Scientific Officer — a senior neuroscientist to lead the research programme and chair the Scientific Advisory Board");
  builder.drawBullet("Lead Computational Neuroscientist — to architect the cognitive signal processing pipeline and cognitive engine");
  builder.drawBullet("Lead AI Researcher — specialising in neuro-symbolic AI, adaptive systems, and real-time inference");
  builder.drawBullet("Clinical Research Specialist — to design and oversee human-subjects research protocols");
  builder.drawBullet("Blockchain & Identity Architect — to design and build the BNID sovereign identity infrastructure");
  builder.drawSpacer(4);

  builder.drawSubheading("R&D Execution: Pixelette Technologies (Related Party)");
  builder.drawParagraph(
    "During the early formation stage, core engineering and R&D execution is provided by Pixelette Technologies Ltd, a technology services company founded by Mr Asif Hussain Rana. Pixelette provides immediate engineering capacity while the dedicated MetaBrain research team is assembled. All intellectual property developed under MetaBrain Labs programmes is formally assigned to MetaBrain Labs Ltd via IP assignment agreements."
  );

  // Page 7: Investment Thesis
  builder.newContentPage();
  builder.drawSectionTitle("7. Investment Thesis");
  builder.drawParagraph(
    "MetaBrain Labs is seeking Phase I investment to fund foundational research, team assembly, and initial prototype development. The company offers early-stage investors exposure to a governance-first approach in the rapidly expanding neurotechnology sector."
  );
  builder.drawSpacer(4);

  builder.drawSubheading("Key Differentiators");
  builder.drawBullet("Integrated full-stack architecture: not point solutions, but complete infrastructure spanning signal acquisition through identity sovereignty");
  builder.drawBullet("Governance-first approach: institutional-grade oversight from inception, not retrofitted after development");
  builder.drawBullet("Dual UK/Pakistan operational structure: governance credibility with cost-efficient R&D execution");
  builder.drawBullet("Multi-decade mission orientation: building foundational infrastructure, not short-term consumer products");
  builder.drawBullet("Ethics and user sovereignty as architectural principles, not marketing features");
  builder.drawSpacer(4);

  builder.drawSubheading("Phase I Capital Allocation");
  builder.drawParagraph(
    "Phase I capital will be deployed across four primary areas. Detailed budgets and milestone-linked tranching will be provided in the formal offering document."
  );
  builder.drawBullet("Research & Development (45%): Foundational neuroscience research, prototype development, laboratory setup, computational infrastructure");
  builder.drawBullet("Team & Talent (30%): CSO recruitment, founding research team, clinical specialists, support staff");
  builder.drawBullet("Governance & Regulatory (10%): Oversight board formalisation, regulatory engagement, ethics framework, legal infrastructure");
  builder.drawBullet("Operations & Infrastructure (15%): UK headquarters, Pakistan R&D centre, technology infrastructure, working capital");
  builder.drawSpacer(4);

  builder.drawSubheading("Milestone Schedule");
  builder.drawBullet("Months 1–3: Team assembly — CSO appointment, core research team recruitment");
  builder.drawBullet("Months 3–6: Research programme initiation — pre-registered study protocols, IRB approvals");
  builder.drawBullet("Months 6–12: Prototype v1 — signal acquisition and processing proof of concept");
  builder.drawBullet("Months 12–18: Cognitive engine alpha — initial personalisation and closed-loop demonstration");
  builder.drawBullet("Months 18–24: Phase I validation — peer-reviewed publication of initial results");

  // Page 8: Risk Factors
  builder.newContentPage();
  builder.drawSectionTitle("8. Risk Factors");
  builder.drawParagraph(
    "Investment in MetaBrain Labs carries substantial risk. The company is a pre-revenue, early-stage research and development entity. Prospective investors should carefully consider the following risk factors before making any investment decision."
  );
  builder.drawSpacer(4);

  builder.drawSubheading("Scientific & Technical Risk");
  builder.drawParagraph(
    "The company's platform architecture is based on the integration of established scientific principles, but the specific combination and application to cognitive enhancement at scale is unproven. Research outcomes are inherently uncertain, and there is no guarantee that the platform will achieve its intended performance targets. The planned technology layers are in early design and concept stages."
  );

  builder.drawSubheading("Team & Execution Risk");
  builder.drawParagraph(
    "The company currently has a sole founder. The success of Phase I depends critically on the recruitment of a Chief Scientific Officer and founding research team in a competitive talent market. Failure or significant delay in recruiting key personnel could materially impact the company's ability to execute its research programme."
  );

  builder.drawSubheading("Regulatory & Legal Risk");
  builder.drawParagraph(
    "The neurotechnology and cognitive enhancement sector is subject to evolving regulatory frameworks across multiple jurisdictions. Changes in regulation could impact the company's ability to conduct research, develop products, or access markets. Medical device classification, data protection requirements, and clinical trial regulations all represent regulatory variables."
  );

  builder.drawSubheading("Market & Commercial Risk");
  builder.drawParagraph(
    "Market size projections are based on third-party estimates and are inherently uncertain. The company's ability to capture market share will depend on successful technology development, regulatory approvals, competitive dynamics, and market acceptance. Revenue generation is not expected until Phase II or later."
  );

  builder.drawSubheading("Related-Party Risk");
  builder.drawParagraph(
    "The company's R&D execution is provided by Pixelette Technologies, a related party under common founding leadership. While all transactions are conducted at arm's-length terms, this relationship creates potential conflicts of interest. Independent board oversight and transparent financial reporting mitigate but do not eliminate this risk."
  );

  builder.drawSubheading("Financial Risk");
  builder.drawParagraph(
    "The company has no revenue and no near-term revenue expectations. Additional funding rounds will be required to progress beyond Phase I. There is no guarantee that additional funding will be available on acceptable terms. Investors should be prepared for the possibility of total loss of invested capital."
  );
}

// ─── Document Content: Pitch Deck ───
function buildPitchDeck(builder) {
  // Page 1: The Problem
  builder.newContentPage();
  builder.drawSectionTitle("The Problem");
  builder.drawParagraph(
    "Artificial intelligence capability is advancing at an exponential rate. Human cognitive capability is not. This asymmetry is structural, accelerating, and will define the trajectory of human civilisation for the next century.",
    { size: 11 }
  );
  builder.drawParagraph(
    "Within the next decade, AI systems will exceed human performance in an expanding range of cognitive tasks — from pattern recognition and logical reasoning to creative synthesis and strategic planning. Every institution that depends on human cognitive performance faces a fundamental question: how do we maintain human relevance in an age of machine intelligence?"
  );
  builder.drawSpacer(6);
  builder.drawSubheading("Current Solutions Are Inadequate");
  builder.drawBullet("Consumer meditation apps offer relaxation, not measurable cognitive enhancement");
  builder.drawBullet("Nootropic supplements lack rigorous clinical validation and regulatory oversight");
  builder.drawBullet("Basic neurofeedback devices capture limited signals without adaptive AI integration");
  builder.drawBullet("Pharmaceutical interventions carry significant side-effect profiles and dependency risks");
  builder.drawBullet("No integrated, governance-first platform exists for safe, measurable cognitive enhancement");

  // Page 2: Our Solution
  builder.newContentPage();
  builder.drawSectionTitle("Our Solution");
  builder.drawParagraph(
    "MetaBrain Labs is building foundational infrastructure for cognitive enhancement — a full-stack platform designed to integrate neuroscience, adaptive AI, and blockchain-secured identity in a continuous closed-loop system."
  );
  builder.drawParagraph(
    "The platform is designed to measure cognitive state in real-time, deliver precisely timed interventions, measure the effect, and adapt. Each session is intended to improve the model. Each interaction makes the system smarter. This is not a static application — it is infrastructure that evolves."
  );
  builder.drawSpacer(6);
  builder.drawSubheading("Design Principles");
  builder.drawBullet("Integrated, not fragmented: full-stack from signal acquisition to identity sovereignty");
  builder.drawBullet("Adaptive, not static: AI engine that learns individual cognitive patterns over time");
  builder.drawBullet("Governed, not unregulated: institutional-grade oversight built into the architecture");
  builder.drawBullet("Sovereign, not extractive: users own their cognitive data absolutely via BNID");
  builder.drawBullet("Measurable, not speculative: all claims backed by validated, reproducible data");

  // Page 3: Platform Architecture
  builder.newContentPage();
  builder.drawSectionTitle("Platform Architecture");
  builder.drawParagraph(
    "Five integrated technology layers operating as a continuous closed-loop system. The architecture is currently in the design and early development phase."
  );
  builder.drawSpacer(4);
  builder.drawSubheading("Layer 01 — Neural Signal Acquisition");
  builder.drawParagraph("Multi-modal cognitive signal capture (EEG, fNIRS, physiological markers) targeting research-grade accuracy outside laboratory settings.");
  builder.drawSubheading("Layer 02 — Cognitive Signal Processing");
  builder.drawParagraph("Real-time signal processing pipeline: artifact removal, feature extraction, cognitive state classification, event generation within closed-loop latency requirements.");
  builder.drawSubheading("Layer 03 — MetaBrain Cognitive Engine");
  builder.drawParagraph("Hybrid neuro-symbolic AI building personalised cognitive profiles. Neural network pattern recognition combined with symbolic reasoning for explainable, auditable enhancement.");
  builder.drawSubheading("Layer 04 — Learning Acceleration Engine");
  builder.drawParagraph("Precisely timed interventions optimised for individual profiles. Memory enhancement, learning acceleration, focus optimisation, decision-making clarity.");
  builder.drawSubheading("Layer 05 — Blockchain Neural Identity (BNID)");
  builder.drawParagraph("Decentralised cognitive identity with zero-knowledge proof architecture and post-quantum cryptographic security. Absolute user data ownership.");

  // Page 4: Market Opportunity
  builder.newContentPage();
  builder.drawSectionTitle("Market Opportunity");
  builder.drawParagraph(
    "The cognitive enhancement market spans multiple high-value sectors with significant institutional demand. Third-party estimates project the global neurotechnology market to reach $10–20 billion by 2030."
  );
  builder.drawSpacer(4);

  const sectors = [
    ["Defence & Intelligence", "Accelerated training, enhanced decision-making under pressure, cognitive force multiplication"],
    ["Education & Training", "Personalised learning acceleration, improved retention and recall, adaptive skill development"],
    ["Healthcare", "Cognitive rehabilitation, neurodegenerative disease support, age-related cognitive maintenance"],
    ["Enterprise", "Executive performance optimisation, workforce training acceleration, knowledge worker productivity"],
    ["Consumer Premium", "Premium cognitive enhancement for professionals, creatives, and knowledge workers"],
  ];
  for (const [title, desc] of sectors) {
    builder.drawKeyValue(title, desc);
  }
  builder.drawSpacer(6);
  builder.drawParagraph(
    "MetaBrain Labs' initial go-to-market strategy focuses on institutional clients (B2B/B2G) with the highest willingness to pay and clearest use-case validation, before expanding to direct-to-consumer channels in later phases.",
    { font: builder.fonts.regular, size: 10, color: TEXT_BODY }
  );

  // Page 5: Business Model
  builder.newContentPage();
  builder.drawSectionTitle("Business Model");
  builder.drawParagraph(
    "MetaBrain Labs is a pre-revenue company in Phase I (R&D). The revenue model described below represents planned commercial pathways for Phase II and beyond. Revenue generation is contingent on successful technology development and regulatory approval."
  );
  builder.drawSpacer(4);

  builder.drawSubheading("Phase I (Current): Research & Validation");
  builder.drawBullet("Foundational neuroscience research programmes");
  builder.drawBullet("Founding team recruitment (CSO, lead researchers)");
  builder.drawBullet("Prototype development and validation");
  builder.drawBullet("Governance framework formalisation");

  builder.drawSpacer(4);
  builder.drawSubheading("Phase II (Planned): Platform Development & Initial Revenue");
  builder.drawBullet("Institutional licensing (B2B/B2G): annual platform subscriptions for defence, healthcare, and enterprise clients");
  builder.drawBullet("Research partnerships: collaborative research programmes with universities and research institutions");
  builder.drawBullet("Data sovereignty services: BNID infrastructure licensing");

  builder.drawSpacer(4);
  builder.drawSubheading("Phase III (Planned): Scale & Consumer");
  builder.drawBullet("Direct-to-consumer premium subscriptions for individual cognitive enhancement");
  builder.drawBullet("Platform API access for third-party developers building on MetaBrain infrastructure");
  builder.drawBullet("Cognitive analytics services for enterprise workforce optimisation");

  builder.drawSpacer(6);
  builder.drawParagraph(
    "The platform model is designed to create recurring revenue with network effects — each user interaction is intended to improve the cognitive engine for all users while maintaining individual data sovereignty through the BNID system."
  );

  // Page 6: Team & Leadership
  builder.newContentPage();
  builder.drawSectionTitle("Team & Leadership");

  builder.drawSubheading("Mr Asif Hussain Rana — Founder & CEO");
  builder.drawParagraph(
    "Background spanning AI systems, enterprise technology, and research interest in neuroscience-AI convergence. Founder of Pixelette Technologies (related-party R&D execution partner). Committed to governance-first development of human augmentation technologies."
  );
  builder.drawSpacer(4);

  builder.drawSubheading("Phase I Recruitment Priorities");
  builder.drawBullet("Chief Scientific Officer: senior neuroscientist to lead the research programme");
  builder.drawBullet("Computational neuroscientists for signal processing and cognitive engine development");
  builder.drawBullet("AI researchers specialising in neuro-symbolic systems and adaptive learning");
  builder.drawBullet("Clinical research specialists for human-subjects protocol design and oversight");
  builder.drawBullet("Blockchain and identity architects for BNID system design");
  builder.drawSpacer(4);

  builder.drawSubheading("R&D Execution Partnership");
  builder.drawParagraph(
    "Engineering and R&D execution is currently provided by Pixelette Technologies Ltd. Pixelette Technologies is a related party: both MetaBrain Labs and Pixelette Technologies share common founding leadership (Mr Asif Hussain Rana). All related-party transactions are conducted at arm's-length terms and subject to board oversight. Full IP assignment agreements ensure MetaBrain Labs retains ownership of all technology and research outputs."
  );

  // Page 7: Governance & Ethics
  builder.newContentPage();
  builder.drawSectionTitle("Governance & Ethics");
  builder.drawParagraph(
    "MetaBrain Labs is committed to institutional-grade governance from inception. The company is establishing four independent oversight bodies. These governance structures are being assembled as part of Phase I; appointments will be announced as they are confirmed."
  );
  builder.drawSpacer(4);

  builder.drawBullet("Scientific Advisory Board: peer review of all research methodologies and protocols");
  builder.drawBullet("Ethics & Neurorights Council: oversight of cognitive liberty, autonomy, consent, and equitable access");
  builder.drawBullet("Clinical Oversight Committee: safety protocols, adverse event monitoring, regulatory compliance");
  builder.drawBullet("Security & Identity Board: cognitive data sovereignty, BNID security, privacy architecture");
  builder.drawSpacer(6);

  builder.drawSubheading("Neurorights Framework");
  builder.drawParagraph(
    "MetaBrain Labs is developing a comprehensive Neurorights Framework addressing five core principles: cognitive liberty (the right to mental self-determination), mental privacy (protection from unauthorised neural data access), mental integrity (protection from harmful cognitive interference), psychological continuity (preservation of personal identity), and equitable access (commitment to preventing cognitive enhancement from deepening societal inequality)."
  );

  // Page 8: The Ask & Risk Factors
  builder.newContentPage();
  builder.drawSectionTitle("The Ask");
  builder.drawParagraph(
    "MetaBrain Labs is raising Phase I capital to fund the foundational stage of the company's research programme. Capital will be deployed across research & development (45%), team recruitment (30%), governance & regulatory formalisation (10%), and operations & infrastructure (15%). Detailed investment terms, valuation, and milestone-linked tranching will be provided in the formal offering document."
  );
  builder.drawSpacer(8);

  builder.drawSubheading("Why Now");
  builder.drawBullet("The AI capability explosion is creating urgent institutional demand for human cognitive parity");
  builder.drawBullet("Neuroscience has reached sufficient maturity to support evidence-based cognitive enhancement");
  builder.drawBullet("Hardware miniaturisation enables neural sensing outside laboratory settings");
  builder.drawBullet("Early movers in cognitive infrastructure will establish platform-level advantages");
  builder.drawBullet("Governance-first organisations will capture institutional trust that competitors cannot retrofit");
  builder.drawSpacer(8);

  builder.drawSubheading("Key Risks");
  builder.drawParagraph(
    "This is an early-stage, pre-revenue investment carrying substantial risk. Key risk factors include: scientific uncertainty in research outcomes, team recruitment in a competitive market, regulatory evolution, related-party dependency (Pixelette Technologies), and the potential for total loss of invested capital. Full risk disclosure is provided in the Executive Summary and Financial Summary documents. Prospective investors should seek independent financial, legal, and tax advice."
  );

  // Page 9: Contact
  builder.newContentPage();
  builder.drawSectionTitle("Contact & Next Steps");
  builder.drawSpacer(8);
  builder.drawParagraph("MetaBrain Labs Ltd", { font: builder.fonts.bold, size: 12, color: NAVY });
  builder.drawParagraph("Registered in England and Wales");
  builder.drawSpacer(8);
  builder.drawKeyValue("Investor enquiries", "investors@metabrainlabs.com");
  builder.drawKeyValue("General enquiries", "contact@metabrainlabs.com");
  builder.drawKeyValue("Website", "metabrainlabs.com");
  builder.drawSpacer(12);
  builder.drawParagraph(
    "We welcome conversations with qualified investors, institutional partners, and scientific collaborators who share our commitment to responsible cognitive enhancement."
  );
  builder.drawSpacer(8);
  builder.drawSubheading("Available Documents");
  builder.drawBullet("Executive Summary (v1.0, February 2026)");
  builder.drawBullet("Technology Overview (v1.0, February 2026)");
  builder.drawBullet("Financial Summary (v1.0, February 2026)");
  builder.drawBullet("Additional diligence materials available upon request");
}

// ─── Document Content: Technology Overview ───
function buildTechnologyOverview(builder) {
  // Page 1: Architecture Overview
  builder.newContentPage();
  builder.drawSectionTitle("1. Architecture Overview");
  builder.drawParagraph(
    "The MetaBrain platform is designed as a full-stack cognitive enhancement system integrating hardware, software, AI, and identity infrastructure in a closed-loop architecture. The system is designed to continuously measure cognitive state, process signals, deliver targeted interventions, and measure outcomes — creating a feedback loop that improves with each interaction."
  );
  builder.drawParagraph(
    "Unlike point solutions that address single cognitive domains (e.g., meditation for stress, flashcards for memory), MetaBrain's architecture is designed so that each layer enhances the others, creating compounding improvements over time. The signal acquisition layer feeds the processing pipeline, which informs the cognitive engine, which drives the acceleration layer, which generates new data for the acquisition layer."
  );
  builder.drawParagraph(
    "Important context: the platform architecture described in this document represents the company's design intent and research roadmap. MetaBrain Labs is in Phase I (foundational research and prototype development). The specific capabilities described are targets for validation through the Phase I research programme, not demonstrated performance characteristics."
  );
  builder.drawSpacer(6);
  builder.drawSubheading("Design Principles");
  builder.drawBullet("Closed-loop operation: continuous measure-process-enhance-measure cycle");
  builder.drawBullet("Individual adaptation: personalised cognitive profiles, not population averages");
  builder.drawBullet("Multi-modal sensing: combining multiple signal types for comprehensive cognitive state assessment");
  builder.drawBullet("Explainable AI: hybrid neuro-symbolic architecture enabling auditable decision-making");
  builder.drawBullet("Sovereign identity: user ownership of all cognitive data via decentralised infrastructure");

  // Page 2: Layer 01
  builder.newContentPage();
  builder.drawSectionTitle("2. Layer 01 — Neural Signal Acquisition");
  builder.drawParagraph(
    "The signal acquisition layer forms the sensory foundation of the MetaBrain platform. Its objective is to capture high-fidelity cognitive signals with sufficient quality for real-time cognitive state classification, while remaining practical for use outside controlled laboratory environments."
  );
  builder.drawSpacer(4);
  builder.drawSubheading("Signal Modalities Under Investigation");
  builder.drawBullet("Electroencephalography (EEG): non-invasive measurement of electrical brain activity with high temporal resolution (millisecond-scale). Well-established in neuroscience research and clinical practice.");
  builder.drawBullet("Functional near-infrared spectroscopy (fNIRS): optical measurement of cerebral blood oxygenation providing spatial information about brain region activation. More robust to movement artifacts than EEG.");
  builder.drawBullet("Physiological markers: heart rate variability (HRV), galvanic skin response (GSR), pupillometry, and eye tracking provide complementary measures of cognitive and emotional state.");
  builder.drawSpacer(4);
  builder.drawSubheading("Technical Challenges");
  builder.drawParagraph(
    "Achieving research-grade signal quality outside laboratory settings is a significant engineering challenge. Environmental noise, movement artifacts, electrode impedance variability, and user compliance all impact signal quality. The Phase I research programme will investigate adaptive signal quality optimisation techniques to maintain classification accuracy across real-world usage conditions."
  );
  builder.drawParagraph(
    "Hardware form factor represents a key research question: achieving the necessary sensor density and signal quality while maintaining a form factor that users will accept in non-clinical settings. Consumer-grade EEG devices (Muse, Emotiv) sacrifice significant signal quality for form factor. MetaBrain's research will investigate intermediate form factors suitable for institutional use cases."
  );

  // Page 3: Layer 02
  builder.newContentPage();
  builder.drawSectionTitle("3. Layer 02 — Cognitive Signal Processing");
  builder.drawParagraph(
    "The signal processing layer transforms raw neural and physiological signals into structured cognitive events that can be interpreted by the cognitive engine. This layer bridges the gap between biological reality (noisy, variable, individual-specific signals) and computational utility (clean, classified, actionable cognitive state information)."
  );
  builder.drawSpacer(4);
  builder.drawSubheading("Processing Pipeline Architecture");
  builder.drawBullet("Pre-processing: bandpass filtering, notch filtering (50/60Hz line noise), and baseline correction to prepare raw signals for analysis");
  builder.drawBullet("Artifact removal: independent component analysis (ICA), wavelet denoising, and adaptive artifact rejection to separate neural signals from non-neural contamination (eye blinks, muscle activity, electrode drift)");
  builder.drawBullet("Feature extraction: time-domain features (event-related potentials, amplitude measures), frequency-domain features (power spectral density across standard bands: delta, theta, alpha, beta, gamma), and time-frequency features (wavelet transforms, short-time Fourier transforms)");
  builder.drawBullet("Cognitive state classification: machine learning classifiers trained on labelled cognitive state data to detect attention levels, cognitive load, fatigue, engagement, and emotional valence in real-time");
  builder.drawBullet("Event generation: transformation of continuous state classifications into discrete cognitive events that trigger the enhancement pipeline");
  builder.drawSpacer(4);
  builder.drawSubheading("Latency Requirements");
  builder.drawParagraph(
    "Closed-loop cognitive enhancement imposes strict latency requirements on the processing pipeline. For real-time neurofeedback applications, the total loop latency (signal acquisition to intervention delivery) should be below 100ms to maintain the temporal correlation between brain state and feedback. The signal processing layer must complete its full pipeline within approximately 20-30ms to leave sufficient budget for the cognitive engine and acceleration layers."
  );

  // Page 4: Layer 03
  builder.newContentPage();
  builder.drawSectionTitle("4. Layer 03 — MetaBrain Cognitive Engine");
  builder.drawParagraph(
    "The cognitive engine is the adaptive intelligence at the core of the MetaBrain platform. It maintains a personalised cognitive profile for each user and uses this profile to optimise enhancement interventions in real-time. The engine is designed as a hybrid neuro-symbolic system, combining the pattern recognition strengths of neural networks with the interpretability and reasoning capabilities of symbolic AI."
  );
  builder.drawSpacer(4);
  builder.drawSubheading("Hybrid Neuro-Symbolic Architecture");
  builder.drawParagraph(
    "Pure neural network approaches to cognitive modelling are powerful but opaque — they can detect patterns but cannot explain their reasoning. For a system making decisions about cognitive enhancement interventions, explainability is not optional: users, clinicians, and regulators need to understand why a particular intervention was delivered at a particular time."
  );
  builder.drawParagraph(
    "The MetaBrain cognitive engine combines neural components (for high-performance pattern recognition in noisy biological signals) with symbolic components (for explicit cognitive state modelling, rule-based safety constraints, and explainable decision pathways). This hybrid approach is designed to provide both performance and transparency."
  );
  builder.drawSpacer(4);
  builder.drawSubheading("Personalisation Model");
  builder.drawBullet("Baseline cognitive profile: established during initial calibration sessions, mapping individual brain patterns to cognitive states");
  builder.drawBullet("Progressive adaptation: the model updates with each session, tracking changes in cognitive patterns over time");
  builder.drawBullet("Transfer learning: population-level patterns inform individual models, accelerating initial calibration while maintaining personalisation");
  builder.drawBullet("Federated learning: cognitive model improvements can be shared across users without exposing individual data, via privacy-preserving federated learning techniques");

  // Page 5: Layer 04
  builder.newContentPage();
  builder.drawSectionTitle("5. Layer 04 — Learning Acceleration Engine");
  builder.drawParagraph(
    "The acceleration engine transforms the cognitive engine's understanding of an individual's cognitive state into precisely targeted interventions designed to enhance specific cognitive functions. It is the output layer of the MetaBrain platform — the component that delivers measurable cognitive performance improvement."
  );
  builder.drawSpacer(4);
  builder.drawSubheading("Enhancement Domains");
  builder.drawKeyValue("Memory", "Encoding optimisation (presenting information during optimal brain states for memory formation), consolidation support (interventions timed to memory consolidation windows), and recall facilitation (priming techniques for faster, more accurate retrieval)");
  builder.drawKeyValue("Learning", "Accelerated skill acquisition through optimally timed practice intervals, difficulty adjustment based on real-time cognitive load assessment, and multi-modal reinforcement of learning material");
  builder.drawKeyValue("Focus", "Real-time neurofeedback for sustained attention, distraction detection and intervention, cognitive fatigue monitoring with adaptive break recommendations");
  builder.drawKeyValue("Decision-Making", "Cognitive load management during complex decision tasks, bias detection based on physiological markers of emotional interference, and clarity-enhancing interventions during high-stakes decisions");
  builder.drawSpacer(4);
  builder.drawSubheading("Intervention Modalities");
  builder.drawParagraph(
    "The acceleration engine is designed to deliver interventions through multiple modalities depending on the use case and user context: auditory neurofeedback (tonal or spatial audio cues), visual neurofeedback (ambient display cues or AR overlay), haptic feedback (vibrotactile cues via wearable devices), and adaptive content presentation (modifying the timing, difficulty, and modality of presented information)."
  );

  // Page 6: Layer 05
  builder.newContentPage();
  builder.drawSectionTitle("6. Layer 05 — Blockchain Neural Identity (BNID)");
  builder.drawParagraph(
    "Cognitive data is among the most sensitive personal information that can be collected. It reveals patterns of attention, emotional response, cognitive capability, and mental state. The BNID system is designed to ensure that this data remains under absolute user control through decentralised identity infrastructure built on cryptographic principles."
  );
  builder.drawSpacer(4);
  builder.drawSubheading("Core Design Principles");
  builder.drawBullet("User sovereignty: all cognitive data is owned by the user, not by MetaBrain Labs or any third party. Users grant and revoke access via cryptographic consent mechanisms.");
  builder.drawBullet("Zero-knowledge proofs: cognitive capabilities can be verified (e.g., for certification purposes) without revealing underlying data. A user can prove they achieved a cognitive performance threshold without exposing their raw neural data.");
  builder.drawBullet("Decentralised storage: cognitive profiles are stored on decentralised infrastructure, not on MetaBrain Labs servers. The company cannot access user data without explicit cryptographic consent.");
  builder.drawBullet("Portability: users can export their cognitive profile and move it to competing platforms or services. No vendor lock-in.");
  builder.drawSpacer(4);
  builder.drawSubheading("Security Architecture");
  builder.drawParagraph(
    "The BNID system is being designed with post-quantum cryptographic security to ensure that cognitive data remains protected against future advances in quantum computing. Key management is distributed to prevent single points of compromise. All cryptographic operations are designed to exceed current and anticipated regulatory requirements for sensitive personal data protection."
  );
  builder.drawSpacer(4);
  builder.drawSubheading("Regulatory Alignment");
  builder.drawParagraph(
    "The BNID system is designed to exceed the requirements of GDPR, the UK Data Protection Act 2018, and emerging neurotechnology-specific regulations. The architecture implements data minimisation, purpose limitation, and right-to-erasure capabilities at the protocol level, not as application-layer features."
  );

  // Page 7: Research Foundation
  builder.newContentPage();
  builder.drawSectionTitle("7. Research Foundation");
  builder.drawParagraph(
    "MetaBrain's platform architecture is grounded in established neuroscience principles that have been validated through decades of peer-reviewed research. The company's approach builds on these foundations while being explicit about the boundaries of current knowledge."
  );
  builder.drawSpacer(4);

  builder.drawSubheading("Established Scientific Foundations");
  builder.drawKeyValue("Neural Plasticity", "The brain physically changes in response to experience and training. Neuroplasticity is the foundational principle enabling all forms of cognitive enhancement — the brain's capacity for functional reorganisation in response to targeted stimulation and training.");
  builder.drawKeyValue("Neurofeedback Efficacy", "Real-time feedback on brain states can train improved attention and self-regulation. Decades of clinical evidence support neurofeedback for attention deficit, epilepsy, and cognitive rehabilitation applications.");
  builder.drawKeyValue("Memory Enhancement", "Targeted interventions including spaced repetition, state-dependent learning, and sleep-dependent consolidation support demonstrably improve memory encoding and recall.");
  builder.drawKeyValue("Closed-Loop Systems", "Real-time measurement and feedback systems accelerate skill acquisition and cognitive adaptation. Brain-computer interface research has demonstrated closed-loop cognitive enhancement in laboratory settings.");
  builder.drawSpacer(6);

  builder.drawSubheading("What We Do Not Claim");
  builder.drawBullet("We do not claim to read thoughts — we measure cognitive states using established sensing modalities");
  builder.drawBullet("We do not promise superhuman intelligence — we aim to enhance performance within biological possibility");
  builder.drawBullet("We do not bypass ethical review — all research meets institutional standards with full IRB approval");
  builder.drawBullet("We do not overstate results — all performance claims will be backed by validated, reproducible data");

  // Page 8: Technical Roadmap
  builder.newContentPage();
  builder.drawSectionTitle("8. Technical Roadmap");
  builder.drawParagraph(
    "The following roadmap outlines the planned technical development trajectory. Timelines are estimates and subject to revision based on research outcomes, team recruitment, and funding availability."
  );
  builder.drawSpacer(6);

  builder.drawSubheading("Phase I: Foundation (Months 1–24)");
  builder.drawBullet("Signal acquisition hardware evaluation and selection");
  builder.drawBullet("Signal processing pipeline proof of concept");
  builder.drawBullet("Cognitive state classification model development");
  builder.drawBullet("Cognitive engine architecture design and initial prototype");
  builder.drawBullet("BNID system architecture design and cryptographic specification");
  builder.drawBullet("Pre-registered research studies for initial validation");
  builder.drawSpacer(4);

  builder.drawSubheading("Phase II: Development (Months 24–48)");
  builder.drawBullet("Integrated platform prototype (all five layers operating in closed loop)");
  builder.drawBullet("Multi-user validation studies with statistically significant sample sizes");
  builder.drawBullet("BNID system implementation and security audit");
  builder.drawBullet("Institutional pilot programmes with initial partner organisations");
  builder.drawBullet("Regulatory engagement and classification pathway determination");
  builder.drawSpacer(4);

  builder.drawSubheading("Phase III: Scale (Months 48+)");
  builder.drawBullet("Platform hardening for institutional-scale deployment");
  builder.drawBullet("Multi-domain enhancement validation (memory, learning, focus, decision-making)");
  builder.drawBullet("Consumer form factor development");
  builder.drawBullet("API and developer platform for third-party applications");
  builder.drawBullet("International regulatory compliance across target markets");
}

// ─── Document Content: Financial Summary ───
function buildFinancialSummary(builder) {
  // Page 1: Phase I Overview
  builder.newContentPage();
  builder.drawSectionTitle("1. Phase I Overview");
  builder.drawParagraph(
    "MetaBrain Labs Ltd is a pre-revenue research and development company currently in Phase I — foundational research, team assembly, and prototype development. This financial summary outlines the company's capital requirements, planned allocation methodology, key milestones, financial governance structures, and risk factors."
  );
  builder.drawParagraph(
    "All financial information in this document represents planned allocation and forward-looking projections. Actual expenditure will depend on research outcomes, team recruitment timelines, and market conditions. MetaBrain Labs has no revenue and does not expect to generate revenue during Phase I. Additional funding rounds will be required to progress to Phase II and beyond."
  );
  builder.drawParagraph(
    "Phase I is designed to establish the scientific foundation, recruit the core research team, develop initial prototypes that validate the platform architecture, and formalise the governance framework. Successful completion of Phase I milestones is intended to de-risk the company for subsequent investment rounds."
  );
  builder.drawSpacer(4);
  builder.drawSubheading("Phase I Objectives");
  builder.drawBullet("Recruit a Chief Scientific Officer and founding research team");
  builder.drawBullet("Initiate pre-registered neuroscience research programmes");
  builder.drawBullet("Develop and validate signal acquisition and processing prototypes");
  builder.drawBullet("Design cognitive engine architecture and build initial prototype");
  builder.drawBullet("Formalise governance framework with independent oversight boards");
  builder.drawBullet("Achieve peer-reviewed publication of initial research results");

  // Page 2: Use of Funds
  builder.newContentPage();
  builder.drawSectionTitle("2. Use of Funds");
  builder.drawParagraph(
    "Phase I capital will be allocated across four primary areas. The percentage allocations represent the company's planned distribution. Actual allocation will be managed through milestone-linked tranching with independent oversight. The total raise amount and formal investment terms will be detailed in the formal offering document."
  );
  builder.drawSpacer(6);

  builder.drawSubheading("Research & Development — 45%");
  builder.drawParagraph(
    "The largest allocation supports the core research programme and prototype development. This includes:"
  );
  builder.drawBullet("Foundational neuroscience research: pre-registered studies investigating cognitive state classification accuracy, intervention timing optimisation, and enhancement effect measurement");
  builder.drawBullet("Prototype development: signal acquisition hardware evaluation, processing pipeline implementation, and initial cognitive engine development");
  builder.drawBullet("Laboratory and computational infrastructure: research equipment, cloud computing resources, and development tools");
  builder.drawBullet("Research partnerships: collaborative arrangements with university neuroscience departments for research validation and participant recruitment");
  builder.drawSpacer(4);

  builder.drawSubheading("Team & Talent — 30%");
  builder.drawParagraph(
    "The second-largest allocation funds the recruitment and compensation of the founding scientific team:"
  );
  builder.drawBullet("Chief Scientific Officer: senior neuroscientist with research leadership experience and clinical research expertise");
  builder.drawBullet("Computational neuroscientists (2-3 positions): signal processing, feature engineering, and cognitive modelling specialists");
  builder.drawBullet("AI researchers (1-2 positions): neuro-symbolic AI, adaptive systems, and real-time inference specialists");
  builder.drawBullet("Clinical research specialist: human-subjects protocol design, IRB/ethics applications, and safety monitoring");
  builder.drawBullet("Research support staff: laboratory technicians, data engineers, and administrative support");
  builder.drawSpacer(4);

  builder.drawSubheading("Governance & Regulatory — 10%");
  builder.drawBullet("Formalisation of four independent oversight boards (Scientific Advisory, Ethics & Neurorights, Clinical Oversight, Security & Identity)");
  builder.drawBullet("Regulatory engagement: initial consultation with MHRA, ICO, and sector-specific regulatory bodies");
  builder.drawBullet("Legal infrastructure: company governance documents, IP assignments, employment contracts, and data protection framework");
  builder.drawBullet("Ethics framework: development and publication of the MetaBrain Neurorights Framework");
  builder.drawSpacer(4);

  builder.drawSubheading("Operations & Infrastructure — 15%");
  builder.drawBullet("UK headquarters: office space and facilities for governance, regulatory affairs, and institutional partnerships");
  builder.drawBullet("Pakistan R&D centre: operational costs for the Lahore/Islamabad research and engineering facility");
  builder.drawBullet("Technology infrastructure: cloud services, development environments, collaboration tools, and security infrastructure");
  builder.drawBullet("Working capital: general corporate expenses, professional services (accounting, legal), insurance, and contingency");

  // Page 3: Milestone Schedule
  builder.newContentPage();
  builder.drawSectionTitle("3. Milestone Schedule");
  builder.drawParagraph(
    "Phase I milestones are structured to demonstrate progressive scientific validity and platform feasibility. Each milestone represents a meaningful de-risking event for investors. Milestone timelines assume funding availability and successful team recruitment."
  );
  builder.drawSpacer(6);

  builder.drawSubheading("M1: Team Assembly (Months 1–3)");
  builder.drawBullet("CSO appointment and onboarding");
  builder.drawBullet("Core research team recruitment initiated (computational neuroscientists, AI researchers)");
  builder.drawBullet("R&D infrastructure setup (laboratory, computational resources)");
  builder.drawBullet("Governance board recruitment initiated");
  builder.drawKeyValue("Success Criteria", "CSO appointed, minimum 3 core team members contracted");
  builder.drawSpacer(4);

  builder.drawSubheading("M2: Research Programme Initiation (Months 3–6)");
  builder.drawBullet("Pre-registered study protocols submitted to ethics committee");
  builder.drawBullet("IRB/ethics approvals obtained for initial human-subjects research");
  builder.drawBullet("Signal acquisition hardware evaluation completed (vendor selection)");
  builder.drawBullet("Cognitive engine architecture design document published internally");
  builder.drawKeyValue("Success Criteria", "Ethics approval obtained, research programme initiated, hardware selected");
  builder.drawSpacer(4);

  builder.drawSubheading("M3: Prototype v1 (Months 6–12)");
  builder.drawBullet("Signal acquisition and processing proof of concept operational");
  builder.drawBullet("Cognitive state classification achieving target accuracy on research data");
  builder.drawBullet("Initial data collection with research participants");
  builder.drawBullet("At least one governance board formally constituted");
  builder.drawKeyValue("Success Criteria", "Working prototype demonstrating signal-to-classification pipeline");
  builder.drawSpacer(4);

  builder.drawSubheading("M4: Cognitive Engine Alpha (Months 12–18)");
  builder.drawBullet("Initial cognitive engine prototype with personalisation capability");
  builder.drawBullet("Closed-loop demonstration: signal acquisition through to intervention delivery");
  builder.drawBullet("Preliminary enhancement effect measurements from research participants");
  builder.drawBullet("BNID architecture specification and cryptographic design completed");
  builder.drawKeyValue("Success Criteria", "Closed-loop system operational with measurable personalisation");

  // Page 4: Milestone Schedule continued + Financial Governance
  builder.newContentPage();
  builder.drawSubheading("M5: Phase I Validation (Months 18–24)");
  builder.drawBullet("Peer-reviewed publication of initial research results");
  builder.drawBullet("Statistically validated demonstration of cognitive enhancement effect");
  builder.drawBullet("All four governance boards formally constituted and operational");
  builder.drawBullet("Phase II investment memorandum preparation");
  builder.drawKeyValue("Success Criteria", "Peer-reviewed publication, validated enhancement effect, governance complete");
  builder.drawSpacer(12);

  builder.drawSectionTitle("4. Financial Governance");
  builder.drawParagraph(
    "MetaBrain Labs implements institutional-grade financial governance from inception to ensure investor capital is deployed responsibly, transparently, and in accordance with agreed milestones."
  );
  builder.drawSpacer(4);
  builder.drawSubheading("Fund Management");
  builder.drawBullet("All investment funds held in segregated accounts with dual-signatory controls");
  builder.drawBullet("Milestone-linked tranching: capital released against achievement of pre-agreed milestones");
  builder.drawBullet("Independent financial advisor oversight of fund allocation and expenditure");
  builder.drawBullet("Board authority over significant capital deployment decisions");
  builder.drawSpacer(4);
  builder.drawSubheading("Reporting");
  builder.drawBullet("Quarterly financial reporting to investors: detailed expenditure breakdowns against milestone budgets");
  builder.drawBullet("Semi-annual research progress reports: scientific progress, team updates, governance developments");
  builder.drawBullet("Annual audited financial statements prepared by an independent accounting firm");
  builder.drawBullet("Ad-hoc reporting of material events (positive or negative) within 10 business days");

  // Page 5: Related-Party Disclosure
  builder.newContentPage();
  builder.drawSectionTitle("5. Related-Party Disclosure");
  builder.drawParagraph(
    "MetaBrain Labs Ltd engages Pixelette Technologies Ltd for research and development execution services. This section provides full disclosure of the related-party relationship, the commercial terms, and the safeguards in place to protect investor interests."
  );
  builder.drawSpacer(4);

  builder.drawSubheading("Nature of Relationship");
  builder.drawParagraph(
    "Pixelette Technologies Ltd is a technology services company founded by Mr Asif Hussain Rana, who also serves as Founder & CEO of MetaBrain Labs Ltd. Both entities share common founding leadership. This constitutes a related-party relationship under applicable accounting and corporate governance standards."
  );
  builder.drawSpacer(4);

  builder.drawSubheading("Scope of Engagement");
  builder.drawParagraph(
    "Pixelette Technologies provides engineering and R&D execution services to MetaBrain Labs during the early formation stage. This engagement provides MetaBrain Labs with immediate engineering capacity while the dedicated research team is being recruited. The scope includes software engineering, infrastructure development, and technical project management."
  );
  builder.drawSpacer(4);

  builder.drawSubheading("Commercial Terms & Safeguards");
  builder.drawBullet("All transactions conducted at arm's-length terms benchmarked against market rates for equivalent services");
  builder.drawBullet("Independent board review of all related-party transactions exceeding a materiality threshold");
  builder.drawBullet("Formal IP assignment agreements: all intellectual property developed under MetaBrain Labs programmes is assigned to MetaBrain Labs Ltd");
  builder.drawBullet("Detailed related-party transaction register maintained and available to investors upon request");
  builder.drawBullet("Annual independent audit of related-party transactions and transfer pricing");
  builder.drawSpacer(4);

  builder.drawSubheading("Transition Plan");
  builder.drawParagraph(
    "As MetaBrain Labs recruits its dedicated research and engineering team during Phase I, the reliance on Pixelette Technologies for core R&D execution will progressively reduce. The target is for the majority of core research and platform development to be performed by MetaBrain Labs' own team by the end of Phase I, with Pixelette Technologies transitioning to a supplementary engineering support role."
  );

  // Page 6: Risk Factors
  builder.newContentPage();
  builder.drawSectionTitle("6. Risk Factors");
  builder.drawParagraph(
    "Investment in MetaBrain Labs carries substantial risk. The following risk factors should be carefully considered by prospective investors. This list is not exhaustive; additional risks may exist that are not currently known or that are currently deemed immaterial."
  );
  builder.drawSpacer(4);

  builder.drawSubheading("Capital & Liquidity Risk");
  builder.drawParagraph(
    "MetaBrain Labs has no revenue and no near-term revenue expectations. The company will require additional funding rounds to progress beyond Phase I. There is no guarantee that additional funding will be available on acceptable terms, or at all. Investors should be prepared for the possibility of total loss of invested capital. There is no established market for the company's shares, and investors may be unable to liquidate their investment."
  );

  builder.drawSubheading("Scientific & Technical Risk");
  builder.drawParagraph(
    "The platform architecture is based on the integration of established scientific principles, but the specific application to cognitive enhancement at scale is unproven. Research outcomes are inherently uncertain. The planned technology is in early design stages. There is no guarantee that the platform will achieve its intended performance targets or that the scientific hypotheses underlying the platform will be validated."
  );

  builder.drawSubheading("Team & Execution Risk");
  builder.drawParagraph(
    "The company currently operates with a sole founder. Success depends critically on recruiting a Chief Scientific Officer and founding research team in a competitive talent market. Failure or significant delay in recruiting key personnel could materially impact the research programme."
  );

  builder.drawSubheading("Regulatory Risk");
  builder.drawParagraph(
    "The neurotechnology sector is subject to evolving regulatory frameworks. Changes in medical device regulation, data protection law, or emerging neurotechnology-specific legislation could impact development timelines, market access, or operational costs."
  );

  builder.drawSubheading("Related-Party Risk");
  builder.drawParagraph(
    "R&D execution is currently provided by Pixelette Technologies, a related party. While safeguards are in place (arm's-length terms, IP assignment, board oversight), this relationship creates potential conflicts of interest and dependency risk."
  );

  builder.drawSubheading("Market & Commercial Risk");
  builder.drawParagraph(
    "Market size projections are based on third-party estimates and are inherently uncertain. The company's ability to capture market share will depend on successful technology development, regulatory approvals, competitive dynamics, and market acceptance."
  );
}

// ─── Main Generator ───

async function main() {
  mkdirSync("public/documents", { recursive: true });

  const documents = [
    {
      filename: "executive-summary.pdf",
      title: "Executive Summary",
      subtitle: "Company Overview, Market Opportunity, Platform Architecture, Governance Framework, and Investment Thesis",
      docType: "Investor Document",
      buildContent: buildExecutiveSummary,
    },
    {
      filename: "pitch-deck.pdf",
      title: "Investor Pitch Deck",
      subtitle: "Opportunity, Solution, Platform Architecture, Market, Team, Governance, and Investment Thesis",
      docType: "Investor Presentation",
      buildContent: buildPitchDeck,
    },
    {
      filename: "technology-overview.pdf",
      title: "Technology Overview",
      subtitle: "Platform Architecture, Five Technology Layers, Research Foundation, and Technical Roadmap",
      docType: "Technical Document",
      buildContent: buildTechnologyOverview,
    },
    {
      filename: "financial-summary.pdf",
      title: "Financial Summary",
      subtitle: "Phase I Capital Requirements, Use of Funds, Milestone Schedule, Financial Governance, and Risk Factors",
      docType: "Financial Document",
      buildContent: buildFinancialSummary,
    },
  ];

  for (const docDef of documents) {
    console.log(`Generating ${docDef.filename}...`);

    const doc = await PDFDocument.create();
    const fonts = {
      regular: await doc.embedFont(StandardFonts.Helvetica),
      bold: await doc.embedFont(StandardFonts.HelveticaBold),
      serif: await doc.embedFont(StandardFonts.TimesRoman),
      serifBold: await doc.embedFont(StandardFonts.TimesRomanBold),
    };

    // Cover page
    drawCoverPage(doc, fonts, {
      title: docDef.title,
      subtitle: docDef.subtitle,
      docType: docDef.docType,
    });

    // Content pages
    const builder = new PDFBuilder(doc, fonts, docDef.title);
    docDef.buildContent(builder);

    // FCA Disclaimer page (all docs)
    drawFCAPage(builder);

    // Page numbers on content pages only
    builder.addPageNumbers();

    const bytes = await doc.save();
    writeFileSync(`public/documents/${docDef.filename}`, bytes);
    console.log(`  -> public/documents/${docDef.filename} (${bytes.length} bytes, ${doc.getPageCount()} pages)`);
  }

  console.log("\nAll investor PDFs generated successfully.");
}

main().catch(console.error);
