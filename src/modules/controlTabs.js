// Табы
export const controlTabs = (tabsContainerSelector, tabSelector, tabContentsSelector) => {
  const tabsContainer = document.querySelector(tabsContainerSelector),
    tabs = tabsContainer.querySelectorAll(tabSelector),
    tabContents = document.querySelectorAll(tabContentsSelector);
  const changeTabContent = currentTab => {
    tabs.forEach((tab, i) => {
      if (tab === currentTab) {
        tabs[i].classList.add('active');
        tabContents[i].classList.remove('d-none');
      } else {
        tabs[i].classList.remove('active');
        tabContents[i].classList.add('d-none');
      }
    });
  };

  tabsContainer.addEventListener('click', event => {
    const currentTab = event.target.closest(tabSelector);
    if (currentTab) {
      changeTabContent(currentTab);
    }
  });
};