# COCO Annotation Analytics — Technical notes

## Data and counting definition

- Local CVAT task: `#34`, **COCO 2017 Analytics - 200 Images**.
- Imported images: **200**. COCO input JSON contained **1,544** source annotations, 80 configured labels, and 75 classes represented in the source subset. Imported DB totals must be verified independently.
- Endpoint: `GET /api/test/tasks/<task_id>/annotation-counts/`.
- Source: CVAT Django/PostgreSQL models: `Task <- Segment <- Job <- LabeledShape -> Label`.
- Count: top-level `LabeledShape` (`parent IS NULL`) with `outside=False`, only `JobType.ANNOTATION`, grouped by `label__name` and `Count(id)`.
- This deliberately excludes tags (`LabeledImage`), tracks (`LabeledTrack`/`TrackedShape`), nested skeleton elements, and ground-truth/replica jobs. The COCO subset imported polygon annotations; broader semantics are future work.
- Query is performed server-side against live CVAT DB, not JSON fixtures.
- Authorization: `IsAuthenticated` plus `TaskPermission.create_scope_view(...).check_access()` uses CVAT's existing OPA task-view policy. Unauthorized callers should see 401/403 (depending on auth setup).

## User experience

Task details contain the annotation analytics panel. It fetches the API using existing browser credentials and displays a Chart.js horizontal bar chart, loading state, 401/403/404/network errors, empty state, class filter and refresh button.

## Integration and performance

Changes to source require a CVAT backend/frontend development build (prebuilt `cvat/server:dev` and `cvat/ui:dev` won't pick them up automatically). Do not claim live UI without successful deploy.

Measured API timings (5 warm requests) — **not yet measured**. Record raw response times and median only after real execution.

## Testing checklist

- [ ] Run Django syntax/checks against running CVAT
- [ ] GET for task #34 returns 200 and real counts
- [ ] Anonymous request blocked
- [ ] Authenticated user lacking task access blocked
- [ ] Non-existent task returns 404
- [ ] UI chart and loading/empty/error states shown live
- [ ] Five real warm-request timings recorded

## Limitation / decision

Chosen to count *visible top-level shapes* first to give an unambiguous, inexpensive DB query. This is not the same as counting all CVAT annotation types. Revisit if the assessment requires tags/tracks/skeleton child elements, a different policy for annotation visibility, or track interpolation.
