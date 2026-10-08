
#let font_size = 10pt

#set text(
  font: "Zed Sans Extended",
  size: font_size,
)
#set par(justify: true)
#set heading(numbering: "1.")
#set page(numbering: "1")

#show link: set text(blue)
#show link: underline

#set page(
  paper: "us-letter",
  header: align(right)[
    Ethan Bastian \
    Case study (Robo-team) \
    #text(0.8em)[
      #link("mailto:bastian.ethan.id@gmail.com")[bastian.ethan.id\@gmail.com]
    ]
  ],
)

#align(
  horizon,
  [
    #align(
      center,
      text(4 * font_size)[
        *Case Study*
      ],
    )
    #align(center)[
      Rover communication system

    ]
  ],
)

#show raw.where(block: false): it => box(
  fill: rgb("#f2f3f5"),
  stroke: 0.5pt + luma(200),
  radius: 3pt,
  inset: (x: 3pt, y: 1pt),
  baseline: 10%,
  it,
)

#show raw.where(block: true): it => block(
  fill: rgb("#f2f3f5"),
  stroke: 0.5pt + luma(200),
  radius: 4pt,
  inset: (top: 18pt, rest: 10pt), // Extra top padding to make room for the language badge
  width: 100%,
  clip: false,
  stack(
    dir: ttb,
    spacing: 0pt,
    place(
      top + right,
      dx: -5pt,
      dy: -13pt,
      box(
        fill: luma(220),
        inset: (x: 5pt, y: 2pt),
        radius: 3pt,
        stroke: 0.5pt + luma(180),
        text(size: 7.5pt, weight: "bold", fill: luma(80), upper(if it.has("lang") { it.lang } else { "code" })),
      ),
    ),
    text(size: 9.5pt, font: "JetBrainsMono NF", it),
  ),
)

#pagebreak()

#outline()

#pagebreak()

