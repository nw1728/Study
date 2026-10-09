

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
    ARS Academic Proffesionalism\
    #text(0.8em)[
      #link("mailto:bastian.ethan.id@gmail.com")[e.ethanbastian\@student.utwente.nl]
    ]
  ],
)

#align(
  horizon,
  [
    #align(
      center,
      text(4 * font_size)[
        *Academic \ Proffesionalism*
      ],
    )
    #align(center)[
      ARS Draft Period 

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

= AI usage and risk assessment

I used generative AI for several tasks in my parts of the literature review (Introduction, Sections 2.1 and 2.3, Appendix A) and of the research proposal. Before using it, I assessed a representative task with the AI Risk Assessment Protocol (AI-RAP): _using AI to summarise how five selected papers describe the Meshtastic/MeshCore routing mechanism and its security weaknesses, as input for my literature review._ @fig:airap shows my completed worksheet.

#figure(
  image("AIRAPANS.png", width: 100%),
  caption: [My completed AI-RAP worksheet for summarising papers with AI.],
) <fig:airap>

The scores I gave per key risk factor (1 = low, 3 = high) are:
- *AI operational risk:* frequency and accessibility of patterns 2, conflicting information in training data 1, outdated, incomplete or false data 2, bias in AI algorithms 2.
- *My competence and behaviour:* AI prompting skills 2, domain knowledge (evaluating AI output) 2, fact-checking skills 2, cognition and behaviour 1.
- *Impact on learning process:* alignment with learning objectives 3, ethical and academic integrity 1, critical thinking 2, dependency risk 2.

This gives $L_"AI" = 1.8$, $L_"S" = 1.8$ and $I = 2.0$, so $"RAN" = (1.8 + 1.8) times 2.0 = 7.0$. That is a *moderate* risk, for which the protocol prescribes verification with the SIFT+ method. The highest single score is for alignment with the learning objectives: summarising and evaluating literature is exactly what this course is meant to teach me. Recent and specialised topics such as Meshtastic and MeshCore also make outdated or incomplete AI information likely.

*Verification.* Following SIFT+, I applied these checks to all my AI use:
- *Investigate the source:* every source came from my own Scopus searches or from official documentation and datasheets; no reference was taken from AI output alone.
- *Trace claims to the original context:* I checked summarised claims against the original PDFs and documentation pages.
- *Human checkpoint:* I reviewed every AI-suggested screening decision for the 509 records, and I ran and refined the search strings in Scopus myself. S3 returned many false positives ("LoRA" as Low-Rank Adaptation), so I refined it into S3b. The AI wrote the original query, but I was the one who spotted that the results were wrong. This showed me that I must always check what a query returns. Because so much research exists on AI, it was easy to see that these results were off-topic.

These checks caught real errors, such as a study attributed to the wrong authors and a truncated DOI.

*Reflection.* Besides summarising, I also used AI for first-pass screening and for drafting text. These tasks are even closer to the learning aims of reviewing literature and writing scientifically. I would therefore score them higher on impact, which would likely put them at a critical RAN. The main risk I noticed was not invented sources, but plausible-sounding text that slightly misrepresented a paper or named the wrong author, and I only found these errors by going back to the originals. I also noticed that I learned less from the writing itself than I would have otherwise. For the paper in Q2 I will write the text myself and use AI only for feedback on my own drafts and for checking code. This lowers the impact score and keeps the learning with me.

= Meeting & supervision

Before contacting our supervisor, Geert Heijenk, my teammate and I first formulated a research question and sub-questions, so that the first meeting could focus on content. Geert replied by email with feedback on what our validation plan should look like, which we discussed further in the meeting.

His main feedback in the meeting, and what I did with it:

- *Our research question and sub-questions were too broad.* He expected that the question would become more specific after several iterations of reading and drafting. This turned out to be right: after reading the literature I realised the question was too broad, and we narrowed it from secure routing in general to the cost of hop-by-hop authenticated encryption on LoRa relay nodes across microcontroller classes. This narrower question fits my embedded-systems background, because it can be answered with measurements on real hardware. I will ask for feedback on it in the next meeting.

- *Research is iterative, not linear.* We had divided the work into fixed steps that we planned to complete one after another. He made clear that the scope, the literature review and the proposal develop together through many iterations.

- *Define a scope first, then iterate.* I was unsure at which point the scoping and the PRISMA process should start. He explained that the scope should be defined before the literature review and proposal and then refined in each iteration. I applied this by fixing the scope (peer-to-peer LoRa mesh networks and comparable low-power multi-hop networks) and the inclusion and exclusion criteria before screening, and by adding two criteria (EC6 and EC7) during screening when it became necessary.

- *Expect to read a few dozen papers.* Because our topic is specialised, he told us that we would need at least a few dozen papers before the picture becomes consistent. My Sections 2.1 and 2.3 are based on 21 studies and 7 grey-literature sources, selected from 509 screened records.

= Teamwork

My teammate and I divided the work by research question. We have four sub-questions in total: two on cybersecurity and two on embedded systems. I worked on the two embedded-systems questions. We planned to review each other's sections, but because of time constraints from other work we have not done this yet. I will schedule it before the next deadline.

= Reflection

I wrote this assignment in a short time, next to my other work, Capita Selecta and a maths course that I find challenging. My time management was not good enough, and this made me depend more on AI than I wanted. Spotting the wrong S3 results and the wrong author showed me that AI output needs checking against the original source, and that this checking takes time I should plan for. In the next quartile I will start earlier, write the text myself and use AI only for feedback on my own drafts. I will also have my teammate review my sections, and I will keep notes of meetings and decisions as I go instead of collecting them at the end.

= Evidence

The emails below show how I contacted my supervisor and how the supervision was arranged, in chronological order. We found the topic through the ARS assignment CS9. Because the coordinator had named Suzan Bayhan as our contact, I informed her too, and she confirmed that Prof. Heijenk could supervise us.

#let evidence(file, cap) = figure(
  image(file, width: 85%),
  caption: cap,
)

#evidence("firstemailtoprof.png")[30 Sep: my first email to Prof. Heijenk, with our draft research question, sub-questions and five questions about the topic.]

#evidence("firstprofans.png")[30 Sep: his reply, asking about his role as supervisor and how we would validate our solution.]

#evidence("replytoprof.png")[1 Oct: my reply, with a first idea for validation (formal verification).]


#evidence("profreqmeeting.png")[His proposal for the meeting in his office on Monday at 14:00.]

#evidence("meetingreqaccepted.png")[Meeting request from Prof. Heijenk, which I accepted.]

#evidence("firstemailtobbayhan.png")[4 Oct: my email to Suzan Bayhan, the contact named by the coordinator, explaining our situation and apologising for the late message.]

#evidence("answerfrombayhan.png")[5 Oct: her reply, confirming that no involvement is needed from her side.]
