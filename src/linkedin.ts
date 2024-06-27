import {
  LI_OUTER_CONTAINER_SELECTOR,
  LI_INNER_CONTAINER_SELECTOR,
  LI_JOB_SELECTOR,
  LI_LINK_SELECTOR,
} from './constants';

import { blockedJobs } from './linkedin_store';

import findLinkedInJobID from './helpers/findLinkedInJobID';

// Select job postings (runs on /search and /collections)
const jobsOuterContainer = document.querySelector(LI_OUTER_CONTAINER_SELECTOR);

// Use the mutation observer to catch added jobs:

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback: MutationCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
      if (!mutation.target) continue;

      const currentElement = mutation.target as Element;

      // When we find the header, inject under it.
      if (currentElement.classList.contains('scaffold-layout__list-header')) {
        if (!injectedHeader) {
          injectHeader(currentElement as Element);
        }
      }

      if (!currentElement.classList.contains(LI_INNER_CONTAINER_SELECTOR)) {
        continue;
      }

      const company = currentElement.querySelector(
        LI_JOB_SELECTOR
      ) as HTMLElement;

      const jobLink = currentElement.querySelector(LI_LINK_SELECTOR);

      if (!company || !jobLink) continue;

      const linkString = jobLink.getAttribute('href');

      if (!linkString) continue;

      const jobID = findLinkedInJobID(linkString);
      const companyName = company.innerText.trim();

      // Destroy.
      if (blockedJobs.includes(companyName)) {
        currentElement.remove();
        incrementHiddenJobs(jobID);
      }
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
if (jobsOuterContainer) {
  observer.observe(jobsOuterContainer, config);
}

// Add a counter at the top of the job list.
let removedJobs: string[] = [];
let injectedHeader = false;

const betterJobsBanner = document.createElement('div');
betterJobsBanner.innerText = `BetterJobs has hidden 0 posts.`;
betterJobsBanner.setAttribute(
  'style',
  'width: 100%; text-align: center; padding: 1rem; background-color: #74e5c0; color: black;'
);
betterJobsBanner.innerText = `BetterJobs has hidden ${removedJobs.length} posts.`;

function injectHeader(headerElement: Element) {
  injectedHeader = true;
  headerElement.insertAdjacentElement('afterend', betterJobsBanner);
}

function incrementHiddenJobs(jobID: string) {
  if (!removedJobs.includes(jobID)) {
    removedJobs.push(jobID);
  }
  betterJobsBanner.innerText = `BetterJobs has hidden ${removedJobs.length} posts.`;
}
