# Drive scan output — one JSON file per top-level job folder (TRK-2026-9970 filetree)
Each file `<folderId>.json` is one node:
{"id": "...", "title": "...", "mimeType": "...", "size": <int bytes or 0 for folders/Google docs>,
 "modifiedTime": "...", "createdTime": "...", "isFolder": true|false, "webUrl": "...",
 "children": [ <node>, ... ], "truncated": false, "scannedAt": "<ISO UTC>"}
Depth: the job folder is depth 0; scan children to depth 3. Files always carry fileSize as int.
`_REGISTRY.tsv` gets one row per top-level folder when its file is written (status DONE|PARTIAL|FAILED).
