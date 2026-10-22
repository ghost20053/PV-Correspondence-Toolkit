# Appendix testing handoff

Test the website on a desktop browser and a phone. Record the browser, device,
page or section, steps taken, expected result and actual result for each issue.
Include a screenshot where useful.

## Known issues before handoff

- Overview rendering was checked at desktop and narrow mobile widths. The prototype page link and published download target were verified. Full device and VR testing remain outstanding. JavaScript syntax and page links passed checks.
- Nine video files referenced by 13 archive entries are absent from this checkout.
  Restore their web copies before a complete archive test. The missing files are:
  `PHY_HeadsetAndPhysicalTable_556.mp4`, `TEST_LinkDesktopCapture_494.mp4`,
  `TEST_LinkDesktopCapture_495.mp4`, `TEST_LinkDesktopCapture_497.mp4`,
  `TEST_LinkDesktopCapture_499.mp4`, `TEST_TableAndChestTest_513.mp4`,
  `TEST_TableAndChestTest_514.mp4`, `TEST_TableAndChestTest_551.mp4` and
  `TEST_VRTemplateSceneTest_558.mp4`, all under `assets/evidence/videos/`.

## Website walkthrough

- Start at the overview. Is the purpose of the appendix clear, and can you find
  the journal, demonstration, prototype information and toolkit without help?
- On a phone, open and close the navigation. Choose a section and confirm the
  menu closes and the intended content is visible without horizontal scrolling.
- Use only the keyboard to navigate. Check the skip link, visible focus, menu,
  worksheet controls and evidence viewer. Escape should close the mobile menu
  and return focus to its button.
- Play and pause the demonstration. Check sound, fullscreen and the YouTube
  fallback. Playback should not begin automatically.
- Download the journal and three toolkit documents, and confirm they open.
- Search the evidence archive, change its filters, move between pages and open
  an image and a video. Close the viewer and confirm playback stops.
- Fill in the worksheet, move between steps, reload and confirm entries remain.
  Export it and inspect the text file. Test reset only after exporting.
- Note unclear wording, crowded layouts, small text or links that are hard to find.

## Prototype test

Download the Windows ZIP and checksum from `prototype.html#download`.
The tester must extract the complete ZIP, retain the directory structure and
launch `Windows/MetaTest.exe`. Refer to the website's physical setup guide.

Record Windows version, PC hardware, headset, connection method, XR runtime and
any configuration needed. Check launch, headset display, hand tracking,
calibration and the intended tabletop interactions. Report unsupported features,
errors and differences from the demonstration. Packaged VR behaviour and exact
runtime requirements have not yet been verified.

Test the published ZIP download and replace pending runtime information with verified instructions after the VR test.
