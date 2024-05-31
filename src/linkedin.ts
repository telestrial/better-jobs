import {
  OUTER_CONTAINER_SELECTOR,
  INNER_CONTAINER_SELECTOR,
  JOB_SELECTOR,
  LINK_SELECTOR,
} from './constants';

import findLinkedInJobID from './helpers/findLinkedInJobID';

// Select job postings (runs on /search and /collections)
const jobsOuterContainer = document.querySelector(OUTER_CONTAINER_SELECTOR);

// Initialize the object we'll use to keep track of the company names
const companies: { [key: string]: { company: string; element: Element } } = {};

if (jobsOuterContainer) {
  // Use the mutation observer to catch added jobs:

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback: MutationCallback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        if (!mutation.target) continue;

        const currentElement = mutation.target as Element;

        if (!currentElement.classList.contains(INNER_CONTAINER_SELECTOR))
          continue;

        const company = currentElement.querySelector(
          JOB_SELECTOR
        ) as HTMLElement;

        const jobLink = currentElement.querySelector(LINK_SELECTOR);

        if (!company || !jobLink) continue;

        const linkString = jobLink.getAttribute('href');

        if (!linkString) continue;

        const jobID = findLinkedInJobID(linkString);

        if (company.innerText !== null && !companies[jobID]) {
          companies[jobID] = {
            company: company.innerText,
            element: currentElement,
          };
        }
        console.log(companies);
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(jobsOuterContainer, config);
}
