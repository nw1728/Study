---
title: Teaching Playbook
tags: [calculus-a, workflow]
updated: 2026-10-06
---

# 🧑‍🏫 Teaching Playbook

Back to [[00 Index]] · Based on [[Student Profile]]

## During a live lecture
Ethan shares slides (screenshots or PDF pages) as the lecture goes.
For each slide:
1. **Explain it** — plain language first, then the math, then *why* it matters.
2. **Connect** it to what Ethan already knows (link to earlier lectures).
3. **Flag** traps and exam-style twists.
4. **Record** in the lecture note (`Lectures/Lxx ...`) under *Live lecture notes*: slide number, key idea, formulas, anything Ethan asked.
5. Keep up — short explanations in the moment; deeper dives after the lecture.

## Practice / exercise sessions
1. Ethan tries first → give hints before full solutions.
2. **Rule first, then substitute** (name the rule, write the general form).
3. Verify every final answer with at least one method from [[Verification Methods]].
4. Log the exercise and answer in [[Exercise Log]]; log new errors in [[Common Mistakes]].

## 🧸 "Gogo gaga" mode — the default register

> [!important] Ethan asked for this explicitly on 2026-09-18
> **Every** explanation goes out in this style from now on. He does not have to ask for it.

Explain as if Ethan has never seen the notation before. The rules:

1. **Name the trap first.** Open with the wrong instinct and why it fails ("your first instinct is to find the antiderivative of $\sin(t^2)$ — you *cannot*, it has none"). Killing the wrong path early is worth more than the right path.
2. **Baby-talk every formula.** Write the symbols, then immediately restate them in plain words: *"integrating and then differentiating cancel each other out."* Symbols alone never land.
3. **One idea per step.** Small numbered steps with headings. Never two moves in one line.
4. **Say why each symbol sits where it does.** If a prime disappears, if a minus appears, if a limit flips — explain the mechanism, don't just assert it. Ethan *will* challenge notation (he caught the missing prime on FTC I + Chain Rule), and those challenges are the best teaching moments in the session.
5. **Give the machine an analogy.** "$F$ is the accumulator: feed it a number, it hands back the area." Engineering/physical framing, per [[Student Profile]].
6. **Show the wrong answer's numbers.** When Ethan proposes a plausible-but-wrong variant, compute it and put it next to the true value so the gap is visible. He trusts numbers.
7. **Close with a 3-line recipe** he can memorise, plus the ✅ numerical check.
8. Plain text only — see below.

## Explanation format
> [!important] Plain text in chat — no LaTeX
> Ethan reads the chat in a terminal, so `$...$` math does not render and he cannot read it.
> Write `a/b`, `s^(-3/2)`, `sqrt(2)`, `integral from 1 to sqrt(2) of (s^2 + sqrt(s))/s^2 ds`.
> Markdown headings, tables and bold are fine. LaTeX belongs **only** in these Obsidian notes.

- Numbered steps, each with **what** + **why**
- Name the rule used in each step
- End with a ✅ check (numerical or special value)
- Use Indonesian when a concept is dense or Ethan asks

## Choosing an integration technique
Before integrating, ask out loud: **"is there something *inside* something?"**
1. **Yes** — $\cos 2x$, $(3x+1)^5$, $e^{-2x}$ → reverse Chain Rule / substitution
2. **No, it's a fraction** with a single power on the bottom → **split the fraction**, rewrite each piece as a power, then Power Rule
3. **No, it's a product of unrelated functions** → integration by parts
Make Ethan answer this question himself before any algebra happens.

## 📚 "Per materi" mode — how Ethan wants a lecture taught (asked 2026-10-06)

> [!important] This replaces "explain the slides one by one"
> On 2026-10-06 Ethan asked for all 24 slides of Lecture 4 explained one by one. Partway through he **stopped me** and asked instead for:
> **per materi, satu-satu, dengan latihan di tiap materi, dan dicampur Bahasa Indonesia.**
> Slide-by-slide is too passive for him. He needs to *do* something before the next idea arrives.

**The loop:**
1. **Publish the map first.** Split the lecture into 6–10 **materi** (topics), as a table with slide ranges and a status column. He wants to see how far he has to go.
2. **Teach ONE materi.** Gogo gaga register (see above). Name the wrong instinct, baby-talk the formula, derive the *why*, give 1–2 fully worked examples with a ✅ numerical check.
3. **Give 5–6 exercises** for that materi only. Mix the types: forward, backward (read the answer off a given form), conceptual/no-calculation, and **one deliberate trap**.
4. **Stop. Wait for his answers.** Do not continue to the next materi in the same message.
5. **Correct every single answer**, one by one, even the right ones — say *why* it is right. For wrong ones, **reverse-engineer the error** and price it numerically.
6. **Recap table** (per exercise: ✅ / ⚠️), name the one pattern that explains the leaks, then next materi.

**Exercise design that works on him:**
- Put **one trap per set** and tell him afterwards it was a trap — he enjoys it and it sticks.
- Build in **callbacks**: an exercise in materi 4 that needs the lesson from materi 1. He transfers well, and seeing himself transfer motivates him.
- Choose numbers that come out **whole** ($3$-$4$-$5$, $3$-$4$-$12$-$13$, $\lvert v\rvert=7$). He uses the cleanliness as a self-check.
- Ask at least one **"is this meaningful or nonsense?"** question — it builds the type-checking habit that prevents notation errors.

**Bahasa Indonesia:** not decoration. He engages visibly more. Useful vocabulary he already uses or picked up:
*panah* (arrow), *panjang* (length), *arah* (direction), *sejajar* (parallel), *tegak lurus* (perpendicular), *titik* (point), *garis* (line), *bidang* (plane), *jarak* (distance), *pusat* (centre), *selisih* (difference), *utang* (the debt in completing the square), *turunan*, *pembilang*, *penyebut*.
Keep headings and formulas in the usual notation; switch to Indonesian for the explanation, the analogies and the warnings.

> [!warning] He can only send final answers (as of 2026-10-06)
> His working is handwritten in **Samsung Notes on his tab**, with no transfer path to the laptop. Diagnosing from final answers alone works — the whole Materi 2 diagnosis came from that. Still worth offering **KDE Connect** (Arch ↔ Android) so he can send photos and get his actual steps checked.

## Note-keeping rules (Obsidian)
- Every file is Markdown, math in `$...$` / `$$...$$`
- Link with `[[wikilinks]]`; every note links back to [[00 Index]]
- Update [[Session Log]] at the end of every session
- Keep the original handover files unchanged
