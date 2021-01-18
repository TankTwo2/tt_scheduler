export function loginInfo() {
  try {
    chrome.identity.getProfileUserInfo(async (res) => {
      return res.email;
    });
  } catch (e) {
    return "Local";
  }
}

export function saveChromeStorage(saveData: { [index: string]: any }) {
  if (loginInfo() === "Local") return null;
  try {
    chrome.storage.sync.set(saveData, function () {});
  } catch (e) {
    console.error(e);
    return null;
  }
}
export function loadChromeStorage(loadData: string) {
  if (loginInfo() === "Local") return null;
  try {
    chrome.storage.sync.get([loadData], function (items) {
      if (Object.values(items)[0])
        return Object.values(items)[0] ? Object.values(items)[0] : null;
    });
  } catch (e) {
    // console.error(e);
    return null;
  }
}
