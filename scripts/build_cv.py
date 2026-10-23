"""Build the public CV. Content is based on the homepage, not the example CV.

Requires ReportLab: python3 -m pip install reportlab
Run from any directory: python3 scripts/build_cv.py
The committed PDF is served directly; website deployment needs no Python build.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output/pdf/kuangyi-chen-cv.pdf"
UPDATED = "23 October 2026"
WIDTH = A4[0] - 88


def register_fonts():
    """Embed Times New Roman when installed; otherwise use PDF's built-in Times."""
    font_dir = Path("/usr/share/fonts/truetype/msttcorefonts")
    files = {"CV": "times.ttf", "CV-Bold": "timesbd.ttf", "CV-Italic": "timesi.ttf"}
    if all((font_dir / filename).exists() for filename in files.values()):
        for name, filename in files.items():
            pdfmetrics.registerFont(TTFont(name, str(font_dir / filename)))
        pdfmetrics.registerFontFamily("CV", normal="CV", bold="CV-Bold", italic="CV-Italic")
        return "CV", "CV-Bold", "CV-Italic"
    return "Times-Roman", "Times-Bold", "Times-Italic"


FONT, BOLD, ITALIC = register_fonts()
BODY = ParagraphStyle("Body", fontName=FONT, fontSize=10.5, leading=13.2)
SMALL = ParagraphStyle("Small", parent=BODY, fontSize=9.5, leading=11.8)
RIGHT = ParagraphStyle("Right", parent=BODY, alignment=TA_RIGHT)
SECTION = ParagraphStyle("Section", parent=BODY, fontSize=12, leading=14, fontName=BOLD)
NAME = ParagraphStyle("Name", parent=BODY, alignment=TA_CENTER, fontName=BOLD, fontSize=25, leading=28)
CONTACT = ParagraphStyle("Contact", parent=SMALL, alignment=TA_CENTER, leading=13)


def para(text, style=BODY):
    return Paragraph(text, style)


def row(left, right, *, style=BODY, right_width=96):
    table = Table(
        [[para(left, style), para(right, RIGHT)]],
        colWidths=[WIDTH - right_width, right_width],
        hAlign="LEFT",
    )
    table.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return table


def section(title, content):
    heading = KeepTogether([
        para(title, SECTION),
        Spacer(1, 3),
        HRFlowable(width="100%", thickness=0.6, color=colors.black),
        Spacer(1, 5),
    ])
    heading.keepWithNext = True
    return [
        Spacer(1, 10),
        heading,
        *content,
    ]


def education(school, place, degree, period, detail):
    return KeepTogether([
        row(f"<b>{school}</b>", place, right_width=135),
        row(f"<i>{degree}</i>", period, right_width=100),
        para(detail, SMALL),
        Spacer(1, 5),
    ])


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont(FONT, 8)
    canvas.setFillColor(colors.HexColor("#666666"))
    canvas.drawString(44, 24, f"Updated {UPDATED}")
    canvas.drawRightString(A4[0] - 44, 24, f"Kuangyi Chen | {doc.page}")
    canvas.restoreState()


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    story = [
        para("Kuangyi Chen", NAME),
        Spacer(1, 4),
        para('M.Eng. Student in Control Engineering | RAS Lab, Hangzhou Dianzi University', CONTACT),
        para('<link href="mailto:kuangyi_chen@hdu.edu.cn">kuangyi_chen@hdu.edu.cn</link> | '
             '<link href="https://ckyfi9zero.github.io/">ckyfi9zero.github.io</link> | '
             '<link href="https://github.com/ckyFi9zero">github.com/ckyFi9zero</link>', CONTACT),
        Spacer(1, 3),
    ]

    story += section("EDUCATION", [
        education("Hangzhou Dianzi University", "Hangzhou, China", "M.Eng. in Control Engineering", "2025 - Present",
                  "RAS Lab. Advisor: Botao Zhang."),
        education("ITMO University", "Saint Petersburg, Russia", "B.Eng. in Automation", "2021 - 2025",
                  "Sino-Russian Joint Dual-Degree Program. Advisor: Sergei V. Shavetov."),
        education("Hangzhou Dianzi University", "Hangzhou, China", "B.Eng. in Automation", "2021 - 2025",
                  "Outstanding Graduate (2025). Advisors: Botao Zhang and Jian Wang."),
    ])

    story += section("RESEARCH INTERESTS", [
        para("Robust robot perception and autonomous systems, with a focus on LiDAR and 3D point-cloud "
             "denoising in rain, fog, snow, and dust using deep learning or geometric constraints."),
    ])

    story += section("PUBLICATIONS", [
        para("<b>K. Chen</b>, B. Zhang, Z. Zhang, X. Liu, and Q. Lu. "
             "<b>SCDF: Seed-and-Contextualize Dust Filter for Real-Time LiDAR Perception.</b> "
             "<i>IEEE Robotics and Automation Letters</i>, vol. 11, no. 11, pp. 12783-12790, Nov. 2026."),
        para('<link href="https://doi.org/10.1109/LRA.2026.3734896">DOI: 10.1109/LRA.2026.3734896</link>', SMALL),
    ])

    awards = [
        ("<b>National Scholarship for Graduate Students</b>", "2026"),
        ("National Bronze Award, China Graduate Electronic Design Contest", "2026"),
        ("National First Prize, China Graduate Electronic Design Contest", "2025"),
        ("National Bronze Award, China Graduate Robot Innovation Design Competition", "2025"),
        ("National Bronze Award, China Graduate AI Innovation Competition", "2025"),
        ("Zhejiang Provincial Government Scholarship", "2023"),
        ('National Silver Award, China International "Internet+" Competition', "2022"),
    ]
    story += section("SELECTED HONORS &amp; AWARDS", [row(title, year, right_width=40) for title, year in awards])

    patents = [
        ("Object search for a mobile manipulator under occlusion based on association probability",
         "CN116664537B | Granted | Inventor rank: 3/5"),
        ("Recognition and segmentation of infrared insulators and steel caps in complex environments",
         "CN114842367B | Granted | Inventor rank: 7/7"),
        ("Control method for a tree-trunk spraying robot in forest environments",
         "CN117109555A | Published | Inventor rank: 4/11"),
    ]
    ip = [para("<b>Patents</b>")]
    for title, detail in patents:
        ip.append(KeepTogether([para(title), para(detail, SMALL), Spacer(1, 3)]))
    ip += [
        Spacer(1, 2),
        para("<b>Software Copyrights</b>"),
        para("Dehazing-based automatic lane recognition system", BODY),
        para("2023SR0061095 | Registered | Contributor rank: 1/7", SMALL),
        Spacer(1, 3),
        para("Foggy-weather vehicle detection software", BODY),
        para("2023SR0898877 | Registered | Contributor rank: 2/4", SMALL),
    ]
    story += section("INTELLECTUAL PROPERTY", ip)

    doc = SimpleDocTemplate(
        str(OUTPUT), pagesize=A4, leftMargin=44, rightMargin=44,
        topMargin=32, bottomMargin=38,
        title="Kuangyi Chen - Curriculum Vitae", author="Kuangyi Chen",
        subject="Education, research interests, publications, honors, and intellectual property",
    )
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUTPUT)


if __name__ == "__main__":
    build()
