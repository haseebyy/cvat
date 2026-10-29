# Annotation Analytics — Measurable Objectives

**Project:** CVAT Annotation Analytics
**Assessment:** xis.ai Full Stack Technical Assessment

## MO-1: API Response Time

**What is measured:**
The response time of the authenticated annotation-count endpoint for a CVAT task containing imported COCO 2017 validation annotations.

**Target:**
Median response time of five warm requests should be at or below 500 milliseconds.

**How:**
Send five authenticated requests to the endpoint after one warm-up request. Measure total request duration, including local HTTP overhead. Record the raw timings and calculate the median and spread.

**Conditions:**
- Local Docker-based CVAT environment.
- Same task and dataset for every request.
- No concurrent dataset imports or other heavy operations during testing.
- Same authenticated user.
- Record the number of imported images and annotations.
- Record the exact endpoint, measurement commands and testing procedure.

**Not included:**
Initial Docker startup, dataset import and the first warm-up request.

## Machine Information

- **CPU:** AMD Ryzen 5 5600 6-Core Processor
- **RAM:** 16 GB
- **Operating System:** Microsoft Windows 11 Pro
- **OS Version:** 10.0.26200
- **Starting CVAT Commit SHA:** `4a09e27ff869b7aebbfdb07b29c4a34904a0221d`

## Performance Target Justification

A median response-time target of 500 milliseconds or less was selected as an initial local API latency budget to keep annotation analytics responsive.

The objective will be assessed through five actual measurements using the same authenticated endpoint and dataset.

Meeting this target is not assumed. Both successful and unsuccessful results will be reported.

## Results

Measurements will be recorded after implementation.

| Run | Response time (ms) |
|---|---|
| 1 | Pending |
| 2 | Pending |
| 3 | Pending |
| 4 | Pending |
| 5 | Pending |

**Median:** Pending
**Spread (maximum - minimum):** Pending
**Target achieved:** Not yet measured

## Evidence

Raw command output, the exact testing commands, the endpoint URL, task size, and the testing procedure will be added after running the benchmark.

No performance results will be reported without actual measurements.