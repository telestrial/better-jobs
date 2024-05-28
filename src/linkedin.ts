import findLinkedInJobID from './helpers/findLinkedInJobID';

// Select job postings (runs on /search and /collections)
const jobsOuterContainer = document.querySelector('div.scaffold-layout__list');

// Initialize the object we'll use to keep track of the company names
const companies: { [key: string]: Element } = {};

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

        if (
          !currentElement.classList.contains('jobs-search-results__list-item')
        )
          continue;

        const company = currentElement.querySelector(
          'span.job-card-container__primary-description'
        ) as HTMLElement;

        const jobLink = currentElement.querySelector(
          'a.job-card-container__link'
        );

        if (!company || !jobLink) continue;

        const linkString = jobLink.getAttribute('href');

        if (!linkString) continue;

        const jobID = findLinkedInJobID(linkString);

        const keyName = company.innerText + jobID;

        if (company.innerText !== null && !companies[keyName]) {
          companies[keyName] = currentElement;
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
