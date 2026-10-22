# PV-Correspondence-Toolkit
One online research appendix accompanying Honours research into physical–virtual
correspondence in VR, containing the reflective journal, evidence archive,
demonstration and developer toolkit.

## Website pages

- `index.html`: self-contained project overview with links to every detailed area.
- `research.html`: research resources, document downloads and final demonstration.
- `evidence.html`: reflective journal and searchable evidence archive.
- `prototype.html`: Windows download and physical setup / replication guide.
- `toolkit.html`: design considerations, interactive worksheet and completed example.

The five-page structure and main navigation are retained. `research.html#findings`
connects Chapter 5 findings to the six questions in Table 1 of the supplied exegesis.
`evidence.html#evidence-guide` provides journal-based reading routes through the
three Action Research cycles, without reclassifying the complete archive.
Evidence links accept `category`, `type` and `q` query parameters. A compact
"On this page" guide uses the wide-screen margin and is hidden on smaller screens.

The downloadable worksheet, completed example, replication guide and journal match
the supplied current Word files byte-for-byte. The completed example was already
identical; the other three files were replaced at their existing download paths.
Their internal content and historical labels were not edited. The supplied
exegesis was consulted as a reference only and is not published as a download.
Website method descriptions use "practice-led"; the considerations remain
"practice-derived", matching their role in the exegesis.

Publish all five HTML pages with the shared CSS, JavaScript and assets.
Old index section bookmarks redirect to their new pages when JavaScript is enabled.
The worksheet retains its existing browser-storage key.

## Playable prototype download

The original Windows build is published as release `honours-prototype-v1.0.0`:
https://github.com/ghost20053/PV-Correspondence-Toolkit/releases/tag/honours-prototype-v1.0.0

`prototype.html#download` links directly to its ZIP and checksum. The archive is
553,683,016 bytes (528 MiB). GitHub's uploaded asset digest matches the local ZIP:
`66da2706a6406699d95b704234e6861a31ec0043dda80207c99952258165c14d`.

Keep the binary outside Git history and GitHub Pages assets. The version-specific
release URL preserves the appendix's reference to this artefact.
The ZIP retains the Windows directory, excluding generated logs and crash reports.
Original build files remain unchanged. Packaged VR behaviour and runtime requirements
still need external testing; file verification does not validate VR interaction.

## Demonstration video

The website plays `assets/videos/final-demonstration.mp4` using the browser's
video controls. The unlisted YouTube recording remains linked as a backup.
Playback starts only when the visitor chooses to play the video.

The web copy preserves the complete recording and audio at a reduced resolution
of 1260 × 540, using H.264 video and AAC audio. It is compressed to fit below
GitHub's 100 MiB regular-file limit. Upload this MP4 with the website files;
do not track this web copy with Git LFS, which GitHub Pages does not support.
When uploading through GitHub's browser interface, the separate 25 MiB upload
limit applies: use GitHub Desktop or Git to upload this video.

The full-quality source recording remains outside this repository. Temporary
conversion tools and working files are excluded through `/work/` in `.gitignore`.

## Reflective journal and evidence archive

`evidence.html` provides the reflective journal download and a searchable archive
of 468 screenshots and 85 video entries. Research appears before the design
considerations and toolkit on the home page and in both pages' navigation.

The journal and screenshots are unmodified copies of the supplied files. The
journal retains its original historical links, including a OneDrive link; use
the website archive to access the preserved evidence copies.

The video entries represent 70 distinct recordings. Fifteen exact duplicates
retain their original filename entries but share a web file. The final
demonstration is reused from `assets/videos/`. The other web copies are under
`assets/evidence/videos/`, encoded as H.264/AAC with a maximum width of 960 pixels.
These compressed previews preserve full duration but reduce detail; retain the
original archive separately for full-quality evidence.

`js/evidence-data.js` maps each evidence filename to its web copy. Archive search
and pagination run entirely in the browser. Without JavaScript, a full file list
is provided. Video previews load only when opened, and closing them stops playback.

Upload all website assets with GitHub Desktop or Git. Do not add the web video
copies to Git LFS when publishing through GitHub Pages. The ignored `work/`
directory contains temporary tools and must not be published.

The website uses one research-appendix structure. The original downloadable
documents retain their historical Appendix A/C references and filenames; they
have not been rewritten or renumbered. The exegesis itself is not part of this
repository and has not been edited.
