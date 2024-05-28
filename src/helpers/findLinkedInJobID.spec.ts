import findLinkedInJobID from './findLinkedInJobID';

describe('the findLinkedInJobID function', () => {
  it('should find the correct job ID', () => {
    const link =
      'https://www.linkedin.com/jobs/view/3927433515/?eBP=CwEAAAGPvMf7H2-162Ot8wBiy7hNdGcYkSm0ExzeVKx0CH0Kp-gD0sOoGIWvZCZ3VyrUfS8Wd2idNpQuDIj4PUiyIYgOpkd1n_5k9qHVDd_knwW4HKQvKUFc8QNuXT1xFWE5FDKKZgYxszBU8GREhrNkFDOtKqRd0xE0hzoOTaUFc5gWIAETARpgcyWo_myS7htb3jhU8Dla2SUFMkZuhVsWxS7aoXiONBnxV9qKvbAMe25WyaP7Hhi14zV-dBIf16HWoCEkCSG2qAw9OkmT9LKne94xcrVYkbOtydgEK5cBMCFpB5BmwFN1ayqzRyWYhEem3kHtimxc8bGvNiiLtb4o8zFtflkYbPWUd3M_YW4PyYBkhZV1lO6aBFDlWCSLGwCTJqZzsuX7RdmKnTmkRAwllpmNJmE2N0t4gORT9QzpoMU4MI_UPZVuxIESy2eN&refId=RztbiIz8gyh1LOwkPLSrgw%3D%3D&trackingId=keGu2x0PXseJRvfPExi4ig%3D%3D&trk=flagship3_jobs_discovery_jymbii';

    const ID = findLinkedInJobID(link);

    expect(ID).toBe('3927433515');
  });
  it('should find another correct job ID', () => {
    const link =
      'https://www.linkedin.com/jobs/view/3927427949/?eBP=CwEAAAGPvMf7Hz-BK6_XQP-yAfhIPjthJFAsaVs43iXNG8CM-sFRyiIJR_mHcSTHnTOF8dEGnjBpfWDY-_O_p2qN0WCIFugqLE-IRpbTM0Hv9ywlyMGtxaZuSG92obi9iqUy1tz8Uz9bm9I0xlVRFZVZTPGx0gXmuW3FjlHEvPRhHfnM_cWga4olIjobTW5J8e9llcr0igz0LKSEbHjT6_cXfuoniLlJ7rQj3suxcWpCNBetYYuwaVvvFUS11Ws8u-YcbkbvAU2s36MJODf_uWaLPBD6QdAlTUGeYsd9NMjI8-yPQSjZg1sVRcghZHliAcaOadHG8DeydQo62hL4YPOipq9YOzqYBbrnj1X_MebnDiqjdf9-Uep_1plmqBt5zk6-J5jZYsyqKp2ypg5V3s2mBc03_Rc3oq4p-nu2PM6VhVNwJabfcU_YKkh5PnrvMAyo-w&refId=RztbiIz8gyh1LOwkPLSrgw%3D%3D&trackingId=L7bgq%2Bic4sPVVWvqhoh7zg%3D%3D&trk=flagship3_jobs_discovery_jymbii';

    const ID = findLinkedInJobID(link);

    expect(ID).toBe('3927427949');
  });
  it('should throw an error nothing is supplied', () => {
    const link = '';

    try {
      findLinkedInJobID(link);
      // Fail if we didn't throw
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('No string provided to findLInkedInJobID');
    }
  });
});
