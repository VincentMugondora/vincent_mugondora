---
title: "AI Engineering Copilot"
description: "Exploring whether AI can help workers without traditional engineering degrees solve practical engineering problems."
problem: "Workers in fields like construction, manufacturing, and maintenance face engineering problems daily but lack access to engineering expertise. Hiring consultants is expensive and slow."
hypothesis: "A domain-specific AI assistant - trained on engineering knowledge and guided by structured reasoning - can help non-engineers solve practical problems safely and correctly."
technologies: ["Python", "LLM", "RAG", "FastAPI"]
status: "active"
publishedAt: 2024-12-01
---

## What This Experiment Explores

The AI Engineering Copilot explores a simple but important question: **Can AI make advanced technical knowledge accessible to people who need it but don't have formal engineering training?**

This isn't about replacing engineers. It's about giving workers better tools to solve problems that currently go unsolved - or get solved badly.

## The Problem

Across Zimbabwe and Africa, there's a massive gap between the engineering problems that exist and the engineering expertise available to solve them.

- A construction foreman needs to calculate load-bearing capacity for a modification
- A maintenance worker needs to diagnose why a system keeps failing
- A small manufacturer needs to optimise a process but can't afford a consultant
- A farmer needs to design a simple irrigation system

These aren't problems that require a 4-year engineering degree. They're practical problems with known solutions - the knowledge just isn't accessible to the people who need it.

## How It Works

### Domain-Specific Knowledge Base
The system is built around curated engineering knowledge - textbooks, standards, reference tables, and practical guides - structured for retrieval by AI.

### Structured Reasoning
Rather than just answering questions, the copilot guides users through a structured problem-solving process:

1. **Define the problem** - What exactly needs to be solved?
2. **Gather parameters** - What are the constraints? (materials, loads, environment)
3. **Apply principles** - What engineering knowledge applies here?
4. **Calculate/recommend** - What's the answer, with safety margins?
5. **Verify** - Does this make sense? What are the failure modes?

### Safety-First Design
Engineering mistakes can be dangerous. The system is designed to:
- Always include safety margins in recommendations
- Clearly state when a problem exceeds its capabilities
- Recommend professional consultation for safety-critical decisions
- Never present uncertain answers as definitive

## Technical Architecture

- **AI Layer:** Large language model with domain-specific prompting
- **Knowledge:** RAG system over curated engineering references
- **Backend:** Python + FastAPI
- **Interface:** Conversational (designed for WhatsApp delivery eventually)

## Current Status

This experiment is in the research phase. I'm building the knowledge base, testing different prompting strategies, and evaluating accuracy against known engineering problems.

## Key Research Questions

1. **Accuracy** - How reliably can the system produce correct engineering guidance?
2. **Safety** - Can it reliably identify when problems are beyond its scope?
3. **Accessibility** - Can non-technical workers actually use it effectively?
4. **Trust calibration** - Can users learn to appropriately trust (and doubt) the system?

## What I'm Learning

- **Structured reasoning dramatically improves accuracy** - Forcing the AI through a step-by-step engineering process produces much better results than open-ended questions.
- **The hardest part is knowing what you don't know** - Getting the AI to reliably say "this is beyond my capability" is harder than getting it to solve problems.
- **Domain-specific RAG is essential** - General AI knowledge isn't reliable enough for engineering. Curated, verified reference material makes a massive difference.

## Why This Matters

If AI can make practical engineering knowledge accessible to workers across Africa - safely and reliably - it could solve thousands of problems that currently go unaddressed simply because expertise isn't available or affordable.

This isn't about a future where AI replaces engineers. It's about a future where more people have access to engineering thinking.
