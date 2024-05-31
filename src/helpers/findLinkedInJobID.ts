/**
 *
 * @param link - a string of the linkedin URL pointer URL to the job.
 * @returns ID - a string representing a unique job
 */

export default function findLinkedInJobID(link: string) {
  if (!link) throw new Error('No string provided to findLInkedInJobID');

  const IDStart = link.indexOf('jobs/view') + 10;
  const partialLink = link.slice(IDStart);
  const ID = partialLink.slice(0, partialLink.indexOf('/'));
  return ID;
}
