# AI-Supported Quality Improvements

An interactive web visualization that assesses and displays how AI can support software quality improvements across the ISO 25010:2023 quality characteristics.


## What This Is

This project tries to provide a comprehensive, evidence-based assessment of AI's current capabilities in supporting software quality work. It evaluates how AI tools and practices can assist with quality improvements across nine quality characteristics defined in ISO 25010:2023.


## Current Status

This is an early prototype of the main idea. The data is still incomplete and was mostly generated using Claude Sonnet 4.5, with some minor adjustments by me. If this chart proves useful to others, I’ll consider updating it over time to make it more complete and accurate.


## Key Features


### Three-Phase Assessment

The chart assesses AI capabilities across three critical phases of quality work:

- **Ideation**: Generating ideas and identifying what needs to be done
- **Planning**: Determining how to approach and implement quality improvements
- **Execution**: Actually performing the quality improvement work


### Evaluation Types

For each quality characteristic and phase, the project catalogs:

- **Limitations (△)**: Fundamental constraints of AI - what AI cannot do or where it struggles
- **Practices (□)**: AI-assisted methodologies, approaches, and workflows that are currently viable
- **Tools (○)**: Specific AI-powered software products that support quality work (with clickable links)


### Ratings

Each entry includes:

- **Assessment**: Balanced evaluation explaining AI's current capability level with evidence
- **Rating**: Numeric score (0.0-1.0) anchored to evidence tiers:
  - ~0.2 = Research demo/proof-of-concept
  - ~0.5 = Early production with guardrails
  - ~0.8 = Widely adopted with measured gains
- **Color Coding**: Visual indicator for quick assessment
  - 🟢 Green (≥0.67): Mature, production-ready
  - 🟡 Yellow (0.34-0.66): Emerging, requires oversight
  - 🔴 Red (≤0.33): Research-stage, significant limitations


## Use Cases

This visualization helps:

- **Engineering teams** understand where AI can reliably assist with quality work
- **Technology leaders** make informed decisions about AI tool adoption
- **Quality engineers** identify areas requiring human expertise vs. AI automation
- **Researchers** see current state-of-practice in AI-assisted quality engineering


## Contributing

When adding or modifying content:

1. Maintain the three-phase structure (Ideation/Planning/Execution)
2. Use evidence-tier anchors for ratings
3. Categorize entries appropriately (Limitations/Practices/Tools)
4. Include assessments with concrete evidence
5. Preserve INNOQ brand consistency