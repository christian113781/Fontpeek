// Clicking the toolbar icon injects the inspector (once) and toggles it on/off.
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id || !/^https?:|^file:/.test(tab.url || "")) return;

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.__fontSizeChecker && window.__fontSizeChecker.toggle()
    });
  } catch (err) {
    console.error("FontPeek could not run on this page:", err);
  }
});
