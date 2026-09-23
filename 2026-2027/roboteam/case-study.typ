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

= Prerequisite

This case study is for the Robo-team interview with Ethan Bastian.

The assignment asked us to design a *general communication system* that allows all boards to communicate reliably and efficiently.

For starters, The communication for most vehicles nowadays use CAN bus protocol, which we will dive more later in this document. 

In this document, there will be part where i will say about the main points to think about, And i will also mention the way i will debug the scenario in the end of the case study

#pagebreak()

= Main point to think about

== How to identify where to send to 
CAN bus doesn't have CS (Chip Select) Pin, or address that you can call like I2C, but it will broadcast to anyone that need the ID tag of the data. 

The idea works like BLE service_id, in BLE you have device_id and service_id. But in CAN bus, it only have a bus that every pheriperals connects to and take any data with the matching ID that they need.

== Resolver tags
What i will did here to make the CAN bus know where to send to, is to use the ID tag as a sender and reciever tag.
I will split the ID tag is split to 11 Bits, 
- 3 of the first bits is for the message type / priority.
- 4 of the next bits can be used to identify the destination.
- 4 of the next bits can be used to identify who send it. 

It fit perfectly because both of the sender and reciver can be identified. 

== Problem
Well, on top of the paper, it seems like a very nice idea. But what if there is more than 16 devices to hook into 1 bus.
The implementation that i just made only allows for 16 unique device. Because the limit of 4 bits identification

Also then you miss the sweet spot where CAN is used, which is shared data bus, Because now you don't have the data tag (what data is its sending?)

== Solution
Solution : change to CAN communication protocol allows up to 29 Bit ID (for example : SAE J1939)
Now we have more rooms to work on. 

Now rather than the split above, you can split it like this 
- 3 bits for Priority bits
- 8 bits for Command (data type) 
- 8 bits for Reciver ID 
- 8 bits for Sender ID

Now what you have, is 256 pheriperals that can communicate to each other with 256 commands that can be used to share the data to everyone. 

You even have 2 extra bits, to spend on something in the future.

= How do you define the structure of the message
CAN frame already have 8 Bytes of data that you can use. And this is how i will use it. 
- Byte 0
  I will use the first byte of the data to tell the structural info, like sequence number or data length (like the frame of the data, if the data doesn't fit the frame snuggly, then we know the data is corrupted) .
- Byte 1 - 7
  The remaining bytes can be used for the data itself. It can be the sensor readings, motor commands, or alert interupts.

== How to pack diffrent data (Just examples)
Because different sensors send different types of numbers, we define strict rules for how those 56 data bits are sliced up based on the Command ID (which we defined in the 29-bit CAN ID header). So we didn't just fill the whole 56 bits of data with random values.
 
=== For example, Motor Drive Command (Command ID: 0x12)
The Central Computer needs to send speed commands to the left and right wheel motors
We can pack two 16-bit signed integers (shorts) and an 8-bit mode flag into the payload:
- Byte 0: Sequence Counter (0–255) to detect dropped packets
- Bytes 1–2: Left Motor Target Speed (16-bit signed integer)
- Bytes 3–4: Right Motor Target Speed (16-bit signed integer)
- Byte 5: Control Mode (8-bit enum: 0x00 = Idle, 0x01 = Speed Control, 0x02 = Torque Control)
- Bytes 6–7: Unused / Reserved for future growth

=== Another example, receiving IMU Sensor Readings (Command ID: 0x35)
The IMU needs to send high-precision acceleration data (X, Y, Z axes)
- Byte 0: Sequence Counter, just like before
- Bytes 1–2: X-axis acceleration (16-bit)
- Bytes 3–4: Y-axis acceleration (16-bit)
- Bytes 5–6: Z-axis acceleration (16-bit)
- Byte 7: Unused


