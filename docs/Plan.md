# Annotation Analytics — Assessment Plan

**Project:** CVAT Annotation Analytics
**Assessment:** xis.ai Full Stack Technical Assessment
**Branch:** dev-test01
**Starting Commit SHA:** 4a09e27ff869b7aebbfdb07b29c4a34904a0221d
**Time Budget:** 8 hours

## 1. Project Objective

Extend the existing CVAT platform with an annotation analytics feature that retrieves per-class annotation counts from its existing database and displays them through an API and frontend graph.

## 2. Implementation Plan

| Time | Activity |
|---|---|
| 0:00–0:30 | Explore repository, prepare plan and first commit |git add docs/Plan.md
| 0:30–1:15 | Understand annotation models and task relationships |
| 1:15–2:45 | Implement and test the Django API |
| 2:45–4:15 | Create the analytics page, chart and error handling |
| 4:15–5:15 | Implement authentication and authorization tests |
| 5:15–6:00 | Benchmark endpoint performance |
| 6:00–6:35 | Implement an additional filter or grouping if feasible |
| 6:35–7:10 | Final testing, documentation and evidence |
| 7:10–7:45 | Record Loom demonstration and create pull request |
| 7:45–8:00 | Final checks and submission |

## 3. Technical Approach

- Backend: Existing CVAT Django application, with a new Django app named `test`.
- Database: CVAT's existing database through Django ORM.
- Frontend: CVAT's existing React/TypeScript interface.
- Visualization: Bar chart showing annotation counts per class.
- Dataset: COCO 2017 validation images and annotations.
- Security: Reuse CVAT's existing authentication and task permissions.
- Testing: Verify API correctness, empty/error states, permission handling and performance.

## 4. Priorities

Requirements 1–4 will be completed first because they are the minimum functionality required for assessment.

Requirements 5–7 will be addressed next.

WebSocket updates and reconnection (requirements 8–9) are initially deferred due to the eight-hour constraint. These will only be attempted if earlier requirements are working and tested.

## 5. Risks

- Understanding CVAT's existing annotation relationships.
- Configuring the local Docker development environment.
- Integrating existing permission checks correctly.
- Dataset import and performance testing.

## 6. Evidence and Submission

Maintain incremental Git commits, document benchmark measurements from five actual runs, complete the Objectives and Definition of Done documents, and record a Loom demonstration of no more than five minutes.

Any unfinished work will be explicitly documented with reasons.