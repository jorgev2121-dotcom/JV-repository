# Two-lane comparison protocol (Cloud vs Desktop)

**TRK number: NOT YET ISSUED.** Desktop issues the next unused number from the registry. · written 2026-11-21 ET by the cloud window · #TwoLane #Cloud #Desktop #RAMBO

## Section A: Why

Cloud sees Drive, Gmail, the repo and the connectors. Desktop (RAMBO) sees local files, an open network and the browser. They reach different answers on the same job. **That difference is the value, so it is kept, not blended.**

## Section B: The rules

1. **Same job, same small sample** (for example 25 cases). Judgment work only. Not mechanical copying, which only doubles cost.
2. **Separate files.** Each lane writes `RESULT_CLOUD_<job>_<date>.md` or `RESULT_DESKTOP_<job>_<date>.md`. The two lanes never share a filename. (Two sessions collided on identical names in the PROOF-5 run, 2026-08-17.)
3. **Blind first.** Neither lane reads the other's result before finishing its own.
4. **Cloud writes the comparison** in `COMPARE_<job>_<date>.md`: where the lanes agree, where they differ, and what only one lane found. Every line carries a denominator, for example "21 of 25 agree".
5. **Disagreements go to Jorge as one yes or no.** Never a technical menu.
6. **Hand-off note.** `_CHECKPOINT_CLOUD.md` in Drive VTES-Outbox stays the shared status file. Cloud overwrites it at every milestone.

## Section C: What changes when cloud is connected to the desktop

1. Cloud keeps its own workspace, Drive, Gmail and connectors, and gains the one allowed desktop folder. This is from the tool descriptions and is **unverified until the first connection**.
2. The cloud workspace is temporary. Anything that matters goes to Drive or the repo.
3. If the PC sleeps, only the desktop half pauses.

Does this split match how you want the two lanes to work?
