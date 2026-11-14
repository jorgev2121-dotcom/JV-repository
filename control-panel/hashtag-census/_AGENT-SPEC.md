# Hashtag census — per-job agent spec (READ-ONLY)

Tools: load with ToolSearch "select:mcp__Google_Drive__search_files,mcp__Google_Drive__read_file_content".
NEVER create, edit, rename, move or delete anything in Drive. Write only local files under
/home/user/JV-repository/control-panel/hashtag-census/ using the Write tool.

For EACH job folder you are given (Drive folder id + title), do the following.

1. Walk the folder and its subfolders, two levels deep at most.
   - Query: parentId = '<id>', with excludeContentSnippets true and pageSize 100.
   - Drive returns about 5 results per page, so follow nextPageToken until there is none.
   - Cap: about 40 calls per job. If you hit the cap, set "partial": true.
2. Count:
   - pdfs: files ending .pdf (not counting .pdf.SEARCH.txt or .pdf.TAGS.txt)
   - search_sidecars: files ending .SEARCH.txt
   - tags_sidecars: files ending .TAGS.txt
   - has_HASHTAGS_txt: a file named exactly _HASHTAGS.txt directly in the job folder
   - also note any _TAGS.txt, CAPSULE.md, _CONTACTS-EXTRACTED.txt, _PLACEHOLDERS.md or _PORTAL_*.html
3. If _HASHTAGS.txt exists, read it. Record:
   - hashtags_count: number of #tags
   - has_people_tags: true if the tags include at least one person's name
   - has_trk_tag: true if the tags include the job number
4. Read up to 3 of the job's .TAGS.txt sidecars and record how many have 5 or more tags.
5. Build a PEOPLE and COMPANIES list for the job: engineers, drafters, contractors, owners, clients, city staff, inspectors, notaries, attorneys.
   - Sources: _CONTACTS-EXTRACTED.txt, CAPSULE.md, _PLACEHOLDERS.md, _HASHTAGS.txt, and file names. Read at most 4 small text files.
   - For each entry: {"name", "role", "email" or null, "evidence": the file it came from}.
   - Also record likely misspellings of each name, from what you actually see in file names, or obvious phonetic variants.
6. List 10–25 KEYWORDS Jorge would remember: the address in several forms, the folio, permit and case numbers, nicknames, building names, trades.

Write ONE file per job: /home/user/JV-repository/control-panel/hashtag-census/<folder_id>.json, containing:
{"id","title","partial","pdfs","search_sidecars","tags_sidecars","tags5_sampled","tags5_of_sampled","has_HASHTAGS_txt","hashtags_count","has_people_tags","has_trk_tag","other_files":[...],"people":[...],"companies":[...],"keywords":[...],"notes"}

Write each job's file the moment that job is finished, before you start the next job.
Reply with one line per job: id · pdfs · search_sidecars · tags_sidecars · has_HASHTAGS_txt · people count.
