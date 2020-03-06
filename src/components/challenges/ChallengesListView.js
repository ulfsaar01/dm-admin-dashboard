import React, { useState } from 'react'
import { Alert, Table } from 'react-bootstrap'
import { useFetch } from "../../useFetch";
import moment from "moment";
import styles from './clv.module.css'

const ListView = designContests => {
  return designContests.map((contest, index) => (
    <div key={contest._id}>
      <p>{contest.url}</p>
    </div>
  ))
}

const formatDate = (date) => {
  const d = moment(date.iso);
  return d.toLocaleString();
}

const ChallengesListView = () => {
  const designContestResults = useFetch("getDesignContests3");
  const designContestData = designContestResults.data;
  const designContestLoading = designContestResults.loading;

  const badgeResults = useFetch("getBadges1");
  const badgeData = badgeResults.data;
  const badgeLoading = badgeResults.loading;

  const [state, setState] = useState({
    clickedNew: false,
    clickedDesignContest: null,
    gotoLogin: false
  });

  if (designContestLoading || badgeLoading) {
    return <Alert variant="primary">Loading</Alert>
  }

  if ((designContestData || {}).error || (badgeData || {}).error) {
    const { error } = (designContestData || {}).error || badgeData || {};
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        closable
        onClose={() => {
          setState({ gotoLogin: true });
        }}
      />
    );
  }
  const { clickedNew, clickedDesignContest, gotoLogin } = state;
  const { designContests } = designContestData.result;
  const { badges } = badgeData.result;

  if (clickedNew || clickedDesignContest) {
    const pathname = `/admin/challenges/${
      (clickedDesignContest || {}).objectId
    }`;
    return (
      <>
      </>
    );
  }
  if (gotoLogin) {
    return 
  }

  return (
    <Table hover bordered variant="light" className={styles.ts}>
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Feature Date</th>
          <th>Expire Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {designContests.map((contest, index) => (
          <tr key={contest.objectId}>
            <td><img src={contest.thumbImageFile.url} className={styles.tmg}/></td>
            <td>{contest.title}</td>
            <td>{formatDate(contest.featuredAt)}</td>
            <td>{formatDate(contest.expiresAt)}</td>
            <td className={`${contest.status === 'closed' ? 'text-danger' : 'text-success'}`}>{contest.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ChallengesListView
